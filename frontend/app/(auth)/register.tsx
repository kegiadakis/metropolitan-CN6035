import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { registerUser } from '@/services/api';
import RoundedButton from '@/components/ui/RoundedButton';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async () => {
    if (!name || !email || !password) {
      return Alert.alert('Missing Fields', 'Please fill in all fields');
    }

    try {
      await registerUser(name, email, password);
      Alert.alert('Success', 'Registration complete. Please login.');
      router.replace('./login');
    } catch (err: any) {
      console.log(err);
      const message = err?.response?.data?.message || 'Error registering user';
      Alert.alert('Registration Error', message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
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
        <RoundedButton title="Register" onPress={onSubmit} />
      </View>

      <Text onPress={() => router.push('./login')} style={styles.link}>
        Already have an account? Login
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