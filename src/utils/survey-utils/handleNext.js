import { logSessionEvent } from "../localStorage";
import { conditionalPushToBucket } from "../handleResponse";

const handleNextButton = (
  history,
  getCurrentPageIndex,
  PageLocator,
  setPageLocator,
  casesCount,
  currentDemonstrationPageIndex,
  setCurrentDemonstrationPageIndex,
  setDemonstrationPageIndex,
  REACT_APP_demonstration
) => {
  getCurrentPageIndex();

  if (history.location.pathname === "/survey/background") {
    logSessionEvent("Next", "Background", 0);
    conditionalPushToBucket();
    if (REACT_APP_demonstration.length === 0) {
      setPageLocator(1);
      history.push(`/survey/case1`);
    } else {
      setDemonstrationPageIndex(0);
      setCurrentDemonstrationPageIndex(1);
      history.push(`/survey/demonstration`);
    }
  } else if (history.location.pathname === "/survey/demonstration") {
    logSessionEvent("Next", `Demonstration${currentDemonstrationPageIndex}`, 0);
    conditionalPushToBucket();

    if (currentDemonstrationPageIndex >= REACT_APP_demonstration.length) {
      setCurrentDemonstrationPageIndex(REACT_APP_demonstration.length);
      setPageLocator(1);
      history.push(`/survey/case1`);
    } else {
      setDemonstrationPageIndex(currentDemonstrationPageIndex);
      setCurrentDemonstrationPageIndex(currentDemonstrationPageIndex + 1);
      history.push(`/survey/demonstration`);
    }
  } else if (PageLocator < casesCount) {
    logSessionEvent("Next", `Case${PageLocator}`, PageLocator);
    conditionalPushToBucket();
    const newPageNumber = PageLocator + 1;
    setPageLocator(newPageNumber);
    history.push(`/survey/case${newPageNumber}`);
  } else if (PageLocator === casesCount) {
    logSessionEvent("Next", `Case${casesCount}`, PageLocator);
    conditionalPushToBucket();
    history.push(`/survey/summary-and-feedback`);
  } else {
    return;
  }
};

export { handleNextButton };
