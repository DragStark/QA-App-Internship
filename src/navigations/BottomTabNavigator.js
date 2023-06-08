import React from 'react';
import {Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Notifications, Chat} from '../screens';
import {COLORS, ROUTES} from '../constants';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import SettingsNavigator from './SettingsNavigator';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const selectedIcon = (route, focused) => {
    let iconName;
    switch (route.name) {
      case ROUTES.HOME_TAB:
        iconName = focused ? 'home' : 'home-outline';
        break;
      case ROUTES.CHAT:
        iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
        break;
      case ROUTES.NOTIFICATIONS:
        iconName = focused
          ? 'md-notifications-sharp'
          : 'md-notifications-outline';
        break;
      case ROUTES.SETTINGS_NAVIGATOR:
        iconName = focused ? 'settings' : 'settings-outline';
        break;
    }
    return iconName;
  };
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.dark,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyled,
        tabBarIcon: ({focused, color, size}) => (
          <Icon name={selectedIcon(route, focused)} color={color} size={24} />
        ),
      })}>
      <Tab.Screen name={ROUTES.HOME_TAB} component={Home} />
      <Tab.Screen name={ROUTES.NOTIFICATIONS} component={Notifications} />
      <Tab.Screen
        name={ROUTES.SETTINGS_NAVIGATOR}
        component={SettingsNavigator}
        options={{
          title: 'Settings',
          headerShown: true,
          headerRight: ({color, size, focused}) => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Icon
                name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                size={30}
                color={COLORS.dark}
                style={{
                  marginRight: 10,
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyled: {
    position: 'absolute',
    backgroundColor: COLORS.white,
    borderTopWidth: 0,
    bottom: 15,
    left: 10,
    right: 10,
    borderRadius: 10,
  },
});
