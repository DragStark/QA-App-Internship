import {createSlice} from '@reduxjs/toolkit';
import generateAnswer from '../../../services/generateAnswer';
import { addMessageToDB } from '../../../storage/message';

const initialState = [
  {
    id: 1,
    message: 'Hôm nay ăn gì?',
    roomId: 1,
    userId: 6,
  },
  {
    id: 2,
    message: 'Ăn nhiều rau và bổ sung thêm protein với beef steak.',
    roomId: 1,
    userId: 0,
  },
];

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessageAndAnswer(state, action) {
      //push user's question
      state.push({
        id: action.payload.id,
        message: action.payload.message,
        roomId: action.payload.roomId,
        userId: action.payload.userId,
      });
      //addMessageToDB(action.payload.id, action.payload.message, action.payload.roomId, action.payload.userId);
      //push bot answer
      state.push({
        id: action.payload.id + 1,
        message: action.payload.botMessage,
        roomId: action.payload.roomId,
        userId: 0, // bot id
      });
      //addMessageToDB(action.payload.id + 1, botMessage, action.payload.roomId, 0);
    },
    removeMessageAndAnswer(state, actions) {
      console.log('Removing message');
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === actions.payload) {
          state.splice(i, 2);
        }
      }
    },
  },
});

export const {addMessageAndAnswer, removeMessageAndAnswer} =
  messagesSlice.actions;

export default messagesSlice;
