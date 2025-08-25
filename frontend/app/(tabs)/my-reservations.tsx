import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { getUserReservations } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { Alert, TouchableOpacity } from 'react-native';
import { deleteReservation } from '../../services/api';
import { router } from 'expo-router';

interface Reservation {
    reservation_id: number;
    movie: {
        title: string;
    };
    cinema: {
        name: string;
        location: string;
    };
    date: string;
    time: string;
    seat_numbers: string;
}

export default function MyReservationsScreen() {
    const { token } = useAuth();
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const data = await getUserReservations(token!);
                setReservations(data);
            } catch (err) {
                console.error('Failed to fetch reservations', err);
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    const handleDelete = (reservationId: number) => {
        Alert.alert('Confirm Delete', 'Are you sure you want to delete this reservation?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                    try {
                        await deleteReservation(token!, reservationId);
                        setReservations((prev) =>
                            prev.filter((r) => r.reservation_id !== reservationId)
                        );
                    } catch (err) {
                        Alert.alert('Error', 'Could not delete reservation');
                    }
                },
            },
        ]);
    };

    if (loading) return <ActivityIndicator size="large" style={styles.loading} />;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Reservations</Text>
            <FlatList
                data={reservations}
                keyExtractor={(item) => item.reservation_id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.movie}>{item.movie?.title}</Text>
                        <Text style={styles.detail}>{item.cinema?.name} – {item.cinema?.location}</Text>
                        <Text style={styles.detail}>Date: {item.date}</Text>
                        <Text style={styles.detail}>Time: {item.time}</Text>
                        <Text style={styles.detail}>Seats: {item.seat_numbers}</Text>
                        <TouchableOpacity
                            onPress={() =>
                                router.push({
                                    pathname: '../edit-reservation',
                                    params: {
                                        reservationId: item.reservation_id,
                                        date: item.date,
                                        time: item.time,
                                        seats: item.seat_numbers,
                                    },
                                })
                            }
                            style={styles.editBtn}
                        >
                            <Text style={styles.editText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleDelete(item.reservation_id)}
                            style={styles.deleteBtn}
                        >
                            <Text style={styles.deleteText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
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
        backgroundColor: '#fff',
        borderRadius: 20,
        marginBottom: 15,
    },
    movie: { fontSize: 18, fontWeight: 'bold' },
    detail: { fontSize: 14, color: '#555' },
    editBtn: {
        marginTop: 10,
        backgroundColor: '#3b82f6',
        paddingVertical: 8,
        borderRadius: 15,
        alignItems: 'center',
    },
    editText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    deleteBtn: {
        marginTop: 10,
        backgroundColor: '#ef4444',
        paddingVertical: 8,
        borderRadius: 15,
        alignItems: 'center',
    },
    deleteText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});