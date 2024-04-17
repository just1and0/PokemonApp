import { PokemonApiResponse, PokemonDetails } from './types'; 
import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export const getPokemons = async (offset: number = 0, limit: number = 20): Promise<PokemonApiResponse> => {
    try {
        const response = await axios.get<PokemonApiResponse>(`${BASE_URL}?offset=${offset}&limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch pokemons:', error); 
        return { count: 0, next: null, previous: null, results: [] };
    }
};

export const getPokemonDetails = async (pokemonName: string): Promise<PokemonDetails | null> => {
    try {
        const response = await axios.get<PokemonDetails>(`${BASE_URL}/${pokemonName}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch details for ${pokemonName}:`, error);
        return null;
    }
};

export const getPokemonDetailsByUrl = async (url: string): Promise<PokemonDetails | null> => {
    try {
        const response = await axios.get<PokemonDetails>(url);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch details from URL ${url}:`, error);
        return null;
    }
};