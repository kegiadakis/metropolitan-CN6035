import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { router } from 'expo-router';
import RoundedButton from '@/components/ui/RoundedButton';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async () => {
    try {
      await login(email, password);
    } catch (err: any) {
      console.log(err);
      Alert.alert('Login failed', err?.response?.data?.message || 'Check your credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cinema Booking Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />
      <View style={styles.button}>
        <RoundedButton title="Login" onPress={onSubmit} />
      </View>
      <Text onPress={() => router.push('./register')} style={styles.link}>
        Don’t have an account? Register
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 20 },
  button: { marginBottom: 10 },
  link: { color: 'blue', marginTop: 10, textAlign: 'center' },
});