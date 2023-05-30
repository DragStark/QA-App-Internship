import {createSlice} from '@reduxjs/toolkit';
import generateAnswer from '../../../services/generateAnswer';

let time1 = new Date(2023, 3, 23, 10, 20, 30, 30);
const initialState = [
  {
    id: 1,
    message: 'Hôm nay ăn gì?',
    roomId: 1,
    userId: 1,
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
  },
});

export const {addMessageAndAnswer} = messagesSlice.actions;

export default messagesSlice;
