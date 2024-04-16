import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { getPokemons } from '../utils/api';
import { Pokemon } from '../utils/types';
import { HomeScreenNavigationProp } from './../utils/navigationTypes';

const HomeScreen: React.FC = () => {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const loadPokemons = async () => {
        setLoading(true);
        const result = await getPokemons(0, 20);
        setPokemonList(result.results);
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
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 20,
    },
});

export default HomeScreen;
