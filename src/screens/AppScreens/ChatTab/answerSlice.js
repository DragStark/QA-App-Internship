import {createSlice} from '@reduxjs/toolkit';
import {CATEGORIES} from '../../../constants';

const initialState = [
  {
    id: 1,
    belongToQuestion: 'Hôm nay tôi nên mặc gì?',
    content:
      'Còn tùy thuộc vào gu thời trang của bạn nhưng tôi có một vài lựa chọn cho bạn đây',
    category: CATEGORIES.DAILY_LIFE,
    castTimes: 3,
  },
  {
    id: 2,
    belongToQuestion:
      'Tôi bị quên chìa khóa ở trong cốp xe bây giờ phải làm sao ?',
    content: 'Hãy tìm thử lại trong túi quần hoặc cặp sách của bạn, nhớ lại xem bạn đã đi những đâu, nếu ở nhà có người thân hãy gọi cho họ.',
    category: CATEGORIES.DAILY_LIFE,
    castTimes: 5,
  },
  {
    id: 3,
    belongToQuestion: 'Hôm nay trời mưa, chúng tôi muốn đi picnic thì cần chuẩn bị gì?',
    content: 'Ôi thật là một buổi picnic ngắm mưa thơ mộng, đầu tiên hãy chuẩn bị một chiếc ô thật lớn, một bộ đồ cắm trại và bếp nướng không khói hoặc bếp gas, hãy mua những đồ ăn chín hoặc không phải chế biến cầu kì. Chuẩn bị một tách trà nóng để ngắm mưa là một ý tưởng không tồi.',
    category: CATEGORIES.DAILY_LIFE,
    castTimes: 4,
  },
  {
    id: 4,
    belongToQuestion: 'How are you ?',
    content: 'I am fine, thanks',
    category: CATEGORIES.DAILY_LIFE,
    castTimes: 2,
  },
  {
    id: 5,
    belongToQuestion: 'Tôi muốn nấu một bữa ăn 20k cho 2 người ăn, phải làm sao?',
    content: 'với 20k thực đơn bao gồm, đậu phụ sốt cà chua, rau luộc, đậu phụ 10k, cà chua và hành lá 5k, rau 5k, một bữa ăn thoải mái cho hai người.',
    category: CATEGORIES.COOK,
    castTimes: 2,
  },
];

const answersSlice = createSlice({
  name: 'answers',
  initialState,
  reducers: {
    castTimesIncrease(state, actions) {
      state.map(answer => {
        if (answer.id === actions.payload) {
          answer.castTimes++;
        }
      });
    },
  },
});

export const {castTimesIncrease} = answersSlice.actions;

export default answersSlice;
