export interface Pokemon {
    name: string;
    url: string;
}

export interface Ability {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
}

export interface Stat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

export interface Type {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

export interface PokemonDetails {
    abilities: Ability[];
    stats: Stat[];
    types: Type[]; 
}

export interface PokemonApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
}
