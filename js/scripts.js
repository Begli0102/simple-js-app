
//  pokemonRepository wraped in IIFE

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

  //function to create a button and display pokemon with several Bootstrap classes

  function addListItem(pokemon) {

  let pokemonList=document.querySelector('.pokemon-list');
  pokemonList.classList.add('list-group','lg')
  let listpokemon=document.createElement('li');
  listpokemon.classList.add('list-group-item');
  listpokemon.classList.add('list-group-item-action');
  listpokemon.classList.add('list-group-item-light');
  listpokemon.classList.add('shadow-lg','bg-body','rounded');
  let button=document.createElement('button');
  button.innerText=pokemon.name;
  button.classList.add('button');
  button.classList.add('btn');
  button.classList.add('text-capitalize');
  button.setAttribute("data-target","#exampleModal");
  button.setAttribute("data-toggle", "modal");
  button.setAttribute('btn','btn btn-info');
  listpokemon.appendChild(button);
  pokemonList.appendChild(listpokemon);
  button.addEventListener("click", function(event){
  showDetails(pokemon);
});
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
        item.weight = details.weight;
        let detailsArray=[item.name, details.sprites.front_default,item.height,item.types,details.weight];
        return detailsArray
      }).catch(function (e) {
        console.error(e);
      });
    }

        // created search function in which by typing first letter the name of a pokemon can be found

        document.getElementsByClassName('form-control')[0].addEventListener('keyup',function(){
      search()


        });

       function search(){
         let list=document.querySelectorAll('li.list-group-item');
         let value=document.getElementsByClassName('form-control')[0].value.toLowerCase()
         for (var i = 0; i < list.length; i++) {

           const pokemonName=list[i].querySelector('button').innerText.toLowerCase()

           if (pokemonName.indexOf(value)>-1) {
             list[i].style.display=''
           }else{
             list[i].style.display='none';
           }
         }

       }


//loging the detail of each clicked pokemon
    function showDetails(item) {
        console.log(item);
        loadDetails(item).then(function (detailsArray) {
          showModal(item);
        });
      }

       // showing the whole modal with Bootstrap

       function showModal(pokemon) {

        let detailsArray=[pokemon.name, pokemon.imageUrl, pokemon.height, pokemon.types, pokemon.weight];

        let modalBody=$('.modal-body');
        let modalTitle=$('.modal-title');
        let modalHeader=$('.modal-header');
        let modalContainer =$('#modal-container');
        // console.log(pokemon);
        modalHeader.empty();
        modalTitle.empty();
        modalBody.empty();


        let pokemonName = document.createElement('h1');
        pokemonName.classList.add('text-capitalize');
        pokemonName.classList.add('text-center');
        pokemonName.innerHTML =detailsArray[0];

        let pokemonHeight=document.createElement('p');
        pokemonHeight.classList.add('pokemon-height');
        pokemonHeight.innerHTML=detailsArray[2];
        pokemonHeight.innerText=' The height is: ' + detailsArray[2] + ' m';

        let pokemonImage=document.createElement('img');
        pokemonImage.classList.add('pokemon-image');
        pokemonImage.setAttribute('src',detailsArray[1]);

        let pokemonTypes=document.createElement('p');
        pokemonTypes.classList.add('pokemon-types');
        console.log(detailsArray);
        pokemonTypes.innerHTML=detailsArray[3][0].type.name;
        pokemonTypes.innerText='Type: ' + detailsArray[3][0].type.name;

        let pokemonWeight=document.createElement('p');
        pokemonWeight.classList.add('pokemon-weight');
        pokemonWeight.innerHTML=detailsArray[4];
        pokemonWeight.innerText='Weight: ' + detailsArray[4] + ' kg';


        modalTitle.append(pokemonName);
        modalHeader.append(modalTitle);
        modalBody.append(pokemonImage);
        modalBody.append(pokemonHeight);
        modalBody.append(pokemonTypes);
        modalBody.append(pokemonWeight);


}

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList:loadList,
    loadDetails:loadDetails,
    showDetails:showDetails,

  };
})();

  //refacored for loop into forEach Loop
  pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function(pokemon){
  pokemonRepository.addListItem(pokemon);
  });
});
