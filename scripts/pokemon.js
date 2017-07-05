'use strict';

function Pokemon(data){
  this.id = data.id;
  this.name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
  this.sprite = data.sprites.front_default;
  this.type = data.types[0].type.name;

  if(data.types.length > 1) {
    this.secondType = data.types[1].type.name;
  } else {
    this.secondType = '';
  }
  // this.typeFilter = data.type[0];
}

var pokedex = [];
Pokemon.all = [];
var pokeUrl = 'https://pokeapi.co/api/v2/';

var loadPokedex = function(pokedex){
  Pokemon.all = pokedex.map(function(data, idx, arr) {
    console.log('ID: ', data.id, ' Name: ', data.name);
    return new Pokemon(data);
  });
  pokedexView.initIndexPage();
}

Pokemon.prototype.toHtml = function() {
  let template = Handlebars.compile($('#pokemon-template').text());
  return template(this);
}

Pokemon.fetchAll = function() {
  if(localStorage.rawData) {
    pokedex = JSON.parse(localStorage.rawData);
    pokedexView.initIndexPage();
  } else {
    $.ajax({
      url: pokeUrl + 'pokemon/?limit=5',
      type: 'GET',
      success: function(data) {
        for(var idx in data.results) {
          $.getJSON(data.results[idx].url)
          .then(function(data){
            console.log('data: ', data);
            pokedex.push(data);
          })
        }
      },
      error: function(err) {
        console.err('err: ', err);
      }
    }).then(function(){
        function savePokemonData(pokedex){
          localStorage.rawData = JSON.stringify(pokedex);
          console.log('localStorage: ', localStorage.rawData);
        }
      })
    }
}
