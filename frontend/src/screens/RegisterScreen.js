import React, { useState, useContext } from 'react';
import { Button, Image, StyleSheet, TextInput, View, Alert } from 'react-native';
import { AuthContext } from './context/AuthContext';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { register, loading } = useContext(AuthContext);

  const handleRegister = () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    register(name, email, password)
      .then(() => {
        Alert.alert('Success', 'Registration successful');
        navigation.navigate('Home');
      })
      .catch(error => {
        Alert.alert('Error', `Registration failed: ${error.message}`);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Image source={require('../../logo.png')} style={styles.logo} />
      </View>

      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={val => setName(val)}
      />
      <TextInput
        placeholder="Email"
        autoCapitalize='none'
        style={styles.input}
        value={email}
        onChangeText={val => setEmail(val)}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={val => setPassword(val)}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} disabled={loading} />
      <Button title="Back to Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  logoWrapper: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 100,
    height: 100,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default RegisterScreen;