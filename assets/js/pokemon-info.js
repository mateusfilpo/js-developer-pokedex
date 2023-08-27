document.addEventListener('DOMContentLoaded', () => {
    const pokemonInfo = document.getElementById("pokemonInfo")
    const parameter = new URLSearchParams(window.location.search)
    const pokemonId = parameter.get('id')
    const pokeColor = document.getElementById("pokemonInfo")

    getPokemonDetails(pokemonId).then((pokemon) => {
        pokeColor.classList.add(`${pokemon.type}`)
        pokemonInfo.innerHTML = `
            <section class="header">
                <h1 class="pokemonName">${pokemon.name}</h1>
                <span class="number">#${pokemon.number}</span>
            </section>
            <div class="typesPokemon">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
            </div>
            <img src="${pokemon.photo}" alt="${pokemon.name}" class="imagemPoke">

            <section class="pokeStats">
                <div class="details">
                    <h2 class="baseStats">Base Stats</h2>
                    <ol class="stats">
                        <li>HP: ${pokemon.hp}</li>
                        <li>Attack: ${pokemon.atk}</li>
                        <li>Defense: ${pokemon.defense}</li>
                        <li>Special Attack: ${pokemon.sp_atk}</li>
                        <li>Special Defense: ${pokemon.sp_def}</li>
                        <li>Speed: ${pokemon.speed}</li>
                        <li>Total: ${pokemon.total}</li>
                    </ol>
                </div>
            </section>

            <div class="goBack">
                <a href="index.html" class="link">
                    <button class="goBackButton" type="button">
                        Go Back
                    </button>
                </a>
            </div>

        `
    })
})

function convertPokeApiDetailToPokemon(pokeDetails) {
    const pokemon = new PokeDetail()
    pokemon.name = pokeDetails.name
    pokemon.number = pokeDetails.id;
    pokemon.photo = pokeDetails.sprites.other.dream_world.front_default

    const types = pokeDetails.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.hp = pokeDetails.stats[0].base_stat
    pokemon.atk = pokeDetails.stats[1].base_stat
    pokemon.defense = pokeDetails.stats[2].base_stat
    pokemon.sp_atk = pokeDetails.stats[3].base_stat
    pokemon.sp_def = pokeDetails.stats[4].base_stat
    pokemon.speed = pokeDetails.stats[5].base_stat
    pokemon.total = pokemon.hp + pokemon.atk + pokemon.defense + pokemon.sp_atk + pokemon.sp_def + pokemon.speed
    
    console.log(pokemon)
    return pokemon
}

function getPokemonDetails(pokemonId) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    //console.log(url)

    return fetch(url)
        .then((pokemonDetails) => pokemonDetails.json())
        .then(convertPokeApiDetailToPokemon)  
}

