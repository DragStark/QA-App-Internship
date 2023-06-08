import {StyleSheet, Text, View, SafeAreaView, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {COLORS, ROUTES} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {getUserListFromDB} from '../../storage/user';
import {useDispatch} from 'react-redux';
import {addUser} from '../auth/register/userSlice';
import {createMessagesTable, deleteMessagesTable, getMessagesListFromDB} from '../../storage/message';
import {addMessage} from '../AppScreens/ChatTab/messagesSlice';
import {createRoomChatTable, deleteRoomChatTable, getRoomList} from '../../storage/roomChat';
import {addRoom} from '../AppScreens/HomeTab/roomSlice';
import {createAnswersTable, deleteAnswersTable, getAnswersListFromDB} from '../../storage/answer';
import {addAnswer} from '../AppScreens/ChatTab/answerSlice';
import {addAnswerToDB} from '../../storage/answer';

const SplashScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  setTimeout(() => {
    navigation.navigate(ROUTES.LOGIN);
  }, 2000);

  useEffect(() => {
    // deleteAnswersTable();
    // deleteMessagesTable();
    // deleteRoomChatTable();
    // createAnswersTable();
    // createMessagesTable();
    // createRoomChatTable();
    // load all answers to database
    // addAnswerToDB();
    // get user list from database
    getUserListFromDB()
      .then(userList => {
        console.log(
          'get',
          userList.length,
          'users from DB then push into redux',
        );
        userList.forEach(user => {
          dispatch(addUser(user));
        });
      })
      .catch(error => {
        console.log(error); // Handle any errors
      });
    //get msg list from database
    getMessagesListFromDB()
      .then(messagesList => {
        console.log(
          'get',
          messagesList.length,
          'messages from DB then push into redux',
        );
        messagesList.forEach(message => {
          dispatch(addMessage(message));
        });
      })
      .catch(error => {
        console.log(error); // Handle any errors
      });
    //get room list from database
    getRoomList()
      .then(roomList => {
        console.log(
          'get',
          roomList.length,
          'rooms from DB then push into redux',
        );
        roomList.forEach(room => {
          dispatch(addRoom(room));
        });
      })
      .catch(error => {
        console.log(error); // Handle any errors
      });
    //get answers list from database
    getAnswersListFromDB()
      .then(answersList => {
        console.log(
          'get',
          answersList.length,
          'answers from DB then push into redux',
        );
        answersList.forEach(answer => {
          dispatch(addAnswer(answer));
        });
      })
      .catch(error => {
        console.log(error); // Handle any errors
      });
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.logo}>
        <Text style={styles.text}>Splash Screen</Text>
      </View>
      <View style={styles.loadingBar}>
        <LottieView
          source={require('../../assets/progress-bar.json')}
          style={styles.loading}
          autoPlay
          loop
        />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    height: '100%',
  },
  logo: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Open-Sans-Serif',
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  loadingBar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    width: 200,
  },
});
