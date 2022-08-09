import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { SearchFormProps } from './types';
import styles from '../../../styles/header.module.scss';

const SearchForm = observer(({ pokemonStore }: SearchFormProps) => {

    const [searchValue, setSearchValue] = useState<string>(pokemonStore.searchValue);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchValue(e.target.value);
    }

    const submitSearch = async (e: React.ChangeEvent<HTMLFormElement>): Promise<any> => {
        e.preventDefault();

        if (searchValue.length > 0) {
            pokemonStore.searchPokemon(searchValue);
        }
    };

    const cancelSearch = () => {
        pokemonStore.cancelSearch();
        setSearchValue("");
    };

    if (pokemonStore.isSearching) {
        return (
            <div>
                <input
                    type="text"
                    placeholder="Search Pokemon..."
                    value={searchValue}
                    disabled={true}
                />
                <button
                    className={styles.searchButton}
                    onClick={cancelSearch}
                >
                    Cancel
                </button>
            </div>
        )
    }

    return (
        <form onSubmit={submitSearch}>
            <input
                type="text"
                placeholder="Search Pokemon..."
                value={searchValue}
                onChange={onChange}
            />
            {
                searchValue.length > 0 ?
                    <button className={styles.searchButton}>
                        Search
                    </button>
                    : null
            }
        </form>
    )
});

export default SearchForm;