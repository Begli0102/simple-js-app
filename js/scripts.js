//added some data to pokemonList
let pokemonList=[
 {name:'Bulbasaur',height: 0.7,types:['grass', 'poison' ],weight:6.9},
 {name:'Pidgeot',height:1.5,types:['flying', 'normal'],weight:39.5},
 {name:'Alakazam',height:1.5,types:['phychic'],weight:48},
 {name:'Charizard',height:1.7,types:['flying', 'fire'],weight:90.5},
 {name:'Blastoise',height:1.6,types:['water'],weight:85.5}
]
for (let i=0; i<pokemonList.length; i++){
  if(pokemonList[i].height>1.5){
  document.write('<p>' + pokemonList[i].name + "" +
   " ( height: " + pokemonList[i].height + ")" + '</p>');
} else{
  document.write('<p>' + pokemonList[i].name + "" +
  " (height: " + pokemonList[i].height + ":this pokemon is small)" + '</p>');
}
}
