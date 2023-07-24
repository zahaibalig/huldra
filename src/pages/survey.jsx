import React, { useEffect, useState, useContext } from "react";
import SummaryAndFeedback from "./summaryAndFeedback";
import Home from "./home";
import Registration from "./registration";
import Background from "./background";
import Demonstration from "./demonstration";
import CaseImage from "./caseImage";
import CaseVideo from "./caseVideo";
import CaseHybrid from "./caseHybrid";
import CaseAudio from "./caseAudio";
import CaseText from "./caseText";
import End from "./end";
import Footer from "../minor-components/footer";
import { Route, Switch } from "react-router-dom";
import { AppContext } from "../context/appContext";
import { useBeforeunload } from "react-beforeunload";
import { ToastContainer } from "react-toastify";
import { toastError, toastInfo } from "../utils/toast";
import { validateFeedbackForm } from "../utils/inputValidation";
import version from "../VERSION.md";
import useHotkeys from "@reecelucas/react-use-hotkeys";
import { copyToClipboard } from "../utils/text";
import ProtectedRoute from "../minor-components/protectedRoute";
import Header from "../minor-components/header";
import { logSessionEvent } from "../utils/localStorage";
import Modal from "@mui/material/Modal";
import ConfirmationDialog from "../minor-components/confirmationDialog";
import { handleFinalResponse } from "../utils/handleResponse";
import { updateDegree } from "../utils/survey-utils/registration-utils";
import { handleGetParticipantId } from "../utils/survey-utils/getParticipantId";
import { getButtonProps } from "../utils/survey-utils/getButtonProps";
import { handlePreviousButton } from "../utils/survey-utils/handlePrevious";
import { handleNextButton } from "../utils/survey-utils/handleNext";

