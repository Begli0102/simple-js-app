//added some data to pokemonList
let pokemonList=[
 {name:'Bulbasaur',height: 0.7,types:['grass', 'poison' ],weight:6.9},
 {name:'Pidgeot',height:1.5,types:['flying', 'normal'],weight:39.5},
 {name:'Alakazam',height:1.5,types:['phychic'],weight:48},
 {name:'Charizard',height:1.7,types:['flying', 'fire'],weight:90.5},
 {name:'Blastoise',height:1.6,types:['water'],weight:85.5}
]



// pokemonRepository wraped in IIFE

let pokemonRepository = (function () {
  let pokemonList = [
 {name:'Bulbasaur',height: 0.7,types:['grass', 'poison' ],weight:6.9},
 {name:'Pidgeot',height:1.5,types:['flying', 'normal'],weight:39.5},
 {name:'Alakazam',height:1.5,types:['phychic'],weight:48},
 {name:'Charizard',height:1.7,types:['flying', 'fire'],weight:90.5},
 ];
  function add(pokemon) {
     pokemonList.push(pokemon);
  }
  function getAll() {
    return pokemonList;
  }
  function addListItem(pokemon){
  let pokemonList=document.querySelector('.pokemon-list');
  let listpokemon=document.createElement('li');
  let button=document.createElement('button');
  button.innerText=pokemon.name;
  button.classList.add('button');
  listpokemon.appendChild(button);
  pokemonList.appendChild(listpokemon);
  button.addEventListener("click", function(event){
  showDetails(pokemon)
})
};
  function showDetails(pokemon){
    console.log(pokemon);
  }
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();
pokemonRepository.add({name:'Blastoise',height:1.6,types:['water'],weight:85.5});
  console.log(pokemonRepository.getAll());

  //refacored for loop into forEach Loop

  pokemonList.forEach(function(pokemon){
  pokemonRepository.addListItem(pokemon);
  });
