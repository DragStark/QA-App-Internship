import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';

const ForgotPassword = () => {
  const route = useRoute();// khởi tạo biến route, biến này nhận giá trị truyền vào khi được navigate tới
  return (
    <View style={styles.container}>
      <Text>ForgotPassword</Text>
      {/* in ra giá trị userId được truyền vào khi navigate từ màn khác tới */}
      <Text>Param: {route.params.userId}</Text>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
