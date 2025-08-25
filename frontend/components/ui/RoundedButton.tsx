import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface RoundedButtonProps {
  title: string;
  onPress: () => void;
}

const RoundedButton: React.FC<RoundedButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.label}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3B82F6',
    padding: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default RoundedButton;