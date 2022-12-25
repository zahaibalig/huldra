import { pushToBucket } from "../utils/cloudStorage";

/* TODO: MAKE INTO A GENERIC FUNCTION WHICH CAN BE USED BY ANY COMPONENT */
const handleRadioChange = (e, id, index, config) => {
  let FeedbackFormAnswers = JSON.parse(
    localStorage.getItem("FeedbackFormAnswers")
  );
  if (!FeedbackFormAnswers) {
    FeedbackFormAnswers = {};
  }
  const answer = {
    questionType: config.questionType,
    label: config.label,
    optionIndex: index,
    optionText: e.currentTarget.innerText,
  };
  FeedbackFormAnswers[id] = answer;

  localStorage.setItem(
    "FeedbackFormAnswers",
    JSON.stringify(FeedbackFormAnswers)
  );
  pushToBucket();
};
export { handleRadioChange };
