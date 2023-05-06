import {createSlice} from '@reduxjs/toolkit';

const initialState = [
  {id: 1, email: 'dragstark@gmail.com', password: '123456', name: 'DragStark'},
  {id: 2, email: 'user2@example.com', password: 'password2', name: 'User 2'},
  {id: 3, email: 'user3@example.com', password: 'password3', name: 'User 3'},
];
const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addUser(state, action){
      state.push(action.payload);
    },
  },
});

export const {addUser} = userSlice.actions;

export default userSlice;
