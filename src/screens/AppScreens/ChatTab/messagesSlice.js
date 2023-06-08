import {createSlice} from '@reduxjs/toolkit';
import generateAnswer from '../../../services/generateAnswer';

const initialState = [
  {
    id: 1,
    message: 'Hôm nay ăn gì?',
    roomId: 1,
    userId: 6,
    //createdAt: time1,
  },
  {
    id: 2,
    message: 'Ăn nhiều rau và bổ sung thêm protein với beef steak.',
    roomId: 1,
    userId: 0,
    //createdAt: time1,
  },
];

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessageAndAnswer(state, action) {
      //let timestamp = new Date().getTime();
      console.log(action.payload.id);
      let botMessage = generateAnswer(
        action.payload.category,
        action.payload.message,
        action.payload.answersList,
      );
      //push user's question
      state.push({
        id: action.payload.id,
        message: action.payload.message,
        roomId: action.payload.roomId,
        userId: action.payload.userId,
        //createdAt: timestamp,
      });
      //push bot answer
      state.push({
        id: action.payload.id + 1,
        message: botMessage,
        roomId: action.payload.roomId,
        userId: 0, // bot id
        //createdAt: timestamp,
      });
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
