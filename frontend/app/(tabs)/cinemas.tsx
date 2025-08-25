import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getCinemas } from '../../services/api';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

interface Cinema {
    cinema_id: number;
    name: string;
    location: string;
    description: string;
}

export default function CinemasScreen() {
    const [cinemas, setCinemas] = useState<Cinema[]>([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();

    useEffect(() => {
        const fetchCinemas = async () => {
            try {
                const data = await getCinemas(token!);
                setCinemas(data);
            } catch (err) {
                console.error('Failed to fetch cinemas', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCinemas();
    }, []);

    if (loading) return <ActivityIndicator size="large" style={styles.loading} />;

    return (
        // Wanted to use both scroll and flat list views, the only semi-applicable 
        // usecase for scrollview was the cinemas. I mean, how many can be build in a short
        // span to justify a flatlist :).
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Available Cinemas</Text>
            {cinemas.map((cinema) => (
                <TouchableOpacity
                    key={cinema.cinema_id}
                    style={styles.card}
                    onPress={() => router.push({ pathname: './movies', params: { cinemaId: cinema.cinema_id } })}
                >
                    <Text style={styles.name}>{cinema.name}</Text>
                    <Text style={styles.location}>{cinema.location}</Text>
                    <Text style={styles.desc}>{cinema.description}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    container: { padding: 20 },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    card: {
        padding: 16,
        backgroundColor: '#f1f5f9',
        borderRadius: 20,
        marginBottom: 15,
    },
    name: { fontSize: 18, fontWeight: 'bold' },
    location: { fontSize: 14, color: '#555' },
    desc: { fontSize: 14, color: '#444', marginTop: 6 },
});