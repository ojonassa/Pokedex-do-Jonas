document.addEventListener('DOMContentLoaded', async () => {
    const pokemonList = document.getElementById('pokemonsList');
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');
    const loadMoreButton = document.getElementById('loadMoreButton');
    const limit = 8;
    let offset = limit;

    loadMoreButton.addEventListener('click', async () => {
        await loadPokemonItens(offset, limit);
        offset += limit;
    });

    async function loadPokemonItens(offset, limit) {
        const pokemons = await pokeApi.getPokemons(offset, limit);

        if (pokemons.length === 0) {
            loadMoreButton.style.display = 'none';
            return;
        }
        for (const pokemon of pokemons) {
            const pokemonDetail = await pokeApi.getPokemonDetail(pokemon.name);
            const abilities = pokemonDetail.abilities.map(ability => ability.ability.name).join(', ');
            const stats = pokemonDetail.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join('<br>');

            const newPokemon = document.createElement('li');
            newPokemon.classList.add('pokemon')
            newPokemon.innerHTML = `
            <li class="pokemon ${pokemon.type}" >
                <span class="number">#${pokemonDetail.id}</span>
                <span class="name">${pokemon.name}</span>
                    <div class="detail">
                        <ol class="types">                        
                        ${pokemonDetail.types.map((type) => `<li class="type ${type}">${type.type.name}</li>`).join('')}
                        </ol>
                        <img src="${pokemonDetail.sprites.other.dream_world.front_default}" alt="${pokemon.name}">

                    </div>
            </li>
            `;

            const primaryType = pokemonDetail.types[0].type.name;
            newPokemon.classList.add(primaryType);

            newPokemon.addEventListener('click', () => openModal(pokemonDetail, abilities, stats));
            pokemonList.appendChild(newPokemon);
        }
    }

    function openModal(pokemonDetail, abilities, stats) {
        modalContent.innerHTML = `
        <div id="modalPokemonDetail" class="modalPokemonDetail">
            <h2 class="modalName">${pokemonDetail.name}</h2>
            <li class="abilities">
                <p>Abilities: ${abilities}</p>
            </li>
            <p class="stats">Stats: ${stats}</p>
            
        </div>
        <div">
            <ol>
                 <img src="${pokemonDetail.sprites.other.dream_world.front_default}" alt="${pokemonDetail.name}" class="modalPokemonImage">
            </ol>
        </div>

        `;
        modal.style.display = 'block';
    }

    const closeModalButton = document.querySelector('.closeModal');
    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    loadPokemonItens(0, 8);
});
