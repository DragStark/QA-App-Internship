import {createSlice} from '@reduxjs/toolkit';
import {addRoomToDB, deleteRoomById} from '../../../storage/roomChat';

const initialState = [
];

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    addRoom(state, actions) {
      state.push(actions.payload);
      console.log(actions.payload);
      addRoomToDB(
        actions.payload.id,
        actions.payload.name,
        actions.payload.description,
        actions.payload.category,
        actions.payload.userId,
      );
    },
    removeRoom(state, actions) {
      console.log('remove room', actions.payload);
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === actions.payload) {
          state.splice(i, 1);
          deleteRoomById(actions.payload);
          break;
        }
      }
    },
  },
});

export const {addRoom, removeRoom} = roomSlice.actions;

export default roomSlice;
