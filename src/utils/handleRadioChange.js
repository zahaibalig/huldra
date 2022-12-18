import { pushToBucket } from "../utils/cloudStorage";

/* TODO: MAKE INTO A GENERIC FUNCTION WHICH CAN BE USED BY ANY COMPONENT */
const handleRadioChange = (e, field1, field2, id, index) => {
  let FeedbackFormAnswers = JSON.parse(
    localStorage.getItem("FeedbackFormAnswers")
  );
  if (!FeedbackFormAnswers) {
    FeedbackFormAnswers = {};
  }
  const answer = {
    option_index: index,
    [field1]: e.target.id,
    [field2]: e.currentTarget.innerText,
  };
  FeedbackFormAnswers[id] = answer;

  localStorage.setItem(
    "FeedbackFormAnswers",
    JSON.stringify(FeedbackFormAnswers)
  );
  pushToBucket();
};
export { handleRadioChange };
