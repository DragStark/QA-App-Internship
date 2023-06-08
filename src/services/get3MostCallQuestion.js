const get3MostCallQuestion = questionList => {
  // create array for return top 3 most call questions by category
  let top3 = [];
  // clone of answers
  let questions = questionList;
  // each time of the loop, get once of most call question. then put it in the top3, loop 3 times
  for (let i = 0; i < 3; i++) {
    let max = questions[0];
    questions.forEach(answer => {
      if (max.castTimes <= answer.castTimes) {
        max = answer;
      }
    });
    top3.push(max);
    questions = questions.filter(answer => answer.id !== max.id);
  }
  return top3;
};
export default get3MostCallQuestion;
