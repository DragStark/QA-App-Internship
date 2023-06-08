import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, Chat} from '../screens';
import {ROUTES, COLORS} from '../constants';

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: COLORS.white,
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
      }}
      initialRouteName={ROUTES.HOME_TAB}>
      <Stack.Screen name={ROUTES.HOME_TAB} component={Home} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
