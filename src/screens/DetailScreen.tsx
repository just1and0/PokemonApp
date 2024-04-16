import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getPokemonDetailsByUrl } from '../utils/api';
import { PokemonDetails } from '../utils/types';
import { DetailScreenRouteProp } from '../utils/navigationTypes'; 
import { detailScreenStyles as styles } from '../styles/styles'; 
const DetailScreen: React.FC = () => {
    const route = useRoute<DetailScreenRouteProp>();
    const [details, setDetails] = useState<PokemonDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            const fetchedDetails = await getPokemonDetailsByUrl(route.params.pokemonUrl);
            setDetails(fetchedDetails);
            setLoading(false);
        };
        fetchDetails();
    }, [route.params.pokemonUrl]);

    if (loading) return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image source={{ uri: details?.sprites.front_default }} style={styles.image} />
                <Text style={styles.title}>{details?.name.toUpperCase()}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Base Experience</Text>
                <Text style={styles.sectionContent}>{details?.base_experience}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Abilities</Text>
                {details?.abilities.map((ability, index) => (
                    <Text key={index} style={styles.sectionContent}>
                        {ability.ability.name} (Hidden: {ability.is_hidden ? 'Yes' : 'No'})
                    </Text>
                ))}
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Forms</Text>
                {details?.forms.map((form, index) => (
                    <Text key={index} style={styles.sectionContent}>{form.name}</Text>
                ))}
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Game Appearances</Text>
                {details?.game_indices.map((game, index) => (
                    <Text key={index} style={styles.sectionContent}>
                        {game.version.name} (Index: {game.game_index})
                    </Text>
                ))}
            </View>
        </ScrollView>
    );
};

export default DetailScreen;
