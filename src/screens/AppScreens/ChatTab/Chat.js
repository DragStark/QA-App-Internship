import {
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Text,
  Keyboard,
  Alert,
  Image,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {CATEGORIES, COLORS} from '../../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {
  roomMessagesCollector,
  userSelector,
  answersCollector,
} from '../../../redux/selector';
import {addMessageAndAnswer} from './messagesSlice';
import checkQuestion from '../../../services/checkQuestion';

const {width} = Dimensions.get('screen');

const Chat = ({route}) => {
  const {roomId, roomName, roomDescription, roomCategory} = route.params;
  const [data, setData] = useState([]);
  const [inputText, setInputText] = useState('');
  const messages = useSelector(roomMessagesCollector);
  const user = useSelector(userSelector);
  const answersList = useSelector(answersCollector);
  const dispatch = useDispatch();
  const flatListRef = useRef(null);

  useEffect(() => {
    const roomMessages = messages.filter(message => message.roomId === roomId);
    setData(roomMessages);
  }, [roomId, messages]);

  const renderUserAvatar = uid => {
    return uid === 0 ? (
      <></>
    ) : (
      <Image
        source={
          user
            ? {uri: user.avatar}
            : require('../../../assets/default-user.png')
        }
      />
    );
  };

  const renderItem = ({item}) => (
    <View style={styles.messageContainer}>
      <Image
        source={
          user
            ? {uri: user.avatar}
            : require('../../../assets/default-user.png')
        }
        style={styles.userImg}
      />
      <View
        style={
          item.userId !== 0 ? styles.questionContainer : styles.answerContainer
        }>
        <Text
          style={
            item.userId !== 0 ? styles.messageQuestion : styles.messageAnswer
          }>
          {item.message}
        </Text>
      </View>
    </View>
  );

  const handleSendMessage = () => {
    if (checkQuestion(inputText)) {
      dispatch(
        addMessageAndAnswer({
          id: messages.length + 1,
          roomId: roomId,
          userId: user.id,
          message: inputText,
          category: CATEGORIES.DAILY_LIFE,
          answersList: answersList,
        }),
      );
      setInputText('');
      Keyboard.dismiss();
      flatListRef.current.scrollToEnd({animated: true});
    } else {
      Alert.alert('warning', 'this is not a question!');
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.chatWindow}>
        <View style={styles.header}>
          <View style={styles.headerTitle}>
            <Text style={styles.headerTitleText}>{roomName}</Text>
            <Text style={styles.headerTitleText}>{roomCategory}</Text>
          </View>
          <Text style={styles.headerDescription}>{roomDescription}</Text>
        </View>
        <FlatList
          ref={flatListRef}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          inverted={false}
        />
        <View style={styles.inputWrapper}>
          <TextInput
            placeholderTextColor="white"
            placeholder="ask your question..."
            style={styles.inputText}
            value={inputText}
            onChangeText={setInputText}
            color="white"
          />
          <TouchableOpacity style={styles.sendBtn} onPress={handleSendMessage}>
            <Icon name="send" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.bgColor,
    paddingBottom: 70,
  },
  chatWindow: {
    flex: 8,
    backgroundColor: COLORS.white,
    width: width - 20,
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
  },
  header: {
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  headerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  headerDescription: {
    fontStyle: 'italic',
  },
  inbox: {
    flex: 12,
    marginVertical: 10,
    marginHorizontal: 10,
    position: 'relative',
    height: '100%',
  },
  messageContainer: {

  },
  userImg: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    position: 'absolute',
    borderWidth: 1,
    borderColor: COLORS.dark,
  },
  questionContainer: {
    borderRadius: 2,
    padding: 10,
    maxWidth: '70%',
    marginVertical: 10,
    backgroundColor: COLORS.primary,
    marginLeft: 40,
  },
  answerContainer: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 2,
    padding: 10,
    maxWidth: '70%',
    marginVertical: 10,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  messageQuestion: {
    color: COLORS.white,
  },
  messageAnswer: {},
  inputWrapper: {
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    paddingLeft: 10,
    marginTop: 10,
  },
  inputText: {
    flex: 1,
  },
  sendBtn: {
    marginTop: 15,
    marginRight: 10,
  },
});
