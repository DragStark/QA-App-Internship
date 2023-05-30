const generateAnswer = (category, question, answersList) => {
  console.log(question);
  let answers = answersList.filter(answer => answer.category === category);
  let returnAnswer = answers.find(
    answer => answer.belongToQuestion === question,
  );
  return returnAnswer
    ? returnAnswer.content
    : 'Xin lỗi, tôi không thể trả lời câu hỏi này!';
};
export default generateAnswer;
