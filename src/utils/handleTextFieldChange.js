// this function actually handles "inputTextArea.jsx", not "inputTextField.jsx"!
const handleTextFieldChange = (e, config) => {
  let FeedbackFormAnswers = JSON.parse(
    localStorage.getItem("FeedbackFormAnswers")
  ) || {};

  // if the user writes something and then deletes it, we remove it from the localStorage too
  if (e.currentTarget.value === "") {
    delete FeedbackFormAnswers[config.id];
  } else {
    // The questionType could be "text" or "mc". For mc, the TextArea is the comment to the mc Question. When the user edit comment, we need to preverse the answer to the mc question.
    let answer = FeedbackFormAnswers[config.id] || {};
    answer = {
      ...answer,
      questionType: config.questionType,
      label: config.label,
      text: e.currentTarget.value
    };
    FeedbackFormAnswers[config.id] = answer;
  }

  localStorage.setItem(
    "FeedbackFormAnswers",
    JSON.stringify(FeedbackFormAnswers)
  );
};
export { handleTextFieldChange };
