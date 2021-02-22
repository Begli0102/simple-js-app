


// pokemonRepository wraped in IIFE

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl='https://pokeapi.co/api/v2/pokemon/?limit=20';

//function to add pokemon

  function add(pokemon) {
     pokemonList.push(pokemon);
  }

  //function to get pokemons in Array

  function getAll() {
    return pokemonList;
  }

  //function to create a button and display pokemons
  function addListItem(pokemon){
  let pokemonList=document.querySelector('.pokemon-list');
  let listpokemon=document.createElement('li');
  let button=document.createElement('button');
  button.innerText=pokemon.name;
  button.classList.add('button');
  listpokemon.appendChild(button);
  pokemonList.appendChild(listpokemon);
  button.addEventListener("click", function(event){
  showDetails(pokemon);
});
}

//function to displaz the details of a pokemon when it is clicked
  function showDetails(pokemon){
    console.log(pokemon);
  }

//function to load pokemonList using fetch

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      //  console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

//function to load the details
  function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
      });
    }

//loging the detail of each clicked pokemon
    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
          console.log(item);
        });
      }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList:loadList,
    loadDetails:loadDetails,
    showDetails:showDetails
  };
})();

  //refacored for loop into forEach Loop
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function(pokemon){
  pokemonRepository.addListItem(pokemon);
  });
});
