const userCollector = state => state.user;
const userSelector = state => state.auth.user;
const roomsCollector = state => state.rooms;
const answersCollector = state => state.answers;

const roomMessagesCollector = state => state.messages;

export {
  userCollector,
  userSelector,
  roomMessagesCollector,
  roomsCollector,
  answersCollector,
};
