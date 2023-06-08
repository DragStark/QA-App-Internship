import {createSlice} from '@reduxjs/toolkit';
import {updateCastTimesById} from '../../../storage/answer';

const initialState = [];

const answersSlice = createSlice({
  name: 'answers',
  initialState,
  reducers: {
    addAnswer(state, actions) {
      state.push(actions.payload);
    },
    castTimesIncrease(state, actions) {
      state.map(answer => {
        if (answer.id === actions.payload) {
          answer.castTimes++;
          updateCastTimesById(actions.payload);
        }
      });
    },
  },
});

export const {castTimesIncrease, addAnswer} = answersSlice.actions;

export default answersSlice;
