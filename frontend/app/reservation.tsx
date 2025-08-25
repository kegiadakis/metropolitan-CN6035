import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import InputField from '../components/ui/InputField';
import RoundedButton from '../components/ui/RoundedButton';
import { useLocalSearchParams, router } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import { createReservation } from '../services/api';

export default function ReservationScreen() {
    const { movieId, cinemaId } = useLocalSearchParams();
    const { token } = useAuth();

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [seatNumbers, setSeatNumbers] = useState('');

    const onSubmit = async () => {
        if (!date || !time || !seatNumbers) {
            return Alert.alert('Missing Fields', 'All fields are required');
        }

        try {
            await createReservation(
                token!,
                Number(movieId),
                Number(cinemaId),
                date,
                time,
                seatNumbers
            );
            Alert.alert('Success', 'Reservation booked!');
            router.replace('./(tabs)/my-reservations');
        } catch (err: any) {
            console.error(err);
            const msg = err?.response?.data?.message || 'Could not create reservation';
            Alert.alert('Error', msg);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Book Reservation</Text>

            <InputField placeholder="Date (YYYY-MM-DD)" onChangeText={setDate} />
            <InputField placeholder="Time (HH:MM)" onChangeText={setTime} />
            <InputField placeholder="Seats (e.g., A1,A2)" onChangeText={setSeatNumbers} />

            <RoundedButton title="Confirm Booking" onPress={onSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, flex: 1, justifyContent: 'center' },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
});