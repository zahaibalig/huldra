/**
 * generate the props for the left and right buttons, e.g. the label, onClick function, class name, etc.
 * @param {object} history - The history object from react-router-dom
 * @param {function} getParticipantId - The function that gets the participant id
 * @param {function} handlePrevious - The function that handles the previous button click event
 * @param {function} handleNext - The function that handles the next button click event
 * @param {function} handleEndSurvey - The function that handles the end survey button click event
 * @param {boolean} disableNextButton - True if the next button should be disabled, false otherwise
 * @param {object} REACT_APP_general - The general configuration object
 * @returns {object} An object containing the props for the left and right buttons
 */
const getButtonProps = (
  history,
  getParticipantId,
  handlePrevious,
  handleNext,
  handleEndSurvey,
  disableNextButton,
  REACT_APP_general
) => {
  const leftButtonLabel = "Previous";
  let rightButtonLabel;
  let onLeftButtonClick;
  let onRightButtonClick;
  let leftButtonClassName;
  let rightButtonClassName;
  let disableLeftButton;
  let disableRightButton;

  if (history.location.pathname === "/survey/home") {
    leftButtonClassName = "hidden-button";
    rightButtonClassName = "hidden-button";
  } else if (history.location.pathname === "/survey/registration") {
    rightButtonLabel = "Start Survey";

    onRightButtonClick = () => getParticipantId();
    leftButtonClassName = "hidden-button";
    rightButtonClassName = "btn control";
  } else if (
    history.location.pathname === "/survey/background" ||
    history.location.pathname === "/survey/demonstration"
  ) {
    rightButtonLabel = "Next";
    onLeftButtonClick = () => handlePrevious();
    onRightButtonClick = () => handleNext();
    leftButtonClassName = "btn control";
    rightButtonClassName = "btn control";
  } else if (history.location.pathname.includes("/survey/case")) {
    rightButtonLabel = "Next";
    onLeftButtonClick = () => handlePrevious();
    onRightButtonClick = () => handleNext();
    leftButtonClassName = "btn control";
    rightButtonClassName = "btn control";
    disableRightButton = disableNextButton;
  } else if (history.location.pathname === "/survey/summary-and-feedback") {
    rightButtonLabel = "End Survey";
    onLeftButtonClick = () => handlePrevious();
    onRightButtonClick = () => handleEndSurvey();
    leftButtonClassName = "btn control";
    rightButtonClassName = "btn control";
  } else if (history.location.pathname === "/survey/end") {
    leftButtonClassName = "hidden-button";
    rightButtonClassName = "hidden-button";
  }

  // use configuration parameter to allow/disallow revisiting previous answers
  const allowRevisitingAnswers = REACT_APP_general["allowRevisitingAnswers"];
  // only works on case pages and the summary-and-feedback page
  if (
    history.location.pathname.startsWith("/survey/case") ||
    history.location.pathname === "/survey/summary-and-feedback"
  ) {
    if (allowRevisitingAnswers === false) {
      leftButtonClassName = "hidden-button";
    }
  }

  return {
    leftButtonLabel,
    rightButtonLabel,
    onLeftButtonClick,
    onRightButtonClick,
    leftButtonClassName,
    rightButtonClassName,
    disableLeftButton,
    disableRightButton,
  };
};

export { getButtonProps };
