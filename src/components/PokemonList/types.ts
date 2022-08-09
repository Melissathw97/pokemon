import { iPokemonStat, PokemonStoreImpl } from "../PokemonStore";

export interface PokemonListProps {
    pokemonStore: PokemonStoreImpl
}

export interface PokemonFullData {
    name: string;
    image: string;
    types: string[];
    stats: iPokemonStat[];
    abilities: string[];
}