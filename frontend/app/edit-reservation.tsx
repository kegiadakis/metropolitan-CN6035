import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import InputField from '../components/ui/InputField';
import RoundedButton from '../components/ui/RoundedButton';
import { useLocalSearchParams, router } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import { updateReservation } from '../services/api';

export default function EditReservationScreen() {
  const { reservationId, date: initDate, time: initTime, seats: initSeats } = useLocalSearchParams();
  const { token } = useAuth();

  const [date, setDate] = useState(initDate as string);
  const [time, setTime] = useState(initTime as string);
  const [seatNumbers, setSeatNumbers] = useState(initSeats as string);

  const onSubmit = async () => {
    if (!date || !time || !seatNumbers) {
      return Alert.alert('Missing Fields', 'All fields are required');
    }

    try {
      await updateReservation(token!, Number(reservationId), {
        date: date,
        time: time,
        seat_numbers: seatNumbers,
      });
      Alert.alert('Success', 'Reservation updated!');
      router.replace('./my-reservations');
    } catch (err: any) {
      console.error(err);
      const msg = err?.response?.data?.message || 'Could not update reservation';
      Alert.alert('Error', msg);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Reservation</Text>

      <InputField placeholder="Date (YYYY-MM-DD)" value={date} onChangeText={setDate} />
      <InputField placeholder="Time (HH:MM)" value={time} onChangeText={setTime} />
      <InputField placeholder="Seats (e.g., A1,A2)" value={seatNumbers} onChangeText={setSeatNumbers} />

      <RoundedButton title="Save Changes" onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
});