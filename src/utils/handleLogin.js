import { logSessionEvent, pushToLocalStorage } from "../utils/localStorage";
import { conditionalPushToBucket, fetchResponse, fetchUUIDs } from "../utils/handleResponse";
import getConfig, { conditionalInitializeFirebase } from "../utils/handleStorageConfig";
import { toastError } from "../utils/toast";
import { fetchConfigVariablesBatch } from "./handleConfigVars";
import { handleSessionInfo } from "./survey-utils/getParticipantId";
import preApprovedUserIDs from "../config-pre-approvedIDList.json";
import { v4 as uuidv4 } from "uuid";

const handleLogin = async (participantId, history, setRouteIsAllowed, Version) => {
  const { REACT_APP_home } = fetchConfigVariablesBatch(["REACT_APP_home"]);
  let validUUID = false;
  if (participantId === "") {
    toastError("Please enter a valid participant ID", "top-center", "error");
    return;
  }

  // Check for Alternative 2: non-anonymous
  if (REACT_APP_home?.loginOption === "non-anonymous") {
    let userIDs = [];
    // CHECK THE LOCAL PRE-APPROVED ID LIST
    if (preApprovedUserIDs && preApprovedUserIDs.preApprovedUserIDs) {
      validUUID = preApprovedUserIDs.preApprovedUserIDs.includes(participantId);
    }
    // FETCH THE UUIDS FROM FIREBASE
    else {
      userIDs = await fetchUUIDs("preApprovedIDList");
      validUUID = userIDs.preApprovedUserIDs.includes(participantId);
    }

    if (!validUUID) {
      toastError("Please enter a valid participant ID", "top-center", "error");
      return;
    }
  }

  //Check for Alternative 3: anonymousWithouID
  if (REACT_APP_home?.loginOption === "anonymousWithoutID") {
    const uuid = uuidv4();
    // Handle anonymous login without ID
    const ParticipantInfo = {
      ParticipantId: uuid,
    };

    handleSessionInfo("Home", "Start Survey", ParticipantInfo, history, Version, setRouteIsAllowed);
    return;
  }

  conditionalInitializeFirebase();

  const response = await fetchResponse(participantId);

  if (validUUID && !response) {
    //First time submission
    const ParticipantInfo = {
      ParticipantId: participantId,
    };

    handleSessionInfo("Home", "Start Survey", ParticipantInfo, history, Version, setRouteIsAllowed);
    return;
  } else if (!response) {
    toastError(`The participant ID you entered is invalid.`, "top-center", "error");
    return;
  } else if (response.SessionInfo.SessionComplete) {
    toastError(`The participant ID you entered has completed the survey.`, "top-center", "error");
  } else {
    setRouteIsAllowed(true);

    // if fetching from firebase, update local storage with the response from firebase
    if (getConfig().responsesStorageType === "firebase") {
      pushToLocalStorage(new Array(response));
    }

    logSessionEvent("Start survey", "Login page");
    conditionalPushToBucket();

    // go to the last page the participant was on
    const LastVisitedPage = response.SessionInfo.LastVisitedPage;
    history.push(`/survey/${LastVisitedPage}`);
  }
};

export { handleLogin };
