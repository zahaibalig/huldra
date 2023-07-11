import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/appContext";
import { toastError } from "../utils/toast";
import { logSessionEvent, pushToLocalStorage } from "../utils/localStorage";
import GenericButton from "../minor-components/genericButton";
import "../assets/css/home.css";
import { conditionalPushToBucket, fetchResponse } from "../utils/handleResponse";
import getConfig from "../utils/handleStorageConfig";

const Home = ({ history, REACT_APP_home, setRouteIsAllowed }) => {
  const { REACT_APP_general } = useContext(AppContext);
  const [participantId, setParticipantId] = useState("");

  useEffect(() => {
    if (localStorage.getItem("ParticipantInfo")) {
      const data = JSON.parse(localStorage.getItem("ParticipantInfo"));
      setParticipantId(data.ParticipantId);
    }
  }, []);

  const handleRedirectToRegistration = () => {
    history.push("/survey/registration");
  };

  const handleLogin = async () => {
    const response = await fetchResponse(participantId);
    if (!response) {
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

      logSessionEvent("Start survey", "Login page", 1);
      conditionalPushToBucket();
      history.push("/survey/background");
    }
  };

  return (
    <div className="home-welcome">
      <div className="home-header">
        <h2>
          {(REACT_APP_home && REACT_APP_home["title"]) ||
            (REACT_APP_general && REACT_APP_general["appName"])}
        </h2>
        <div className="home-intro">{REACT_APP_home && REACT_APP_home["introText"]}</div>
      </div>
      <div className="home-registration-wrapper">
        <div className="home-login">
          <div className="home-participant-id-field">
            <input
              autoComplete="off"
              onChange={(e) => {
                setParticipantId(e.currentTarget.value);
              }}
              type="text"
              name="login"
              id="login"
              defaultValue={participantId}
              placeholder="Participant ID"
            />
          </div>
          <GenericButton
            onClick={handleLogin}
            hasIcon={true}
            className={"btn"}
            id="start-survey-button"
            iconClassName={"fa fa-play mr-2"}
            label="Start survey"
          />
        </div>
        <div className="home-signup">
          <p className="home-signup-message">{REACT_APP_home && REACT_APP_home["signupText"]}</p>
          <GenericButton
            onClick={handleRedirectToRegistration}
            hasIcon={true}
            className="btn"
            id="home-get-participant-id"
            iconClassName="fa fa-user-plus  mr-2"
            label="Get participant ID"
          />
          <span className="home-additional-text">
            {REACT_APP_home && REACT_APP_home["additionalText"]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
