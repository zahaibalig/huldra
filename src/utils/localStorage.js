import { generateTimeStamp } from "./timestamp";

const pushToLocalStorage = (content) => {
  content.forEach((item) => {
    for (const [key, value] of Object.entries(item)) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  });
};

const logSessionEvent = (ButtonType, Location) => {
  let SessionEvents = JSON.parse(localStorage.getItem("SessionEvents"));

  const Timestamp = generateTimeStamp();
  const tail = {
    Location,
    ButtonType,
    Timestamp,
  };
  SessionEvents = SessionEvents !== null ? [...SessionEvents, tail] : new Array(tail);
  localStorage.setItem("SessionEvents", JSON.stringify(SessionEvents));
};

const logSessionInfo = (SessionComplete, LastVisitedPage) => {
  let SessionInfo = JSON.parse(localStorage.getItem("SessionInfo")) || {};

  SessionInfo.SessionComplete = SessionComplete;
  SessionInfo.LastVisitedPage = LastVisitedPage;

  localStorage.setItem("SessionInfo", JSON.stringify(SessionInfo));
};

export { pushToLocalStorage, logSessionEvent, logSessionInfo };
