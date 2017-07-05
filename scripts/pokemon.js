'use strict';

function Pokemon(data){
  this.id = data.id;
  this.name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
  this.type = data.types[0].type.name;
  // this.secondType = data.type[1].type.name;
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

Pokemon.loadAll = function(rawData) {
  rawData.forEach(function(pokemon) {
    Pokemon.all.push(new Pokemon(pokemon));
  })
}

Pokemon.fetchAll = function() {
  var serverETag;

  // $.ajax({
  //   url: pokeUrl,
  //   type: 'HEAD',
  //   success: function(data, message, xhr) {
  //     serverETag = xhr.getResponseHeader('ETag');
  //   },
  //   fail: function(err) {
  //     console.error(err);
  //   }
  // });

  if(localStorage.rawData) {
    pokedex = JSON.parse(localStorage.rawData);
    pokedexView.initIndexPage();
  } else {
    $.getJSON(pokeUrl + 'pokemon/?limit=50', function(data) {
      var i;
      for(i in data.results) {
        $.getJSON(data.results[i].url)
        .then(function(data){
        console.log('data: ', data);
        pokedex.push(data);
        })
      }
    }).then(function(){
      localStorage.rawData = JSON.stringify(pokedex);
      console.log('localStorage: ', localStorage.rawData);
      // localStorage.ETag = serverETag;
    }), function(err) {
          console.err('error: ', err);
       }
     };
}
