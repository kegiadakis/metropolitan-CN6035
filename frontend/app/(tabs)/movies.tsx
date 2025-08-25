import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { getAllMovies, getMoviesByCinema } from '../../services/api';
import { useAuth } from '@/contexts/AuthContext';

interface Movie {
    movie_id: number;
    cinema: {
        cinema_id: number;
        name: string;
        location: string;
        description: string;
    };
    title: string;
    duration: number;
    rating: string;
}

export default function MoviesScreen() {
    const { token } = useAuth();
    const { cinemaId } = useLocalSearchParams();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async (cinemaId?: number) => {
            try {
                var data = null;
                if (cinemaId) {
                    data = await getMoviesByCinema(cinemaId, token!);
                }
                else {
                    data = await getAllMovies(token!);
                }
                setMovies(data);
            } catch (err) {
                console.error('Failed to fetch movies', err);
            } finally {
                setLoading(false);
            }
        };

        if (cinemaId && !isNaN(Number(cinemaId))) {
            fetchMovies(Number(cinemaId));
        } else if (!cinemaId) {
            fetchMovies();
        }
        else {
            console.error('Cinema ID invalid: ', cinemaId);
        }
    }, [cinemaId]);

    if (loading) return <ActivityIndicator size="large" style={styles.loading} />;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Movies</Text>
            <FlatList
                data={movies}
                keyExtractor={(item) => item.movie_id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => router.push({
                            pathname: '../reservation',
                            params: {
                                movieId: item.movie_id,
                                cinemaId: item.cinema.cinema_id,
                            },
                        })}
                    >
                        <Text style={styles.name}>{item.title}</Text>
                        <Text style={styles.detail}>Duration: {item.duration} mins</Text>
                        <Text style={styles.detail}>Rating: {item.rating}</Text>
                        <Text style={styles.cinema}>Cinema: {item.cinema.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    container: { flex: 1, padding: 20 },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    card: {
        padding: 16,
        backgroundColor: '#f9fafb',
        borderRadius: 20,
        marginBottom: 15,
    },
    name: { fontSize: 18, fontWeight: 'bold' },
    detail: { fontSize: 14, color: '#555' },
    cinema: {fontSize: 14, color: '#555'},
});