import React from 'react';
import {StyleSheet, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import {COLORS, ROUTES} from '../../constants';
import { useNavigation} from '@react-navigation/native';

const Settings = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.bgColor,
      }}>
      <Text>Settings</Text>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}>
        <Text style={styles.buttonText} onPress={()=>navigation.navigate(ROUTES.SETTINGS_DETAIL)}>Go To Settings Detail</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate(ROUTES.LOGIN)} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    padding: 17,
    margin: 10,
    borderRadius: 5,
    fontSize: 18,
    width: 180,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
