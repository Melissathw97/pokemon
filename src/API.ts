export interface PokemonData {
    name: string,
    url: string
}

export const fetchPokemonList = async () => {
    const endpoint = `https://pokeapi.co/api/v2/pokemon?limit=151`;
    const data = await (await fetch(endpoint)).json();

    return data.results.map((pokemon: PokemonData) => pokemon);
}

export const fetchPokemon = async (name: string) => {
    const endpoint = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const data = await (await fetch(endpoint)).json();

    return ({
        name,
        types: data.types,
        stats: data.stats,
        abilities: data.abilities,
        image: data.sprites.front_default
    });
}

export const searchPokemon = async (name: string) => {
    const endpoint = `https://pokeapi.co/api/v2/pokemon?limit=151`;
    const data = await (await fetch(endpoint)).json();

    return await Promise.all(data.results
        .filter((pokemon: PokemonData) => pokemon.name.includes(name))
        .map((pokemon: PokemonData) => {
            return fetchPokemon(pokemon.name).then((o: any) => o);
        }));
}