import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../screens/auth/login/authSlice';
import userSlice from '../screens/auth/register/userSlice';
import messagesSlice from '../screens/AppScreens/ChatTab/messagesSlice';
import roomSlice from '../screens/AppScreens/HomeTab/roomSlice';
import answersSlice from '../screens/AppScreens/ChatTab/answerSlice';

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        user: userSlice.reducer,
        messages: messagesSlice.reducer,
        answers: answersSlice.reducer,
        rooms: roomSlice.reducer,
    },
});

export default store;
