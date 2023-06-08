import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Login, ForgotPassword, Register, AddAnswer, SplashScreen, Chat} from '../screens';
import {ROUTES, COLORS} from '../constants';
import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: COLORS.white,
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
      }}
      initialRouteName={ROUTES.SPLASH}>
      <Stack.Screen name={ROUTES.SPLASH} component={SplashScreen} options={{
        headerShown: false,
      }}/>
      <Stack.Screen name={ROUTES.LOGIN} component={Login} options={{
        headerShown: false,
      }}/>
      {/* atribute options cho phép Screen nhận vào params và cấu hình lại screen  */}
      <Stack.Screen
        name={ROUTES.FORGOT_PASSWORD}
        component={ForgotPassword}
        options={({route}) => ({
          title: route.params.userId,
          headerBackTitle: 'Login',
          headerBackTitleVisible: true,
        })}
      />
      <Stack.Screen name={ROUTES.REGISTER} component={Register} />
      <Stack.Screen name={ROUTES.ADD_ANSWER} component={AddAnswer} />
      <Stack.Screen options={{
        headerShown: false,
      }} name={ROUTES.CHAT} component={Chat} />
      <Stack.Screen
        name={ROUTES.HOME}
        component={DrawerNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
