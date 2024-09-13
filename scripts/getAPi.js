// fetch all 151 Pokemons


// for type colors
function getColor(types) {
    const colorTypes = {
        "normal": "#BCBCAC",
        "fighting": "#BC5442",
        "flying": "#669AFF",
        "poison": "#AB549A",
        "ground": "#DEBC54",
        "rock": "#BCAC66",
        "bug": "#ABBC1C",
        "ghost": "#6666BC",
        "steel": "#ABACBC",
        "fire": "#FF421C",
        "water": "#2F9AFF",
        "grass": "#78CD54",
        "electric": "#FFCD30",
        "psychic": "#FF549A",
        "ice": "#78DEFF",
        "dragon": "#7866EF",
        "dark": "#785442",
        "fairy": "#FFACFF",
        "shadow": "#0E2E4C"
    };
    return colorTypes[types?.toLowerCase()]
}



// for fetching pokemons
document.addEventListener('DOMContentLoaded', () => {
    async function fetchPokemon_151() {
        try {
            const maxNumberOfPokemon = 151;
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${maxNumberOfPokemon}`);

            if (!response.ok) {
                throw new Error("Resource not found");
            }

            const dataToJson = await response.json();
            const pokemonGrid = document.querySelector('#pokemonCards');
            displayPokemon(dataToJson, pokemonGrid);

        }
        catch (error) {
            console.log(error);
        }
    }
    fetchPokemon_151();
});



// for displaying all fetched pokemon
async function displayPokemon(dataToJson, pokemonGrid) {
    pokemonGrid.innerHTML = "";
    for (let pokemon of dataToJson.results) {
        const perPokemonUrl = await fetch(pokemon.url);
        const pokemonData = await perPokemonUrl.json();

        const pokemonID = pokemonData.id;   // Pokmeon ID
        const pokemonName = pokemonData.name;   // Pokemon Name
        const pokemonGif = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonID}.gif`
        const cardModalID = `pokemonModal${pokemonID}`;     // POKEMON ID PER CARD

        // Resource for Modal
        const pokemonAbilities = pokemonData.abilities.map(abilityInfo => {
            return `<p class="text-capitalize mb-0">${abilityInfo.ability.name}</p>`
        }).join('');   // returns a <p> tag for each ability in pokemonAbilities

        const pokemonTypes = pokemonData.types.map(typesInfo => {
            return `<p class="text-capitalize mb-0 rounded" style="color: ${getColor(typesInfo.type.name)};">${typesInfo.type.name}</p>`
        }).join('');    // returns a <p> tag for each type in pokemonTypes

        const pokemonWeight = pokemonData.weight;

        const pokemonCries = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemonID}.ogg`;
        // console.log(`Cry URL for ${pokemonName}: ${pokemonCries}`);



        const pokemonCard = displayCard(pokemonID, pokemonGif, pokemonName, cardModalID, pokemonWeight, pokemonAbilities, pokemonTypes, pokemonCries);
        pokemonGrid.innerHTML += pokemonCard;
    }
}


// event for pokemon cries
document.addEventListener('show.bs.modal', (event) => {
    const cry = event.target.querySelector('#cries');
    cry.play();
    cry.volume = 0.3;
});


function displayCard(pokemonID, pokemonGif, pokemonName, cardModalID, pokemonWeight, pokemonAbilities, pokemonTypes, pokemonCries) {
    return `
    <div class="col">
        <div class="card p-1" id="cards">
            <p class="ms-4 mt-3">${pokemonID}</p>
            <div class="d-flex align-items-center justify-content-center">
                <img src="${pokemonGif}" alt="${pokemonName}" id="GIF">
            </div>
            <h5 class="text-center text-capitalize mt-4">${pokemonName}</h5>

            <!-- modal button -->
            <div class="d-flex align-items-center justify-content-center">
                <a href="#" class="mb-3 mt-2" data-bs-toggle="modal" data-bs-target="#${cardModalID}">View</a>
            </div>

            <!-- modal -->
            <div class="modal fade" id="${cardModalID}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content" id="modal-window">
                        <audio class="position-absolute invisible" controls id="cries">
                            <source src="${pokemonCries}" type="audio/ogg">
                        </audio>
                        <div class="modal-header">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="d-flex align-items-center justify-content-center">
                                <img src="${pokemonGif}" id="pokemonView"> 
                            </div>
                            <div>
                                <h3 class="text-center text-capitalize mt-3 mb-0">${pokemonName}</h3>
                                <p class="text-center mb-1 fs-0" id="weight">Weight: ${pokemonWeight}</p>
                                <div class="container d-flex  align-items-center justify-content-evenly text-center" id="ability-types">
                                    <div class="box p-2">
                                        <h6 class="p-1 bg-body-secondary rounded">Ability</h6>
                                        ${pokemonAbilities}
                                    </div>
                                    <div class="box p-2">
                                        <h6 class="p-1 bg-body-secondary rounded">Type</h6>
                                        ${pokemonTypes}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}




 // for searching pokemons
// const searchForm = document.querySelector('#searchForm');
const searchButton = document.querySelector('#searchForPokemon');  
searchButton.addEventListener('click', async () => {
    try{
        const searchForPokemonButton = document.querySelector('#inputPokemon').value.toLowerCase();
        const pokemonGrid = document.querySelector('#pokemonCards');
        
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchForPokemonButton}`);

        if (!response.ok) {
            throw new Error("Resource not found");
        }
        else {
            const pokemonData = await response.json();

            const pokemonID = pokemonData.id;   // Pokmeon ID
            const pokemonName = pokemonData.name;   // Pokemon Name
            const pokemonGif = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonID}.gif`
            const cardModalID = `pokemonModal${pokemonID}`;     // POKEMON ID PER CARD

            // Resource for Modal
            const pokemonAbilities = pokemonData.abilities.map(abilityInfo => {
                return `<p class="text-capitalize mb-0">${abilityInfo.ability.name}</p>`
            }).join('');   // returns a <p> tag for each ability in pokemonAbilities

            const pokemonTypes = pokemonData.types.map(typesInfo => {
                return `<p class="text-capitalize mb-0">${typesInfo.type.name}</p>`
            }).join('');    // returns a <p> tag for each type in pokemonTypes

            const pokemonWeight = pokemonData.weight;

            pokemonGrid.innerHTML = "";
            displayCard(pokemonID, pokemonGif, pokemonName, cardModalID, pokemonWeight, pokemonAbilities, pokemonTypes);
            pokemonGrid.innerHTML += displayCard(pokemonID, pokemonGif, pokemonName, cardModalID, pokemonWeight, pokemonAbilities, pokemonTypes);
        }
    }
    catch(error) {
        console.log(error);
    }
});
