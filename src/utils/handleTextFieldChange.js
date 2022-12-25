// this function actually handles "inputTextArea.jsx", not "inputTextField.jsx"!
const handleTextFieldChange = (e, config) => {
  let FeedbackFormAnswers = JSON.parse(
    localStorage.getItem("FeedbackFormAnswers")
  );
  // if the user writes something and then deletes it, we remove it from the localStorage too
  if (e.currentTarget.value === "") {
    delete FeedbackFormAnswers[config.id];
  } else {
    if (!FeedbackFormAnswers) {
      FeedbackFormAnswers = {};
    }
    const answer = {
      questionType: config.questionType,
      label: config.label,
      answer: e.currentTarget.value,
    };
    FeedbackFormAnswers[config.id] = answer;
  }

  localStorage.setItem(
    "FeedbackFormAnswers",
    JSON.stringify(FeedbackFormAnswers)
  );
};
export { handleTextFieldChange };
