'use strict';

const pokedexView = {};

pokedexView.handleTypeFilter = function() {
  $('#type-filter').on('change', function() {
    var value = $(this).val();
    if($(this).val()) {
      $('.dex-entry').hide();
      $(`.dex-entry[data-type="${$(this).val()}"]`).fadeIn();
    } else {
      $('.dex-entry').fadeIn();
    }
  });
}

pokedexView.initIndexPage = function() {
  Pokemon.all.forEach(function(pokemon) {
    $('#pokedex ul').append(pokemon.toHtml());
  });
}

$(document).ready(function () {
  pokedexView.handleTypeFilter();
})
