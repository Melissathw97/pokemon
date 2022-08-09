import { fetchPokemon } from '../../API';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PokemonShowProps, PokemonFullData } from './types';
import styles from '../../styles/pokemonShow.module.scss';
import { getPokemonFullData } from '../../helpers/pokemonFullData';

const PokemonShow = ({ pokemonStore }: PokemonShowProps) => {

    const { pokemonName } = useParams();
    const navigate = useNavigate();

    const [pokemonData, setPokemonData] = useState<PokemonFullData>({
        name: "-", image: "", types: [], stats: [], abilities: []
    })

    useEffect(() => {
        loadPokemon()
    }, []);

    const loadPokemon = async () => {
        const filteredPokemon = pokemonStore.allPokemon
            .filter(({ name }: PokemonFullData) => name === pokemonName);

        if (filteredPokemon.length > 0) {
            setPokemonData({ ...filteredPokemon[0] })
        } else if (pokemonName) {
            try {
                const data = await fetchPokemon(pokemonName)
                setPokemonData({ ...getPokemonFullData(data), name: pokemonName })
            }
            catch {
                setPokemonData({ ...pokemonData, name: "- Pokemon Not Found -" })
            }
        }
    }

    const { name, image, types, stats, abilities } = pokemonData;

    return (
        <Fragment>
            <button onClick={() => navigate("/")}>
                &lt; Back to Pokemon List
            </button>
            <div className={styles.pokemonWrapper}>
                <img src={image} className={styles.pokemonImage} />
                <div>
                    <h2>{name}</h2>
                    <p className={styles.subtitle}>
                        Type
                    </p>
                    <p>
                        {types.join(", ")}
                    </p>
                    <p className={styles.subtitle}>
                        Stats
                    </p>
                    <div>
                        {stats.map(({ name, baseStat }) => (
                            <p key={`${name}-${baseStat}`}>
                                {name}: {baseStat}
                            </p>
                        ))}
                    </div>
                    <p className={styles.subtitle}>
                        Abilities
                    </p>
                    <div>
                        {abilities.map(ability => (
                            <p key={ability}>
                                {ability}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

export default PokemonShow;