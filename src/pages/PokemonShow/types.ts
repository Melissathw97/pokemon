import { iPokemonStat, PokemonStoreImpl } from "../../components/PokemonStore";

export interface PokemonShowProps {
    pokemonStore: PokemonStoreImpl;
}

export interface PokemonFullData {
    name: string;
    image: string;
    types: string[];
    stats: iPokemonStat[];
    abilities: string[];
}