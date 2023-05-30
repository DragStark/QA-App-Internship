import {createSlice} from '@reduxjs/toolkit';
import {CATEGORIES} from '../../../constants';

const initialState = [
  {
    id: 1,
    belongToQuestion: 'How are you ?',
    content: 'I am fine, thanks',
    category: CATEGORIES.DAILY_LIFE,
  },
];

const answersSlice = createSlice({
  name: 'answers',
  initialState,
  reducers: {},
});

export default answersSlice;
