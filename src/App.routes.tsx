import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Route, Routes } from 'react-router-dom';
import { fetchPokemon, fetchPokemonList, PokemonData } from './API';
import { PokemonStore, PokemonStoreImpl } from './components/PokemonStore';
import { getPokemonFullData } from './helpers/pokemonFullData';
import Home from './pages/Home';
import PokemonNew from './pages/PokemonNew';
import PokemonShow from './pages/PokemonShow';

interface iProps {
    pokemonStore: PokemonStoreImpl
}

const AppRoutes = observer(({ pokemonStore }: iProps) => {

    useEffect(() => {
        if (localStorage.getItem("allPokemon")) {
            const allPokemon = JSON.parse(localStorage.getItem("allPokemon") || "")
            pokemonStore.initializeAllPokemon(allPokemon);
        } else {
            fetchAllPokemon();
        }
    }, []);

    const fetchAllPokemon = () => {
        fetchPokemonList().then(async (results) => {
            const allPokemon = await Promise.all(results
                .map(({ name }: PokemonData) => {
                    return fetchPokemon(name).then((data) => {
                        const {
                            image, types, stats, abilities
                        } = getPokemonFullData(data);

                        return ({
                            name, image, types, stats, abilities
                        })
                    })
                })
            );

            pokemonStore.initializeAllPokemon(allPokemon);
            localStorage.setItem("allPokemon", JSON.stringify(allPokemon));
        });
    };

    return (
        <Routes>
            <Route
                path='/'
                element={<Home pokemonStore={PokemonStore} />}
            />
            <Route
                path='/pokemon/new'
                element={<PokemonNew />}
            />
            <Route
                path='/pokemon/:pokemonName'
                element={<PokemonShow pokemonStore={PokemonStore} />}
            />
        </Routes>
    )
});

export default AppRoutes;