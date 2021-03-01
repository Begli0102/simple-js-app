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

//function to display the details of a pokemon when it is clicked
  // function showDetails(pokemon){
  //   console.log(pokemon);
  // }

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
        let detailsArray=[details.sprites.front_default,details.height,details.types];
        return detailsArray
      }).catch(function (e) {
        console.error(e);
      });
    }

//loging the detail of each clicked pokemon
    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function (detailsArray) {
          // console.log(item);
          showModal(detailsArray);
        });
      }

      function showModal(pokemon) {

        let modalContainer = document.querySelector('#modal-container');

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
        pokemonName.classList.add('pokemon-name')
        pokemonName.innerHTML =pokemon.name;

        let pokemonHeight=document.createElement('p');
        pokemonHeight.classList.add('pokemon-height');
        pokemonHeight.innerHTML=pokemon.height;

        let pokemonImage=document.createElement('img');
        pokemonImage.classList.add('pokemon-image');
        pokemonImage.src=pokemon.imageUrl;

        let pokemonTypes=document.createElement('p');
        pokemonTypes.classList.add('pokemon-types');
        pokemonTypes.innerHTML=pokemon.types;

        modal.appendChild(closeButtonElement);
        modal.appendChild(pokemonName);
        modal.appendChild(pokemonImage);
        modal.appendChild(pokemonHeight);
        modal.appendChild(pokemonTypes);
        modalContainer.appendChild(modal);

        document.querySelector(pokemonList).addEventListener('click', (detailsArray) => {
            showModal(pokemonName,pokemonHeight,pokemonImage,pokemonTypes);
          });
}

        function addEventListener(button) {
        button.addEventListener('click', function() {
            showDetails(item);
        });
    }



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


            // function addEventListener(button, pokemon) {
            //         button.addEventListener('click', function() {
            //             showDetails(pokemon);
            //         });
            //     }

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



//  //function to load the details
//    function loadDetails(item) {
//        let url = item.detailsUrl;
//        return fetch(url).then(function (response) {
//          return response.json();
//        }).then(function (details) {
//          // Now we add the details to the item
//          item.imageUrl = details.sprites.front_default;
//          item.height = details.height;
//          item.types = detail.types;
//          // details.types.forEach(function(pokemonTypes){
//          //   item.types.push(pokemonType.type.name);
//          // })
//          // details.height.forEach(function(pokemonHeight){
//          //   item.height.push(pokemonHeight.height);
//          // })
//        }).catch(function (e) {
//          console.error(e);
//        });
//      }
