import { logSessionEvent } from "../localStorage";
import { conditionalPushToBucket } from "../handleResponse";

const handleNextButton = ({
  history,
  casesCount,
  currentDemonstrationPageIndex,
  setCurrentDemonstrationPageIndex,
  setDemonstrationPageIndex,
  REACT_APP_demonstration,
  CaseId,
}) => {
  // if (history.location.pathname === "/survey/home") {
  //   console.log("handleNextButton: history.location.pathname === /survey/home");
  // } else
  if (history.location.pathname === "/survey/background") {
    logSessionEvent("Next", "Background", 0);
    conditionalPushToBucket();
    if (REACT_APP_demonstration.length === 0) {
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
      history.push(`/survey/case1`);
    } else {
      setDemonstrationPageIndex(currentDemonstrationPageIndex);
      setCurrentDemonstrationPageIndex(currentDemonstrationPageIndex + 1);
      history.push(`/survey/demonstration`);
    }
  } else if (CaseId < casesCount) {
    logSessionEvent("Next", `Case${CaseId}`, CaseId);
    conditionalPushToBucket();
    const newPageNumber = CaseId + 1;
    history.push(`/survey/case${newPageNumber}`);
  } else if (CaseId === casesCount) {
    logSessionEvent("Next", `Case${casesCount}`, CaseId);
    conditionalPushToBucket();
    history.push(`/survey/summary-and-feedback`);
  } else {
    return;
  }
};

export { handleNextButton };
