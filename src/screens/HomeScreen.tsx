import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { getPokemons } from '../utils/api';
import { Pokemon } from '../utils/types';
import { HomeScreenNavigationProp } from './../utils/navigationTypes';
import { homeScreenStyles as styles } from '../styles/styles'; 

const HomeScreen: React.FC = () => {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [offset, setOffset] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const loadPokemons = async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        const result = await getPokemons(offset, 20);
        if (result.results.length === 0) {
            setHasMore(false);
        } else {
            setPokemonList([...pokemonList, ...result.results]);
            setOffset(offset + 20);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadPokemons();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={pokemonList}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => navigation.navigate('Detail', { pokemonUrl: item.url })}
                    >
                        <Text style={styles.title}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
                onEndReached={loadPokemons}
                onEndReachedThreshold={0.5}
            />
        </SafeAreaView>
    );
};

export default HomeScreen;
