import {createSlice} from '@reduxjs/toolkit';
import {addMessageToDB, deleteMessageById} from '../../../storage/message';

const initialState = [];

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage(state, action) {
      state.push(action.payload);
    },
    addMessageAndAnswer(state, action) {
      //push user's question
      state.push({
        id: action.payload.id,
        message: action.payload.message,
        roomId: action.payload.roomId,
        userId: action.payload.userId,
      });
      addMessageToDB(
        action.payload.id,
        action.payload.message,
        action.payload.roomId,
        action.payload.userId,
      );
      //push bot answer
      state.push({
        id: action.payload.id + 1,
        message: action.payload.botMessage,
        roomId: action.payload.roomId,
        userId: 0, // bot id
      });
      addMessageToDB(
        action.payload.id + 1,
        action.payload.botMessage,
        action.payload.roomId,
        0,
      );
    },
    removeMessageAndAnswer(state, actions) {
      console.log('Removing message');
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === actions.payload) {
          state.splice(i, 2);
          deleteMessageById(actions.payload);
          deleteMessageById(actions.payload + 1);
        }
      }
    },
  },
});

export const {addMessageAndAnswer, removeMessageAndAnswer, addMessage} =
  messagesSlice.actions;

export default messagesSlice;
