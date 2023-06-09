import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, ROUTES} from '../../../constants';
import {useNavigation} from '@react-navigation/native';
import {userCollector} from '../../../redux/selector';
import {useSelector, useDispatch} from 'react-redux';
import {loginSuccess} from './authSlice';

const Login = () => {
  const navigation = useNavigation(); //tạo đối tượng navigation để di chuyển giữa các màn hình
  const users = useSelector(userCollector);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    let user = users.find(u => u.email === email && u.password === password);
    if (user) {
      dispatch(loginSuccess(user));
      setEmail('');
      setPassword('');
      navigation.navigate(ROUTES.HOME);
    } else {
      Alert.alert('warning', 'wrong password or email');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.wFull}>
            <View style={styles.row}>
              <Text style={styles.brandName}>HỎI ĐÁP THÔNG MINH</Text>
            </View>

            <Text style={styles.loginContinueTxt}>Mời bạn đăng nhập</Text>
            <TextInput
              style={styles.input}
              placeholder="Tài khoản"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              returnKeyType="next"
              autoCorrect={false}
            />
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              placeholder="Mật Khẩu"
              value={password}
              onChangeText={setPassword}
            />
            <View style={styles.loginBtnWrapper}>
              <LinearGradient
                colors={[COLORS.gradientForm, COLORS.primary]}
                style={styles.linearGradient}
                start={{y: 0.0, x: 0.0}}
                end={{y: 1.0, x: 0.0}}>
                {/******************** LOGIN BUTTON *********************/}
                <TouchableOpacity
                  onPress={handleLogin}
                  activeOpacity={0.7}
                  style={styles.loginBtn}>
                  <Text style={styles.loginText}>Đăng Nhập</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>

            {/***************** FORGOT PASSWORD BUTTON *****************/}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(ROUTES.FORGOT_PASSWORD, {
                  userId: 'X0001',
                  //khi navigate đến forgot password sẽ truyền thêm dữ liệu vào params list của biến route
                })
              }
              style={styles.forgotPassBtn}>
              <Text style={styles.forgotPassText}>Quên Mật Khẩu</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}> Bạn chưa có tài khoản ? </Text>
            {/******************** REGISTER BUTTON *********************/}
            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.REGISTER)}>
              <Text style={styles.signupBtn}>Đăng Kí Ngay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.bgColor,
  },
  container: {
    padding: 15,
    width: '100%',
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    fontSize: 42,
    textAlign: 'center',
    fontWeight: 'bold',
    color: COLORS.primary,
    opacity: 0.9,
  },
  loginContinueTxt: {
    fontSize: 21,
    textAlign: 'center',
    color: COLORS.gray,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    height: 55,
    paddingVertical: 0,
    backgroundColor: COLORS.white,
  },
  // Login Btn Styles
  loginBtnWrapper: {
    height: 55,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  linearGradient: {
    width: '100%',
    borderRadius: 50,
  },
  loginBtn: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 55,
  },
  loginText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '600',
  },
  forgotPassText: {
    color: COLORS.primary,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 15,
  },
  // footer
  footer: {
    marginTop: 10,
    textAlign: 'center',
    flexDirection: 'row',
  },
  footerText: {
    color: COLORS.gray,
    fontWeight: 'bold',
  },
  signupBtn: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  // utils
  wFull: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  mr7: {
    marginRight: 7,
  },
});
