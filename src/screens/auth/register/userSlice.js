import {createSlice} from '@reduxjs/toolkit';

const initialState = [
];
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state, action) {
      state.push(action.payload);
    },
  },
});

export const {startCollection, stopCollection, addUser} = userSlice.actions;

export default userSlice;
