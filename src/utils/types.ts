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

 
export interface PokemonApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
}

export interface Version {
    name: string;
    url: string;
}

export interface GameIndex {
    game_index: number;
    version: Version;
}

export interface Form {
    name: string;
    url: string;
}

export interface Cry {
    latest: string;
    legacy: string;
}

export interface PokemonDetails {
    abilities: Ability[];
    stats: Stat[];
    types: Type[];
    name: string;
    id: number;
    sprites: {
        front_default: string;
    };
    base_experience: number;
    cries: Cry;
    forms: Form[];
    game_indices: GameIndex[];
}
