import { pushToBucket } from "../utils/cloudStorage";

// this function actually handles "inputTextArea.jsx", not "inputTextField.jsx"!
const handleTextFieldChange = (e, config) => {
  let FeedbackFormAnswers = JSON.parse(
    localStorage.getItem("FeedbackFormAnswers")
  );
  if (!FeedbackFormAnswers) {
    FeedbackFormAnswers = {};
  }
  const answer = {
    questionType: config.questionType,
    label: config.label,
    answer: e.currentTarget.value,
  };
  FeedbackFormAnswers[config.id] = answer;

  localStorage.setItem(
    "FeedbackFormAnswers",
    JSON.stringify(FeedbackFormAnswers)
  );
  pushToBucket();
};
export { handleTextFieldChange };
