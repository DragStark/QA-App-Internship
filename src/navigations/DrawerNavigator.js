import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Wallet, Notifications} from '../screens';
import {COLORS, ROUTES} from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomDrawer from '../components/CustomDrawer';
import BottomTabNavigator from './BottomTabNavigator';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props}/>}
      screenOptions={{
        drawerActiveBackgroundColor: COLORS.primary,
        drawerActiveTintColor: COLORS.white,
        headerShown: false,
        drawerLabelStyle: {
          marginLeft: -20,
        },
      }}>
      <Drawer.Screen
        name={ROUTES.HOME_DRAWER}
        component={BottomTabNavigator}
        options={{
          title: 'Home',
          drawerIcon: ({focused, color, size}) => (
            <Icon name="home" color={color} size={18} />
          ),
        }}
      />
      <Drawer.Screen
        name={ROUTES.WALLET_DRAWER}
        component={Wallet}
        options={{
          title: 'Wallet',
          headerShown: true,
          drawerIcon: ({focused, color, size}) => (
            <Icon name="wallet" color={color} size={18} />
          ),
        }}
      />
      <Drawer.Screen
        name={ROUTES.NOTIFICATIONS_DRAWER}
        component={Notifications}
        options={{
          title: 'Notifications',
          headerShown: true,
          drawerIcon: ({focused, color, size}) => (
            <Icon name="notifications" color={color} size={18} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
