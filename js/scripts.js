//  pokemonRepository wraped in IIFE

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl='https://pokeapi.co/api/v2/pokemon/?limit=10';
  let modalContainer = document.querySelector('#modal-container');

//function to add pokemon

  function add(pokemon) {
  pokemonList.push(pokemon);
  }

  //function to get pokemons in Array

  function getAll() {
    return pokemonList;
  }

  //function to create a button and display pokemons

  function addListItem(pokemon) {

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
        let detailsArray=[item.name, details.sprites.front_default,item.height,item.types];
        return detailsArray
      }).catch(function (e) {
        console.error(e);
      });
    }

//loging the detail of each clicked pokemon
    function showDetails(item) {
        console.log(item);
        loadDetails(item).then(function (detailsArray) {

          showModal(detailsArray);
        });
      }

       // showing the whole modal-modalContainer

      function showModal(pokemon) {

        let modalContainer = document.querySelector('#modal-container');
        console.log(pokemon);
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText  = 'X';
        closeButtonElement.addEventListener('click', ()=>{
          hideModal();
        })

        let pokemonName = document.createElement('h1');
        pokemonName.classList.add('pokemon-name');
        pokemonName.innerHTML =pokemon[0];

        let pokemonHeight=document.createElement('p');
        pokemonHeight.classList.add('pokemon-height');
        pokemonHeight.innerHTML=pokemon[2];
        pokemonHeight.innerText=' The height is: ' + pokemon[2];

        let pokemonImage=document.createElement('img');
        pokemonImage.classList.add('pokemon-image');
        pokemonImage.src=pokemon[1];

        let pokemonTypes=document.createElement('p');
        pokemonTypes.classList.add('pokemon-types');
        pokemonTypes.innerHTML=pokemon[3][0].type.name;
        pokemonTypes.innerText=pokemon[3][0].type.name + ': is its type ';

        modal.appendChild(closeButtonElement);
        modal.appendChild(pokemonName);
        modal.appendChild(pokemonImage);
        modal.appendChild(pokemonHeight);
        modal.appendChild(pokemonTypes);
        modalContainer.appendChild(modal);
        console.log(modalContainer);
        modalContainer.classList.add('is-visible');

          function addEventListener(button) {
          button.addEventListener('click', function() {
              showDetails(item);
          });

      }
}

          // hiding a modal by clicking close button, empty place or escape button

           function hideModal() {
           let modalContainer = document.querySelector('#modal-container');
           modalContainer.classList.remove('is-visible');
           }

            window.addEventListener('keydown',(e)=>{
            if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
              hideModal();
            }
          });

          modalContainer.addEventListener('click',(e)=> {
            // Since this is also triggered when clicking INSIDE the modal
            // We only want to close if the user clicks directly on the overlay
            let target = e.target;
            if (target === modalContainer) {
              hideModal();
            }
          });




  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList:loadList,
    loadDetails:loadDetails,
    showDetails:showDetails,
    showModal:showModal,
    hideModal:hideModal
  };
})();

  //refacored for loop into forEach Loop
  pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function(pokemon){
  pokemonRepository.addListItem(pokemon);
  });
});
