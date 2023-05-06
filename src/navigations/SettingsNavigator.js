import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SettingsDetail, Settings} from '../screens';
import {ROUTES, COLORS} from '../constants';

const Stack = createStackNavigator();

const SettingsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: COLORS.white,
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
      }}
      initialRouteName={ROUTES.SETTINGS}>
      <Stack.Screen name={ROUTES.SETTINGS} component={Settings} />
      <Stack.Screen name={ROUTES.SETTINGS_DETAIL} component={SettingsDetail} />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
