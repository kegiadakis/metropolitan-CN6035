import React from 'react';
import { TextInput, StyleSheet, TextInputProps, View } from 'react-native';

interface InputFieldProps extends TextInputProps { }

const InputField: React.FC<InputFieldProps> = (props) => {
  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        placeholderTextColor="#888"
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});

export default InputField;