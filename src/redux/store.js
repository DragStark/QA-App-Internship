import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../screens/auth/authSlice';
import userSlice from '../screens/auth/userSlice';

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        user: userSlice.reducer,
    },
});

export default store;
