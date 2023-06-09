import React, {useState} from 'react';
import {
  TextInput,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import {KeyboardAvoidingView, ScrollView} from 'react-native';
import {addUserToDB, getLastUserFromDB} from '../../../storage/user';
import {loginSuccess} from '../login/authSlice';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {COLORS, ROUTES} from '../../../constants';
import {addUser} from './userSlice';

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
        dispatch(addUser(lastUser));
      })
      .catch(error => {
        console.log(error); // Handle any errors
      });
    navigation.navigate(ROUTES.HOME);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Tên</Text>
        <TextInput
          style={styles.input}
          placeholder="Họ Và Tên, VD: Nguyễn Văn A"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.title}>Tên đăng nhập</Text>
        <TextInput
          style={styles.input}
          placeholder="VD: hoidapnhanh"
          value={username}
          onChangeText={setUsername}
        />
        <Text style={styles.title}>Mật khẩu</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <Text style={styles.title}>Nhập lại mật khẩu</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity style={styles.btnRegister} onPress={handleRegister}>
          <Text style={styles.registerText}>ĐĂNG KÍ</Text>
        </TouchableOpacity>
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
  btnRegister: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: COLORS.white,
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default Register;
