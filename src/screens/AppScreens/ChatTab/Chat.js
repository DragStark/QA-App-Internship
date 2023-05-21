import {
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Text,
  Keyboard,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {COLORS} from '../../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {messagesCollector, userSelector} from '../../../redux/selector';
import {addMessageAndAnswer} from './messagesSlice';
import checkQuestion from '../../../services/checkQuestion';

const {width} = Dimensions.get('screen');

const Chat = () => {
  const [data, setData] = useState([]);
  const [inputText, setInputText] = useState('');
  const messages = useSelector(messagesCollector);
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const flatListRef = useRef(null);

  useEffect(() => {
    setData(messages);
  }, [messages]);

  const renderItem = ({item}) => (
    <View
      style={
        item.type === 'question'
          ? styles.questionContainer
          : styles.answerContainer
      }>
      <Text
        style={
          item.type === 'question'
            ? styles.messageQuestion
            : styles.messageAnswer
        }>
        {item.text}
      </Text>
    </View>
  );

  const handleSendMessage = () => {
    if (checkQuestion(inputText)) {
      dispatch(
        addMessageAndAnswer({
          text: inputText,
          user: user,
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
      <View style={styles.bottom}></View>
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
  },
  chatWindow: {
    flex: 8,
    backgroundColor: COLORS.white,
    width: width - 20,
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
  },
  inbox: {
    flex: 12,
    marginVertical: 10,
    marginHorizontal: 10,
    position: 'relative',
    height: '100%',
  },
  questionContainer: {
    borderRadius: 2,
    padding: 10,
    maxWidth: '70%',
    marginVertical: 10,
    backgroundColor: COLORS.primary,
  },
  answerContainer: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 2,
    padding: 10,
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
  bottom: {
    flex: 1,
  },
});
