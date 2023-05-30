import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Dimensions,
  Text,
} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {COLORS} from '../constants';
import {userSelector} from '../redux/selector';
import {useSelector} from 'react-redux';

const {width} = Dimensions.get('screen');
const CustomDrawer = props => {
  const user = useSelector(userSelector);
  return (
    <DrawerContentScrollView {...props}>
      <ImageBackground
        source={
          user
            ? {uri: user.background}
            : require('../assets/default-background.jpg')
        }
        style={{height: 140}}>
        <Image
          source={
            user ? {uri: user.avatar} : require('../assets/default-user.png')
          }
          style={styles.userImg}
        />
      </ImageBackground>
      <View style={styles.userNameWrapper}>
        <Text style={styles.userName}>{user ? user.name : ''}</Text>
      </View>
      <View style={styles.drawerListWrapper}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  userImg: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
    position: 'absolute',
    left: width / 2 - 120,
    bottom: -110 / 2,
    borderWidth: 4,
    borderColor: COLORS.white,
  },
  userNameWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  drawerListWrapper: {
    marginTop: 10,
  },
});
