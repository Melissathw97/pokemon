import { PokemonStoreImpl } from "../../components/PokemonStore";

export interface iHomeProps {
    pokemonStore: PokemonStoreImpl;
}

export interface iPokemonType {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

export interface iPokemonStat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

export interface iPokemonAbility {
    slot: number;
    is_hidden: boolean;
    ability: {
        name: string;
        url: string;
    };
}