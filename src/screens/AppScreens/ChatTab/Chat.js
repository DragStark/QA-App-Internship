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
import {COLORS} from '../../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {
  roomMessagesCollector,
  userSelector,
  answersCollector,
} from '../../../redux/selector';
import {addMessageAndAnswer} from './messagesSlice';
import checkQuestion from '../../../services/checkQuestion';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('screen');

const Chat = ({route}) => {
  const {roomId, roomName, roomDescription, roomCategory} = route.params;
  const [data, setData] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [inputText, setInputText] = useState('');
  const [top3, setTop3] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const messages = useSelector(roomMessagesCollector);
  const user = useSelector(userSelector);
  const answersList = useSelector(answersCollector);
  const dispatch = useDispatch();
  const flatListRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    const roomMessages = messages.filter(message => message.roomId === roomId);
    const roomAnswers = answersList.filter(
      answer => answer.category === roomCategory,
    );
    //sort room answers by castTimes descending
    roomAnswers.sort((a, b) => b.castTimes - a.castTimes);
    // get top 3 most call answers
    const top3MostCall = roomAnswers.slice(0, 3);
    //
    if (inputText.length > 0) {
      let suggestList = roomAnswers.filter(answer => {
        if (answer.belongToQuestion !== inputText) {
          return answer.belongToQuestion.includes(inputText);
        }
      });
      suggestList = suggestList.slice(0, 2);
      setSuggestions(suggestList);
    }
    setData(roomMessages);
    setAnswers(roomAnswers);
    setTop3(top3MostCall);
  }, [roomId, roomCategory, messages, answersList, inputText]);

  const renderItem = ({item}) => (
    <View>
      <Image
        source={
          item.userId !== 0
            ? {uri: user.avatar}
            : require('../../../assets/default-user.png')
        }
        style={item.userId !== 0 ? styles.userAvatar : styles.botAvatar}
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

  const renderMostPopularQuestion = ({item}) => (
    <TouchableOpacity
      style={styles.suggestWrapper}
      onPress={() => handleChoseSuggestion(item.belongToQuestion)}>
      <Text>{item.belongToQuestion}</Text>
    </TouchableOpacity>
  );

  const handleChoseSuggestion = question => {
    dispatch(
      addMessageAndAnswer({
        id: messages[messages.length - 1].id + 1,
        roomId: roomId,
        userId: user.id,
        message: question,
        category: roomCategory,
        answersList: answers,
      }),
    );
  };

  const handleSendMessage = () => {
    if (checkQuestion(inputText)) {
      dispatch(
        addMessageAndAnswer({
          id: messages[messages.length - 1].id + 1,
          roomId: roomId,
          userId: user.id,
          message: inputText.trim(),
          category: roomCategory,
          answersList: answers,
        }),
      );
      setInputText('');
      Keyboard.dismiss();
      if (data.length > 0) {
        flatListRef.current.scrollToEnd({animated: true});
      }
    } else {
      Alert.alert('warning', 'this is not a question!');
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.chatWindow}>
        <View style={styles.headerGroup}>
          <View style={styles.header}>
            <Text style={styles.headerTitleText}>{roomName}</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.headerTitleText}>Back</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.headerTitle}>
            <Text style={styles.headerDescription}>{roomDescription}</Text>
            <Text style={styles.headerTitleText}>{roomCategory}</Text>
          </View>
        </View>
        <View style={styles.inbox}>
          {data.length > 0 && (
            <FlatList
              ref={flatListRef}
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              inverted={false}
            />
          )}
          {data.length === 0 && inputText.length === 0 && (
            <View style={styles.greeting}>
              <Text>Xin chào! chúng tôi có thể giúp gì cho bạn</Text>
              <FlatList
                data={top3}
                renderItem={renderMostPopularQuestion}
                keyExtractor={item => item.id.toString()}
                inverted={false}
              />
            </View>
          )}
          {inputText.length > 0 && suggestions.length > 0 && (
            <View style={styles.suggestList}>
              {suggestions.map(suggest => (
                <TouchableOpacity
                  key={suggest.id}
                  onPress={() => setInputText(suggest.belongToQuestion)}>
                  <Text>{suggest.belongToQuestion}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <View style={styles.inputWrapper}>
            <TextInput
              placeholderTextColor="white"
              placeholder="ask your question..."
              style={styles.inputText}
              value={inputText}
              onChangeText={setInputText}
              color="white"
            />
            <TouchableOpacity
              style={styles.sendBtn}
              onPress={handleSendMessage}>
              <Icon name="send" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
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
    paddingBottom: 10,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerGroup: {
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
    justifyContent: 'space-between',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    position: 'absolute',
    borderWidth: 1,
    borderColor: COLORS.dark,
    marginTop: 10,
  },
  botAvatar: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    position: 'absolute',
    borderWidth: 1,
    borderColor: COLORS.dark,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  questionContainer: {
    borderRadius: 2,
    padding: 10,
    maxWidth: '60%',
    marginVertical: 10,
    backgroundColor: COLORS.primary,
    marginLeft: 50,
  },
  answerContainer: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 2,
    padding: 10,
    maxWidth: '60%',
    marginVertical: 10,
    marginRight: 50,
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

  greeting: {
    marginTop: 15,
    alignItems: 'flex-end',
  },
  suggestWrapper: {
    marginTop: 10,
    borderRadius: 20,
    borderWidth: 1,
    padding: 10,
  },
  suggestList: {
    color: COLORS.primary,
  },
});
