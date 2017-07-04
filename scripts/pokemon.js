'use strict';

function Pokemon(rawDataObj){
  this.id = rawDataObj.id;
  this.name = rawDataObj.name.charAt(0).toUpperCase() + rawDataObj.name.slice(1);
  this.type = rawDataObj.type;
  this.typeFilter = rawDataObj.type[0];
}

Pokemon.all = [];

// var getPokemon = function() {
//   $.getJSON('http://pokeapi.co/api/v2/pokemon/?limit=151')
//     .then(function(data) {
//       pokemon = data.results;
//     }), function(err) {
//       console.err('error: ', err);
//     }
//   };
//
// var createPokedex = function(pokemon){
//   pokemon.forEach(function(pokeObj) {
//     console.log(pokemon.name);
//     pokedex.push(new Pokemon(idx, pokemon.name));
//   });
// }
//
// var list = function(pokedex) {
//   for(var i=0; i < pokedex.length; i++){
//     $('body').append('<p>ID: ' + pokedex[i].id + '</p>');
//     $('body').append('<p>Name: ' + pokedex[i].name + '</p>');
//     $('body').append('<p>Type: ' + pokedex[i].type + '</p>');
//   }
// }

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

  $.ajax({
    url: '/../data/pokemon.json',
    type: 'HEAD',
    success: function(data, message, xhr) {
      serverETag = xhr.getResponseHeader('ETag');
    },
    fail: function(err) {
      console.error(err);
    }
  });

  if (localStorage.rawData && localStorage.ETag === serverETag) {
    Pokemon.loadAll(JSON.parse(localStorage.rawData));
    pokedexView.initIndexPage();
  } else {
    $.getJSON('/../data/pokemon.json', function(data) {
      localStorage.rawData = JSON.stringify(data);
      localStorage.ETag = serverETag;
      Pokemon.loadAll(data);
      pokedexView.initIndexPage();
    });
  }
}
