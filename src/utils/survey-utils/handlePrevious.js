import { logSessionEvent } from "../localStorage";
import { conditionalPushToBucket } from "../handleResponse";

const handlePreviousButton = ({
  history,
  getCurrentPageIndex,
  setPageLocator,
  casesCount,
  currentDemonstrationPageIndex,
  setCurrentDemonstrationPageIndex,
  setDemonstrationPageIndex,
  REACT_APP_demonstration,
  setOpenDialog,
  CaseId,
}) => {
  getCurrentPageIndex();
  if (history.location.pathname === "/survey/summary-and-feedback") {
    logSessionEvent("Previous", `Summary and feedback`, CaseId);
    conditionalPushToBucket();
    history.push(`/survey/case${casesCount}`);
  } else if (history.location.pathname === "/survey/demonstration") {
    logSessionEvent("Previous", `Demonstration${currentDemonstrationPageIndex}`, CaseId);
    conditionalPushToBucket();
    switch (currentDemonstrationPageIndex) {
      case 1:
        setCurrentDemonstrationPageIndex(currentDemonstrationPageIndex - 1);
        history.push(`/survey/background`);
        break;
      case 2:
        setCurrentDemonstrationPageIndex(currentDemonstrationPageIndex - 1);
        setDemonstrationPageIndex(0);
        history.push(`/survey/demonstration`);
        break;
      case 3:
        setCurrentDemonstrationPageIndex(currentDemonstrationPageIndex - 1);
        setDemonstrationPageIndex(1);
        history.push(`/survey/demonstration`);
        break;
      default:
        setCurrentDemonstrationPageIndex(3);
        setDemonstrationPageIndex(2);
        history.push(`/survey/demonstration`);
        break;
    }
  } else if (history.location.pathname === "/survey/background") {
    setOpenDialog(true);
  } else if (history.location.pathname === "/survey/registration") {
    history.push(`/`);
  } else if (CaseId === 1) {
    logSessionEvent("Previous", `Case1`, CaseId);
    conditionalPushToBucket();
    setCurrentDemonstrationPageIndex(Math.min(REACT_APP_demonstration.length, 3));
    switch (REACT_APP_demonstration.length) {
      case 0:
        history.push(`/survey/background`);
        break;

      case 1:
        setDemonstrationPageIndex(0);

        history.push(`/survey/demonstration`);
        break;
      case 2:
        setDemonstrationPageIndex(1);
        history.push(`/survey/demonstration`);
        break;
      case 3:
        setDemonstrationPageIndex(2);
        history.push(`/survey/demonstration`);
        break;
      default:
        setDemonstrationPageIndex(2);
        history.push(`/survey/demonstration`);
        break;
    }
  } else {
    logSessionEvent("Previous", `Case${CaseId}`, CaseId);
    conditionalPushToBucket();
    const newPageNumber = CaseId - 1;
    setPageLocator(newPageNumber);
    history.push(`/survey/case${newPageNumber}`);
  }
};

export { handlePreviousButton };
