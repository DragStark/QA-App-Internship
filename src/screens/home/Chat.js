import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {COLORS} from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
const {width} = Dimensions.get('screen');

const Chat = () => {
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.chatWindow}>
        <ScrollView style={styles.inbox}>
          <Text>Hello</Text>
        </ScrollView>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholderTextColor="white"
            placeholder="ask your question..."
            style={styles.inputText}
          />
          <TouchableOpacity style={styles.sendBtn}>
            <Icon name='send' size={20} color={COLORS.white}/>
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
  },
  inbox: {
    flex: 12,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    margin: 10,
    paddingLeft: 10,
  },
  inputText :{
    flex: 1,
  },
  sendBtn:{
    marginTop: 15,
    marginRight: 10,
  },
  bottom: {
    flex: 1,
  },
});
