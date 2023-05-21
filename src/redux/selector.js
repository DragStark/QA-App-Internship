const userSelector = state => state.user;
const authenticated = state => state.auth;
const messagesCollector = state => state.messages;


export {userSelector, authenticated, messagesCollector};