const Survey = ({
  history,
  REACT_APP_home,
  REACT_APP_registration,
  REACT_APP_background,
  REACT_APP_demonstration,
  REACT_APP_caseImage,
  REACT_APP_caseVideo,
  REACT_APP_caseAudio,
  REACT_APP_caseHybrid,
  REACT_APP_caseText,
  REACT_APP_summaryAndFeedback,
  REACT_APP_end,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openEndDialog, setOpenEndDialog] = useState(false);
  const [Version, setVersion] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [comments, setComments] = useState("");
  const [degree, setDegree] = useState([]);
  const [fieldOfExpertise, setFieldOfExpertise] = useState([]);
  const [degreeOther, setDegreeOther] = useState("");
  const [activeYears, setActiveYears] = useState("");
  const [disableRegistration] = useState(false);
  const [termsOfUse, setTermsOfUse] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [routeIsAllowed, setRouteIsAllowed] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [demonstrationPageIndex, setDemonstrationPageIndex] = useState(0);
  useState(0);

  const {
    PageLocator,
    disableNextButton,
    setDisableNextButton,
    getCurrentPageIndex,
    setPageLocator,
    casesCount,
    setCasesCount,
    REACT_APP_general,
    getCasesCount,
    currentDemonstrationPageIndex,
    setCurrentDemonstrationPageIndex,
  } = useContext(AppContext);
  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  const handleEndDialogClose = () => {
    setOpenEndDialog(false);
  };

  useEffect(() => {
    setSubscribed(true);
    setRouteIsAllowed(localStorage.getItem("ParticipantInfo") ? true : false);
    setCasesCount(getCasesCount);
    subscribed === true &&
      fetch(version)
        .then((res) => res.text())
        .then((text) => setVersion(text.replace(/\s+/g, "")));
    return () => setSubscribed(false);
  }, [setCasesCount, getCasesCount, subscribed]);

  // use configuration parameter to allow/disallow proceeding to the next page without answering
  useEffect(() => {
    // only works on case pages
    if (history.location.pathname.startsWith("/survey/case")) {
      const allowProceedingWithoutAnswering = REACT_APP_general["allowProceedingWithoutAnswering"];
      if (allowProceedingWithoutAnswering) {
        setDisableNextButton(false);
      }
    }
  }, [disableNextButton, history.location.pathname, REACT_APP_general, setDisableNextButton]);

  useHotkeys("Shift+f", () => {
    if (history.location.pathname === "/survey/registration") {
      setName("NA (Development)");
      setEmail("huldra@simula.no");
      setCountry("NA (Development)");
      setDegree("NA (Development)");
      setFieldOfExpertise("NA (Development)");
      setActiveYears(999);
      setComments("Form filled out as part of development.");
      setTermsOfUse(true);
      toastInfo("Form filled out as part of development.", "top-center", "req-error");
    }
    if (history.location.pathname === "/survey/summary-and-feedback") {
      setOpenEndDialog(true);
      localStorage.setItem("FeedbackFormAnswers", JSON.stringify("NA (Development)"));
    }
  });

  const onActiveYearsChange = (e) => {
    setActiveYears(e.currentTarget.value);
  };
  const onFieldOfExpertiseChange = (e) => {
    setFieldOfExpertise(e.currentTarget.value);
  };
  const handleDegreeChange = (option, state) => {
    setDegree(updateDegree(option, state, degree));
  };

  const handleOtherDegreeChange = (value) => {
    setDegreeOther(value);
  };

  const onNameChange = (e) => {
    setName(e.currentTarget.value);
  };
  const onEmailChange = (e) => {
    setEmail(e.currentTarget.value);
  };
  const onCountryChange = (e) => {
    setCountry(e.currentTarget.value);
  };
  const onCommentsChange = (e) => {
    setComments(e.currentTarget.value);
  };

  let pageIsRegistration = history.location.pathname === "/survey/registration";
  let pageIsEndPage = history.location.pathname === "/survey/end";
  let pageIsHome = history.location.pathname === "/survey/home";

  /* let showControls = history.location.pathname !== "/survey/end";
  let pageIsFeedBack =
    history.location.pathname === "/survey/summary-and-feedback";
  let pageIsBackground = history.location.pathname === "/survey/background";
  let pageIsDemonstration =
    history.location.pathname === "/survey/demonstration"; */
  useBeforeunload(() => "You'll lose your data!");

  const submitSurvey = () => {
    setOpenEndDialog(false);

    logSessionEvent("End survey", "Summary and feedback", PageLocator);

    const SessionInfo = {
      PageLocator: PageLocator,
      SessionComplete: true,
    };
    localStorage.setItem("SessionInfo", JSON.stringify(SessionInfo));

    handleFinalResponse();

    history.replace("/survey/end");
  };

  const handleEndSurvey = () => {
    const FeedbackFormAnswers = JSON.parse(localStorage.getItem("FeedbackFormAnswers")) || {};
    if (REACT_APP_summaryAndFeedback["feedbackForm"].display === false) {
      setOpenEndDialog(true);
    } else {
      let hasError = validateFeedbackForm(
        REACT_APP_summaryAndFeedback["feedbackForm"].feedbackFormQuestions,
        FeedbackFormAnswers
      ).hasError;
      if (hasError) {
        toastError("Please verify mandatory fields.", "top-center", "req-error");
      } else {
        setOpenEndDialog(true);
      }
    }
  };

  useHotkeys("Enter", () => {
    if (disableNextButton === true) {
      return;
    } else {
      handleNext();
    }
  });
  useHotkeys("Shift+Enter", () => {
    if (history.location.pathname.includes("/survey/case")) {
      setDisableNextButton(false);
      handleNext();
      setDisableNextButton(true);
    }
  });

  const handleNext = () => {
    handleNextButton(
      history,
      getCurrentPageIndex,
      PageLocator,
      setPageLocator,
      casesCount,
      currentDemonstrationPageIndex,
      setCurrentDemonstrationPageIndex,
      setDemonstrationPageIndex,
      REACT_APP_demonstration
    );
  };

  const handlePrevious = () => {
    handlePreviousButton(
      history,
      getCurrentPageIndex,
      PageLocator,
      setPageLocator,
      casesCount,
      currentDemonstrationPageIndex,
      setCurrentDemonstrationPageIndex,
      setDemonstrationPageIndex,
      setOpenDialog,
      REACT_APP_demonstration
    );
  };

  const getParticipantId = async (e) => {
    const formInfo = {
      name,
      country,
      degree,
      degreeOther,
      fieldOfExpertise,
      termsOfUse,
      notifications,
      email,
      comments,
      activeYears,
    };

    await handleGetParticipantId(e, formInfo, history, Version);
  };

  const footerButtonProps = getButtonProps(
    history,
    getParticipantId,
    handlePrevious,
    handleNext,
    handleEndSurvey,
    disableNextButton,
    REACT_APP_general
  );

  return (
    <div
      className={
        history.location.pathname === "/survey/registration"
          ? "full-scroll-survey-wrapper-no-padding"
          : "full-scroll-survey-wrapper"
      }
    >
      <Modal
        className="modal"
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <ConfirmationDialog
          dialogQuestion={"Are you sure you want to go back?"}
          cancelText={"Cancel"}
          confirmText={"Yes"}
          onCancel={() => setOpenDialog(false)}
          onConfirm={() => {
            history.replace("/");
          }}
          onClick={() => {
            setOpenDialog(false);
          }}
        />
      </Modal>
      <Modal
        className="modal"
        open={openEndDialog}
        onClose={handleEndDialogClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <ConfirmationDialog
          dialogQuestion={"Do you want to submit your answers?"}
          cancelText={"Cancel"}
          confirmText={"Submit"}
          onCancel={() => setOpenEndDialog(false)}
          onConfirm={() => submitSurvey()}
          onClick={() => {
            setOpenEndDialog(false);
          }}
        />
      </Modal>
      {localStorage.length > 0 && !pageIsRegistration && !pageIsEndPage && !pageIsHome ? (
        <Header
          leftLabel={`Participant ID: ${
            JSON.parse(localStorage.getItem("ParticipantInfo"))["ParticipantId"]
          }`}
          leftIcon1TooltipMessage="This is your participant ID. You can copy this ID to keep for later reference, as well as to be able to resume your survey in case of accidental exit before completion."
          leftIcon2TooltipMessage=" Copy to clipboard"
          leftIcon1ClassName="fa fa-info-circle form-tooltip"
          leftIcon2ClassName="fa fa-clone ml-3 form-tooltip"
          leftIcon1OnClick={() => {
            return;
          }}
          leftIcon2OnClick={() =>
            copyToClipboard(JSON.parse(localStorage.getItem("ParticipantInfo"))["ParticipantId"])
          }
          rightLabel={
            history.location.pathname !== "/survey/end" && (
              <div className="survey-header">
                {history.location.pathname === "/survey/background" ? (
                  <span>{`${REACT_APP_general && REACT_APP_general["appName"]} |
                   ${
                     REACT_APP_general &&
                     REACT_APP_general["header"] &&
                     REACT_APP_general["header"]["labelBackground"]
                   }
                  `}</span>
                ) : history.location.pathname === "/survey/demonstration" ? (
                  <span>{`${REACT_APP_general && REACT_APP_general["appName"]} |
                  ${
                    REACT_APP_general &&
                    REACT_APP_general["header"] &&
                    REACT_APP_general["header"]["labelDemonstration"]
                  }`}</span>
                ) : history.location.pathname === "/survey/summary-and-feedback" ? (
                  <span>{`${REACT_APP_general && REACT_APP_general["appName"]} |
                  ${
                    REACT_APP_general &&
                    REACT_APP_general["header"] &&
                    REACT_APP_general["header"]["labelSummaryAndFeedback"]
                  }`}</span>
                ) : history.location.pathname.includes("case") ? (
                  <span>{`${REACT_APP_general && REACT_APP_general["appName"]} |
                  ${
                    REACT_APP_general &&
                    REACT_APP_general["header"] &&
                    REACT_APP_general["header"]["labelCase"]
                  } | Case ${PageLocator}/${casesCount}`}</span>
                ) : (
                  <span></span>
                )}
              </div>
            )
          }
        />
      ) : (
        ""
      )}
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
      <ToastContainer />
      <Switch>
        <ProtectedRoute
          routeIsAllowed={routeIsAllowed}
          path="/survey/summary-and-feedback"
          exact
          render={(props) => (
            <SummaryAndFeedback
              {...props}
              REACT_APP_summaryAndFeedback={REACT_APP_summaryAndFeedback}
            />
          )}
        />
        <ProtectedRoute
          routeIsAllowed={routeIsAllowed}
          path="/survey/end"
          exact
          render={(props) => <End {...props} REACT_APP_end={REACT_APP_end} />}
        />

        <ProtectedRoute
          routeIsAllowed={routeIsAllowed}
          path="/survey/background"
          exact
          render={(props) => (
            <Background
              {...props}
              totalPages={casesCount}
              REACT_APP_background={REACT_APP_background}
            />
          )}
        />
        <ProtectedRoute
          routeIsAllowed={routeIsAllowed}
          path="/survey/demonstration"
          exact
          render={(props) => (
            <Demonstration
              {...props}
              REACT_APP_demonstration={REACT_APP_demonstration[demonstrationPageIndex]}
            />
          )}
        />
        <Route
          path="/survey/registration"
          exact
          render={(props) => (
            <Registration
              {...props}
              onCountryChange={onCountryChange}
              onCommentsChange={onCommentsChange}
              handleDegreeChange={handleDegreeChange}
              handleOtherDegreeChange={handleOtherDegreeChange}
              degreeOther={degreeOther}
              onFieldOfExpertiseChange={onFieldOfExpertiseChange}
              onActiveYearsChange={onActiveYearsChange}
              setTermsOfUse={setTermsOfUse}
              setNotifications={setNotifications}
              disableRegistration={disableRegistration}
              getParticipantId={getParticipantId}
              onNameChange={onNameChange}
              onEmailChange={onEmailChange}
              REACT_APP_registration={REACT_APP_registration}
            />
          )}
        />
        <ProtectedRoute
          routeIsAllowed={routeIsAllowed}
          path={`/survey/case:id`}
          exact
          render={(props) => {
            let prefix = JSON.parse(localStorage.getItem("CaseOrder"))
              [PageLocator - 1].split("-")[0]
              .toLowerCase();
            return prefix === "text" ? (
              <CaseText
                {...props}
                totalCases={casesCount}
                caseId={PageLocator}
                REACT_APP_caseText={REACT_APP_caseText}
              />
            ) : prefix === "audio" ? (
              <CaseAudio
                {...props}
                totalCases={casesCount}
                caseId={PageLocator}
                REACT_APP_caseAudio={REACT_APP_caseAudio}
              />
            ) : prefix === "hybrid" ? (
              <CaseHybrid
                {...props}
                totalCases={casesCount}
                caseId={PageLocator}
                REACT_APP_caseHybrid={REACT_APP_caseHybrid}
              />
            ) : prefix === "video" ? (
              <CaseVideo
                {...props}
                totalCases={casesCount}
                caseId={PageLocator}
                REACT_APP_caseVideo={REACT_APP_caseVideo}
              />
            ) : (
              <CaseImage
                {...props}
                totalCases={casesCount}
                caseId={PageLocator}
                REACT_APP_caseImage={REACT_APP_caseImage}
                REACT_APP_demonstration={REACT_APP_demonstration[demonstrationPageIndex]}
              />
            );
          }}
        />
        <Route
          path="/survey/home"
          render={(props) => (
            /*      <CaseHybrid
              {...props}
              REACT_APP_case={REACT_APP_case}
              REACT_APP_home={REACT_APP_home}
              setRouteIsAllowed={setRouteIsAllowed}
            /> */
            <Home
              {...props}
              REACT_APP_home={REACT_APP_home}
              setRouteIsAllowed={setRouteIsAllowed}
            />
          )}
        />
      </Switch>

      <Footer
        label={
          REACT_APP_general && REACT_APP_general["footer"] && REACT_APP_general["footer"]["label"]
        }
        icon1ClassName={
          REACT_APP_general &&
          REACT_APP_general["footer"] &&
          REACT_APP_general["footer"]["icon1ClassName"]
        }
        icon2ClassName={
          REACT_APP_general &&
          REACT_APP_general["footer"] &&
          REACT_APP_general["footer"]["icon2ClassName"]
        }
        footerIconUrl={
          REACT_APP_general &&
          REACT_APP_general["footer"] &&
          REACT_APP_general["footer"]["footerIconUrl"]
        }
        icon1Url={
          REACT_APP_general &&
          REACT_APP_general["footer"] &&
          REACT_APP_general["footer"]["icon1Url"]
        }
        icon2Url={
          REACT_APP_general &&
          REACT_APP_general["footer"] &&
          REACT_APP_general["footer"]["icon2Url"]
        }
        {...footerButtonProps}
      />
    </div>
  );
};

export default Survey;
