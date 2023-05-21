import {createSlice} from '@reduxjs/toolkit';

let idCounter = 3;

const initialState = [
  {
    id: 1, // a unique identifier for the message
    text: 'What is your name ?', // the content of the message
    user: {
      // an object representing the user who sent the message
      id: 2,
      email: 'user2@example.com',
      password: 'password2',
      name: 'User 2',
    },
    type: 'question',
  },
  {
    id: 2,
    text: 'my name is Tony',
    type: 'answer',
  },
];

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessageAndAnswer(state, action) {
      //push user's question
      state.push({
        id: ++idCounter,
        text: action.payload.text,
        user: action.payload.user,
        type: 'question',
      });
      //push bot answer
      state.push({
        id: ++idCounter,
        text: 'Alright!',
        type: 'answer',
      });
    },
  },
});

export const {addMessageAndAnswer} = messagesSlice.actions;

export default messagesSlice;
