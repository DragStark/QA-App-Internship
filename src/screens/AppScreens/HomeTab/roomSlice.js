import {createSlice} from '@reduxjs/toolkit';
import {CATEGORIES } from '../../../constants';

const initialState = [
  {
    id: 1,
    name: 'Test 1',
    description: 'for study and work',
    userId: 1,
    category: CATEGORIES.STUDY,
  },
  {
    id: 2,
    name: 'Test 2',
    description: 'when i need tasty food',
    userId: 1,
    category: CATEGORIES.COOK,
  },
  {
    id: 3,
    name: 'Test 3',
    description: 'about life',
    userId: 1,
    category: CATEGORIES.DAILY_LIFE,
  },
];

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    addRoom(state, action) {
        state.push(action.payload);
    },
  },
});

export const {addRoom} = roomSlice.actions;

export default roomSlice;
