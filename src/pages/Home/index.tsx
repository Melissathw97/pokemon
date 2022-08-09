import { iHomeProps } from './types';
import { observer } from 'mobx-react';
import { Fragment } from 'react';
import PokemonList from '../../components/PokemonList';

const Home = observer(({ pokemonStore }: iHomeProps) => {
  return (
    <Fragment>
      <PokemonList pokemonStore={pokemonStore} />
    </Fragment>
  )
});

export default Home;