import {createSlice} from '@reduxjs/toolkit';
import {CATEGORIES} from '../../../constants';

const initialState = [
  {
    id: 1,
    name: 'Test 1',
    description: 'for study and work',
    userId: 6,
    category: CATEGORIES.STUDY,
  },
  {
    id: 2,
    name: 'Test 2',
    description: 'when i need tasty food',
    userId: 6,
    category: CATEGORIES.COOK,
  },
  {
    id: 3,
    name: 'Test 3',
    description: 'about life',
    userId: 6,
    category: CATEGORIES.DAILY_LIFE,
  },
];

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    addRoom(state, actions) {
      state.push(actions.payload);
      console.log(state);
    },
    removeRoom(state, actions) {
      console.log('remove room', actions.payload);
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === actions.payload) {
          state.splice(i, 1);
          break;
        }
      }
    },
  },
});

export const {addRoom, removeRoom} = roomSlice.actions;

export default roomSlice;
