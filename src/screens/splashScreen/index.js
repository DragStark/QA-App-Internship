import {StyleSheet, Text, View, SafeAreaView, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, ROUTES} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { getUserListFromDB } from '../../storage/user';
import { useDispatch } from 'react-redux';
import { addUser } from '../auth/register/userSlice';

const SplashScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  setTimeout(() => {
    navigation.navigate(ROUTES.LOGIN);
  }, 2000);

useEffect(() => {
  getUserListFromDB()
      .then(userList => {
        console.log('get',userList.length,'users from DB then push into redux');
        userList.forEach(user => {
          dispatch(addUser(user));
        });
      })
      .catch(error => {
        console.log(error); // Handle any errors
      });
}, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.logo}>
        <Text style={styles.text}>Splash Screen</Text>
      </View>
      <View style={styles.loadingBar}>
        <LottieView
          source={require('../../assets/progress-bar.json')}
          style={styles.loading}
          autoPlay
          loop
        />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    height: '100%',
  },
  logo: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Open-Sans-Serif',
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  loadingBar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    width: 200,
  },
});
