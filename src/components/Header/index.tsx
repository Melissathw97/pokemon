import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styles from '../../styles/header.module.scss';
import { PokemonStore } from '../PokemonStore';
import SearchForm from './SearchForm';

const Header = () => {

  const router = useLocation();

  return (
    <div className={styles.headerWrapper}>
      <Link to="/">
        <img src="/Pokemon logo.png" alt="Pokemon Logo" />
      </Link>

      <div>
        {router.pathname === "/" ?
          <SearchForm
            pokemonStore={PokemonStore}
          />
          : null
        }
        <Link to="/pokemon/new" className={styles.headerLink}>
          <button>
            Create New Pokemon
          </button>
        </Link>
      </div>
    </div>
  )
};

export default Header;