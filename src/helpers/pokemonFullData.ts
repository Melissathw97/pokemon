interface iPokemonType {
    slot: number,
    type: {
        name: string,
        url: string,
    }
}

interface iPokemonStat {
    base_stat: number,
    effort: number,
    stat: {
        name: string,
        url: string
    }
}

interface iPokemonAbility {
    slot: number,
    is_hidden: boolean,
    ability: {
        name: string,
        url: string
    }
}

interface iPokemonData {
    image: string,
    types: iPokemonType[],
    stats: iPokemonStat[],
    abilities: iPokemonAbility[]
}

export const getPokemonFullData = (data: iPokemonData) => {
    const types = data.types.map(({ type: { name } }: iPokemonType) => name)
    const stats = data.stats.map(({ base_stat: baseStat, stat: { name } }: iPokemonStat) => ({ name, baseStat }))
    const abilities = data.abilities.map(({ ability: { name } }: iPokemonAbility) => name)

    return {
        image: data.image,
        types,
        stats,
        abilities
    }
};