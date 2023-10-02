const pokeApi = {};

pokeApi.getPokemonDetail = async (pokemonId) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`);
    const data = await response.json();
    return data;
};

pokeApi.getPokemons = async (offset = 0, limit = 8) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    const data = await response.json();
    return data.results;
};
