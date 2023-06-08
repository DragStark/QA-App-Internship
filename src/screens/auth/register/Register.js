import React, {useState} from 'react';
import {TextInput, Button, StyleSheet, Alert, Text} from 'react-native';
import {KeyboardAvoidingView, ScrollView} from 'react-native';
import {addUserToDB, getLastUserFromDB} from '../../../storage/user';
import {loginSuccess} from '../login/authSlice';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import { ROUTES } from '../../../constants';

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleRegister = () => {
    if (!name || !username || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    //handle add user to DB
    addUserToDB(name, username, password);
    // Clear the form
    setName('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    Alert.alert('Success', 'Registration successful.');
    getLastUserFromDB()
      .then(lastUser => {
        dispatch(loginSuccess(lastUser));
      })
      .catch(error => {
        console.log(error); // Handle any errors
      });
    navigation.navigate(ROUTES.HOME);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Your name</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.title}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <Text style={styles.title}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <Text style={styles.title}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Button
          style={styles.button}
          title="Register"
          onPress={handleRegister}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    height: '100%',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
  },
});

export default Register;
