import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../screens/auth/login/authSlice';
import userSlice from '../screens/auth/register/userSlice';
import messagesSlice from '../screens/AppScreens/ChatTab/messagesSlice';

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        user: userSlice.reducer,
        messages: messagesSlice.reducer,
    },
});

export default store;
