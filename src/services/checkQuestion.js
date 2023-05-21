const questionWords = ['tại sao', 'thế nào'];

const checkQuestion = question => {
  if (question.includes('?')) return question;
  else return false;
};

export default checkQuestion;
