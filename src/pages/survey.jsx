import React, { useEffect, useState, useContext } from "react";
import SummaryAndFeedback from "./summaryAndFeedback";
import Home from "./home";
import Registration from "./registration";
import Background from "./background";
import Demonstration from "./demonstration";
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
import ProtectedRoute from "../minor-components/protectedRoute";
import { logSessionEvent } from "../utils/localStorage";
import Modal from "@mui/material/Modal";
import ConfirmationDialog from "../minor-components/confirmationDialog";
import { handleFinalResponse } from "../utils/handleResponse";
import { updateDegree } from "../utils/survey-utils/registration-utils";
import { handleGetParticipantId } from "../utils/survey-utils/getParticipantId";
import { getButtonProps } from "../utils/survey-utils/getButtonProps";
import { handlePreviousButton } from "../utils/survey-utils/handlePrevious";
import { handleNextButton } from "../utils/survey-utils/handleNext";
import CaseWrapper from "../survey-components/caseWrapper";
import HeaderWrapper from "../survey-components/headerWrapper";

const Survey = ({
  history,
  REACT_APP_registration,
  REACT_APP_background,
  REACT_APP_demonstration,
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
      REACT_APP_demonstration,
      setOpenDialog
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

    await handleGetParticipantId(e, formInfo, history, Version, setRouteIsAllowed);
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
      <HeaderWrapper />
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
            return <CaseWrapper {...props} />;
          }}
        />
        <Route path="/survey/home">
          <Home setRouteIsAllowed={setRouteIsAllowed} />
        </Route>
      </Switch>

      <Footer {...footerButtonProps} />
    </div>
  );
};

export default Survey;
