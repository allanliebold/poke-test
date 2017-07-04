'use strict';

var pokemon;
var pokedex = [];

function Pokemon(id, name, type){
  this.id = id;
  this.name = name.charAt(0).toUpperCase() + name.slice(1);
  this.type = type;
  pokedex.push(this);
}

new Pokemon(1, 'bulbasaur', ['grass', 'poison']);
new Pokemon(4, 'charmander', ['fire']);
new Pokemon(7, 'squirtle', ['water']);
new Pokemon(10, 'caterpie', ['bug']);
new Pokemon(13, 'weedle', ['bug', 'poison']);
new Pokemon(16, 'pidgey', ['normal', 'flying']);
new Pokemon(19, 'rattata', ['normal'])


var getPokemon = function() {
  $.getJSON('http://pokeapi.co/api/v2/pokemon/?limit=151')
    .then(function(data) {
      pokemon = data.results;
    }), function(err) {
      console.err('error: ', err);
    }
  };

var createPokedex = function(pokemon){
  pokemon.forEach(function(pokeObj) {
    console.log(pokemon.name);
    pokedex.push(new Pokemon(idx, pokemon.name));
  });
}

var list = function(pokedex) {
  for(var i=0; i < pokedex.length; i++){
    $('body').append('<p>ID: ' + pokedex[i].id + '</p>');
    $('body').append('<p>Name: ' + pokedex[i].name + '</p>');
    $('body').append('<p>Type: ' + pokedex[i].type + '</p>');
  }
}
