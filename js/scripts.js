//  pokemonRepository wraped in IIFE

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl='https://pokeapi.co/api/v2/pokemon/?limit=20';
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
  pokemonList.classList.add('list-group')
  let listpokemon=document.createElement('li');
  listpokemon.classList.add('list-group-item')
  let button=document.createElement('button');
  button.innerText=pokemon.name;
  button.classList.add('button');
  button.classList.add('btn');
  // button.classList.add('btn-primary');
  button.classList.add('btn','btn-outline-success','btn-block');

  // button.classList.add('btn','primary-btn-md-btn-block');
  button.classList.add('text-body');
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
        item.weight = details.weight;
        let detailsArray=[item.name, details.sprites.front_default,item.height,item.types,details.weight];
        return detailsArray
      }).catch(function (e) {
        console.error(e);
      });
    }

//loging the detail of each clicked pokemon
    function showDetails(item) {
        console.log(item);
        loadDetails(item).then(function (detailsArray) {

          showModal(item);
        });
      }

       // showing the whole modal-modalContainer

      function showModal(pokemon) {

        let detailsArray=[pokemon.name, item.imageUrl, item.height, item.types, details.weight];

        let modalBody=$('.modal-body');
        let modalTitle=$('.modal-title');
        let modalHeader=$('.modal-header');
        let modalContainer =$('#modal-container');
        // console.log(pokemon);
        modalHeader.empty();
        // modalTitle.empty();
        modalBody.empty();
        modalContainer.innerHTML = '';

        // let modal = document.createElement('div');
        // modal.classList.add('modal');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText  = 'X';
        closeButtonElement.addEventListener('click', ()=>{
          hideModal();
        })

        let pokemonName = document.createElement('h1');
        pokemonName.classList.add('pokemon-name');
        pokemonName.innerHTML =pokemon.name;

        let pokemonHeight=document.createElement('p');
        pokemonHeight.classList.add('pokemon-height');
        pokemonHeight.innerHTML=detailsArray[2];
        pokemonHeight.innerText=' The height is: ' + detailsArray[2] + ' m';

        let pokemonImage=document.createElement('img');
        pokemonImage.classList.add('pokemon-image');
        pokemonImage.setAttribute('src','detailsArray[1]');
        // pokemonImage.classList.add("mb-2");

        let pokemonTypes=document.createElement('p');
        pokemonTypes.classList.add('pokemon-types');
        pokemonTypes.innerHTML=detailsArray[2][0].type.name;
        pokemonTypes.innerText=detailsArray[2][0].type.name + ': is its type ';

        // modal.appendChild(closeButtonElement);
        modalTitle.appendChild(pokemonName);
        modalBody.appendChild(pokemonImage);
        modalBody.appendChild(pokemonHeight);
        modalBody.appendChild(pokemonTypes);
        modalContainer.appendChild(modalTitle,modalBody);
        console.log(modalContainer);
        // modalContainer.classList.add('is-visible');

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
