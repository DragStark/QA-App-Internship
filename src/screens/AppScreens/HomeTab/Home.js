import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../constants';
import { authenticated } from '../../../redux/selector';
import { useSelector } from 'react-redux';

const Home = () => {
  const auth = useSelector(authenticated);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.bgColor,
      }}>
      <Text>Hello {auth.user}!</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
