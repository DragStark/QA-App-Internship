import React, {useState} from 'react';
import {TextInput, Button, StyleSheet, Alert, Text, View} from 'react-native';
import {KeyboardAvoidingView, ScrollView} from 'react-native';
import {CATEGORIES} from '../../../constants';
import { createAnswersTable, addAnswer } from '../../../storage/answer';

const AddAnswer = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('');
  const keys = Object.keys(CATEGORIES);

  const handleAddAnswer = () => {
    if (!question || !answer || !category) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    //create answer table in database
    createAnswersTable();
    //handle add answer to DB
    addAnswer(question, answer, category);
    // Clear the form
    setQuestion('');
    setAnswer('');
    setCategory('');
    Alert.alert('Success', 'add answer successful.');
  };

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const renderCategories = () => {
    return keys.map(key => (
      <View style={styles.categoryBtn} key={key}>
        <Button
          title={CATEGORIES[key]}
          color={category === key ? 'red' : 'green'}
          onPress={()=>handleCategoryChange(key)}
        />
      </View>
    ));
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Question that answer belong to</Text>
        <TextInput
          style={styles.input}
          placeholder="Question"
          value={question}
          onChangeText={setQuestion}
        />
        <Text style={styles.title}>Answer content</Text>
        <TextInput
          style={styles.input}
          placeholder="answer"
          value={answer}
          onChangeText={setAnswer}
        />
        <Text style={styles.title}>Category</Text>
        <View style={styles.categoriesList}>{renderCategories()}</View>
        <Button
          style={styles.button}
          title="Add Answer"
          onPress={handleAddAnswer}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    height: '100%',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoriesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  categoryBtn: {
    marginRight: 10,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
});

export default AddAnswer;
