import {createAsyncThunk} from '@reduxjs/toolkit';
import {loginSuccess, loginFailed} from './authSlice';

const users = [
  {id: 1, email: 'user1@example.com', password: 'password1', name: 'User 1'},
  {id: 2, email: 'user2@example.com', password: 'password2', name: 'User 2'},
  {id: 3, email: 'user3@example.com', password: 'password3', name: 'User 3'},
];

function login(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(
        u => u.email === email && u.password === password,
      );
      if (user) {
        resolve(user);
      } else {
        reject('Invalid email or password');
      }
    }, 1000); // Simulate an async API call
  });
}

export const loginAsync = createAsyncThunk(
  'auth/login',
  async ({email, password}, {dispatch}) => {
    try {
      const user = await login(email, password);
      dispatch(loginSuccess(user));
      // Save the user token to AsyncStorage or other storage mechanisms
    } catch (error) {
      dispatch(loginFailed(error.message));
    }
  },
);
