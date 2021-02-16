//added some data to pokemonList
let pokemonList=[
 {name:'Bulbasaur',height: 0.7,types:['grass', 'poison' ],weight:6.9},
 {name:'Pidgeot',height:1.5,types:['flying', 'normal'],weight:39.5},
 {name:'Alakazam',height:1.5,types:['phychic'],weight:48},
 {name:'Charizard',height:1.7,types:['flying', 'fire'],weight:90.5},
 {name:'Blastoise',height:1.6,types:['water'],weight:85.5}
]

//refacored for loop into forEach Loop

pokemonList.forEach(function(eachArray){
if(eachArray.height>1.5){
  document.write('<p>' + eachArray.name + "" +
   " ( height: " + eachArray.height + ")" + '</p>');

}else{
  document.write('<p>' + eachArray.name + "" +
  " (height: " + eachArray.height + ": this pokemon is small)" + '</p>');
}})

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
  return {
    add: add,
    getAll: getAll
  };

})();
pokemonRepository.add({name:'Blastoise',height:1.6,types:['water'],weight:85.5});
  console.log(pokemonRepository.getAll());
