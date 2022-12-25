import { pushToBucket } from "../utils/cloudStorage";

const handleTextFieldChange = (e, config) => {
  const FeedbackFormAnswers = JSON.parse(
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
