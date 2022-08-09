import { PokemonStoreImpl } from "../../../components/PokemonStore";

interface iPokemon {
    name: string;
    types: string[];
    hp: number;
    attack: number;
    defense: number;
    speed: number;
    abilities: string[];
}

export interface iPokemonStat {
    name: string;
    baseStat: number;
}

export interface iFormProps {
    initialImage?: string;
    initialName?: string;
    initialTypes?: string[];
    initialHp?: number;
    initialAttack?: number;
    initialDefense?: number;
    initialSpeed?: number;
    initialAbilities?: string;
    pokemonStore: PokemonStoreImpl;
}

export interface iFormValues {
    image: string;
    name: string;
    types: string[];
    hp: number;
    attack: number;
    defense: number;
    speed: number;
    abilities: string;
}

export type PokemonAttr = keyof iPokemon