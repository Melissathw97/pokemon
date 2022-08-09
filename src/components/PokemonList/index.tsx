import { Fragment } from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/pokemonList.module.scss';
import { PokemonFullData, PokemonListProps } from './types';
import { iPokemonStat } from '../PokemonStore';

const PokemonList = observer(({ pokemonStore }: PokemonListProps) => {

  const navigate = useNavigate();

  const pageRedirect = (name: string) => {
    navigate(`/pokemon/${name}`)
  };

  return (
    <Fragment>
      <table className={styles.table}>
        <thead>
          <tr>
            <th></th>
            <th>
              Name & Type
            </th>
            <th>
              Stats
            </th>
          </tr>
        </thead>
        <tbody>
          {pokemonStore.pokemonToDisplay.map(({ name, image, types, stats }: PokemonFullData) => (
            <tr
              key={name}
              onClick={() => pageRedirect(name)}
            >
              <td>
                <img src={image} />
              </td>
              <td>
                {name}
                <br />
                <small>
                  {types.join(", ")}
                </small>
              </td>
              <td>
                {stats.slice(0, 3).map(({ name, baseStat }: iPokemonStat) => (
                  <Fragment key={name}>
                    <small>{name}: {baseStat}</small>
                    <br />
                  </Fragment>
                )
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  )
});

export default PokemonList;