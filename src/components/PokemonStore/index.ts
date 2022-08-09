import { action, makeObservable, observable } from "mobx";
import { searchPokemon } from "../../API";
import { getPokemonFullData } from "../../helpers/pokemonFullData";

export interface iPokemonStat {
    name: string;
    baseStat: number;
}

interface iPokemon {
    name: string;
    image: string;
    types: string[];
    stats: iPokemonStat[];
    abilities: string[];
}

export class PokemonStoreImpl {
    allPokemon: iPokemon[] = [];
    pokemonToDisplay: iPokemon[] = [];
    isSearching: boolean = false;
    searchValue: string = "";

    constructor() {
        makeObservable(this, {
            allPokemon: observable,
            pokemonToDisplay: observable,
            isSearching: observable,
            searchValue: observable,
            initializeAllPokemon: action,
            addPokemon: action,
            searchPokemon: action,
            cancelSearch: action
        })
    }

    initializeAllPokemon = (
        allPokemon: iPokemon[]
    ) => {
        this.allPokemon = allPokemon;
        this.pokemonToDisplay = allPokemon;
    }

    addPokemon = (
        pokemon: iPokemon
    ) => {
        this.allPokemon.push(pokemon);
        this.pokemonToDisplay.push(pokemon);
    }

    searchPokemon = (
        name: string
    ) => {
        searchPokemon(name).then(
            action("fetchSuccess", results => {
                this.isSearching = true;
                this.searchValue = name;

                const searchedPokemon = results.map(data => {
                    const {
                        image, types, stats, abilities
                    } = getPokemonFullData(data);

                    return ({
                        name: data.name, image, types, stats, abilities
                    })
                })

                this.pokemonToDisplay = searchedPokemon;
            })
        )
    }

    cancelSearch = () => {
        this.isSearching = false;
        this.searchValue = "";
        this.pokemonToDisplay = this.allPokemon;
    }
}

export const PokemonStore = new PokemonStoreImpl();