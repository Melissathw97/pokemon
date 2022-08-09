import styles from '../../styles/pokemonNew.module.scss';
import { PokemonStore } from '../../components/PokemonStore';
import NewPokemonForm from './Form';

const PokemonNew = () => {

    return (
        <div className={styles.formWrapper}>
            <h3>Make your own Pokemon!</h3>
            <NewPokemonForm pokemonStore={PokemonStore} />
        </div>
    )
};

export default PokemonNew;