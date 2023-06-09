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
import generateAnswer from '../../../services/generateAnswer';
import {castTimesIncrease} from './answerSlice';

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
  console.log(messages);

  //prepare data filtering when open chat box
  useEffect(() => {
    //get messages list of this room
    const roomMessages = messages.filter(message => message.roomId === roomId);
    //get answers list by thi room category
    const roomAnswers = answersList.filter(
      answer => answer.category === roomCategory,
    );
    //sort room answers list by castTimes descending
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

  //render message list of this room
  const renderItem = ({item}) => (
    <View>
      <Image
        source={
          item.userId !== 0
            ? {uri: user.avatar}
            : require('../../../assets/bot-icon.jpg')
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

  // render suggestions list when typing in inbox
  const renderMostPopularQuestion = ({item}) => (
    <TouchableOpacity
      style={styles.suggestWrapper}
      onPress={() => handleChoseSuggestion(item.belongToQuestion)}>
      <Text style={styles.suggestText}>{item.belongToQuestion}</Text>
    </TouchableOpacity>
  );

  //when chose once of top 3 in suggestion list
  const handleChoseSuggestion = question => {
    //generate bot answer
    let botMessage = generateAnswer(roomCategory, question, answers);
    //add message and answer to redux
    dispatch(
      addMessageAndAnswer({
        id: messages.length > 0 ? messages[messages.length - 1].id + 1 : 0,
        roomId: roomId,
        userId: user.id,
        message: question,
        botMessage: botMessage.content,
        category: roomCategory,
        answersList: answers,
      }),
    );
    //also increase cast time of this question
    dispatch(castTimesIncrease(botMessage.id));
  };

  //when press on send button of inbox
  const handleSendMessage = () => {
    if (checkQuestion(inputText)) {
      //generate bot answer
      let botMessage = generateAnswer(roomCategory, inputText.trim(), answers);
      //add message and answer to redux
      dispatch(
        addMessageAndAnswer({
          id: messages.length > 0 ? messages[messages.length - 1].id + 1 : 0,
          roomId: roomId,
          userId: user.id,
          message: inputText.trim(),
          botMessage: botMessage.content,
          category: roomCategory,
          answersList: answers,
        }),
      );
      //also increase cast time of this question
      dispatch(castTimesIncrease(botMessage.id));
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
          <View style={styles.descriptionWrapper}>
            <Text style={styles.headerTitleText}>{roomName}</Text>
            <Text style={styles.headerDescription}>{roomDescription}</Text>
          </View>
          <TouchableOpacity
            style={styles.iconBack}
            onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={30} color={COLORS.white} />
          </TouchableOpacity>
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
              <Text style={styles.greetingTitle}>
                Xin chào! chúng tôi có thể giúp gì cho bạn
              </Text>
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
                  style={styles.suggestContainer}
                  onPress={() => setInputText(suggest.belongToQuestion)}>
                  <Text style={styles.suggestText}>
                    {suggest.belongToQuestion}
                  </Text>
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
  },
  greetingTitle: {
    fontSize: 18,
  },
  iconBack: {
    position: 'absolute',
    left: 10,
    top: 15,
  },
  headerGroup: {
    padding: 10,
    borderBottomWidth: 0.2,
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  headerTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  descriptionWrapper: {
    alignItems: 'center',
  },
  headerDescription: {
    fontStyle: 'italic',
    color: COLORS.white,
  },
  inbox: {
    flex: 12,
    justifyContent: 'space-between',
    padding: 10,
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
    borderRadius: 10,
    padding: 10,
    maxWidth: '60%',
    marginVertical: 10,
    backgroundColor: COLORS.primary,
    marginLeft: 50,
  },
  answerContainer: {
    backgroundColor: COLORS.answer,
    borderRadius: 10,
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
    padding: 10,
    backgroundColor: COLORS.primary,
  },
  suggestList: {
    justifyContent: 'flex-end',
  },
  suggestContainer: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderBottomWidth: 0.5,
  },
  suggestText: {
    color: COLORS.white,
  },
});
