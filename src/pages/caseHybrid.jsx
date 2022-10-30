import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../context/appContext";
import { getFirebaseApp } from "../utils/firebase";
import Modal from '@mui/material/Modal';
import CaseHybridColumnLeft from "../major-components/caseHybridColumnLeft";
import CaseHybridColumnMiddle from "../major-components/caseHybridColumnMiddle";
import CaseHybridColumnRight from "../major-components/caseHybridColumnRight";
import Popup from "../minor-components/popup";

const CaseHybrid = ({
  caseId = 5,
  totalCases,

  REACT_APP_outputJson,
  REACT_APP_caseHybrid,
}) => {
  const [subscribed, setSubscribed] = useState(false);
  const [openedChoiceA, setOpenedChoiceA] = useState(false);
  const [openedChoiceB, setOpenedChoiceB] = useState(false);
  const [openChoiceA, setOpenChoiceA] = useState(false);
  const [openChoiceB, setOpenChoiceB] = useState(false);
  const [casePageType] = useState("ranking"); // TODO: CHANGE FROM STATE VARIABLE TO A CONFIG PARAMETER.  ALTERNATIVE VALUES: "ranking", "highlight"

  const { disableNextButton, setDisableNextButton } = useContext(AppContext);
  const empty = `/gallery/empty.png`;
  const [first, setFirst] = useState(empty);
  const [second, setSecond] = useState(empty);
  const pagesOrder = JSON.parse(
    localStorage.getItem("CaseOrder") // TODO: can be moved later to survey
  );
  const videoUrl = `/gallery/cases/${pagesOrder[caseId - 1]}/${pagesOrder[caseId - 1]
    }.mp4`;
  const choiceAHighRes = `/gallery/cases/${pagesOrder[caseId - 1]}/${pagesOrder[caseId - 1]
    }-a.png`;

  const choiceBHighRes = `/gallery/cases/${pagesOrder[caseId - 1]}/${pagesOrder[caseId - 1]
    }-b.png`;

  const choiceAThumbnail = `/gallery/cases/${pagesOrder[caseId - 1]}/${pagesOrder[caseId - 1]
    }-a.png`;

  const choiceBThumbnail = `/gallery/cases/${pagesOrder[caseId - 1]}/${pagesOrder[caseId - 1]
    }-b.png`;

  useEffect(() => {
    setDisableNextButton(true);
    setSubscribed(true);
    getFirebaseApp();
    setOpenedChoiceA(false);
    setOpenedChoiceB(false);
    const CaseStudyAnswers = JSON.parse(
      localStorage.getItem("CaseStudyAnswers")
    );
    if (CaseStudyAnswers && CaseStudyAnswers[caseId]) {
      setDisableNextButton(false);

      if (CaseStudyAnswers[caseId] && CaseStudyAnswers[caseId][0] === "A") {
        setFirst(choiceAThumbnail);
        setSecond(choiceBThumbnail);
      } else if (
        CaseStudyAnswers[caseId] &&
        CaseStudyAnswers[caseId][0] === "B"
      ) {
        setFirst(choiceBThumbnail);
        setSecond(choiceAThumbnail);
      }
    } else {
      setFirst(empty);
      setSecond(empty);
      setDisableNextButton(true);
    }

    localStorage.setItem("PageLocator", caseId);

    return () => {
      setSubscribed(false);
    };
  }, [
    caseId,
    disableNextButton,
    setDisableNextButton,
    choiceAThumbnail,
    choiceBThumbnail,
    empty,
    setSubscribed,
  ]);
  /* TODO: THIS PATH SHOULD BE PASSED TO GenericSection AS THE imageUrl */

  const selectAsFirst = (choice) => {
    /* TODO: read the corresponding string for the answers item in the output
      json ( e.g "answers" or "CaseStudyAnswers") from config.json or .env */
    /*      toastSuccess(
        "Both explanations have been viewed.",
        "top-center",
        "select-error"
      ); */

    const CaseStudyAnswers = JSON.parse(
      localStorage.getItem("CaseStudyAnswers")
    );
    const newAnswers = { ...CaseStudyAnswers };
    if (choice === "choiceA") {
      newAnswers[caseId] = ["A", "B"];
      setFirst(choiceAThumbnail);
      setSecond(choiceBThumbnail);
    } else {
      newAnswers[caseId] = ["B", "A"];
      setFirst(choiceBThumbnail);
      setSecond(choiceAThumbnail);
    }

    localStorage.setItem("CaseStudyAnswers", JSON.stringify(newAnswers));
    setDisableNextButton(false);
  };
  return (
    <div className="sections-wrapper">
      <CaseHybridColumnLeft
        title={`${REACT_APP_caseHybrid["caseHybridColumnLeft"].label} ${caseId}/${totalCases}`}
        text="This is a sample video clip showing a goal event."
        className="survey-box"
        textClassName="background-text-content-left"
        sectionVideoUrl={videoUrl}
        sectionImageClassName="case-wrapper"
        sectionButtonClassName="btn control"
      />
      <CaseHybridColumnMiddle
        className="survey-box"
        title={REACT_APP_caseHybrid["caseHybridColumnMiddle"].title}
        text={REACT_APP_caseHybrid["caseHybridColumnMiddle"].text}
        textClassName="background-text-content"
        leftSectionClassName="caseAlternativesSection"
        leftSectionImageUrl={choiceAThumbnail}
        leftSectionImageClassName="scaled-image-fit-width-hybrid"
        leftSectionTitle={
          REACT_APP_caseHybrid["caseHybridColumnMiddle"].leftSectionTitle
        }
        leftSectionButtonClassName="btn control"
        leftSectionButtonlabel={
          REACT_APP_caseHybrid["caseHybridColumnMiddle"].leftSectionButtonlabel
        }
        leftSectionImageOnClick={() => {
          selectAsFirst("choiceA");
        }}
        leftSectionButtonOnClick={() => {
          setOpenChoiceA(true);
          setOpenedChoiceA(true);
        }}
        leftSectionHasButton={true}
        leftSectionTextWithIconsHasLeftIcon={false}
        leftSectionTextWithIconsLabel={
          REACT_APP_caseHybrid["caseHybridColumnMiddle"]
            .leftSectionTextWithIconsLabel
        }
        leftSectionTextWithIconsHasRightIcon={true}
        leftSectionTextWithIconsRightIconClassName="fa fa-check viewed"
        leftSectionShowTextWithIcons={openedChoiceA === true || first !== empty}
        leftSectionTextWithIconsClassName="top-margined"
        rightSectionClassName="caseAlternativesSection"
        rightSectionButtonClassName="btn control"
        rightSectionButtonlabel={
          REACT_APP_caseHybrid["caseHybridColumnMiddle"].rightSectionButtonlabel
        }
        rightSectionImageUrl={choiceBThumbnail}
        rightSectionImageClassName="scaled-image-fit-width-hybrid"
        rightSectionTitle={
          REACT_APP_caseHybrid["caseHybridColumnMiddle"].rightSectionTitle
        }
        rightSectionButtonOnClick={() => {
          setOpenChoiceB(true);
          setOpenedChoiceB(true);
        }}
        rightSectionHasButton={true}
        rightSectionImageOnClick={() => {
          selectAsFirst("choiceB");
        }}
        rightSectionTextWithIconsHasLeftIcon={false}
        rightSectionTextWithIconsLabel={
          REACT_APP_caseHybrid["caseHybridColumnMiddle"]
            .rightSectionTextWithIconsLabel
        }
        rightSectionTextWithIconsHasRightIcon={true}
        rightSectionTextWithIconsRightIconClassName="fa fa-check viewed"
        rightSectionShowTextWithIcons={
          openedChoiceB === true || first !== empty
        }
        rightSectionTextWithIconsClassName="top-margined"
      />
      <Modal
        className="modal"
        open={openChoiceA}
        onClose={() => setOpenChoiceA(false)}>
        <Popup
          onCloseIconClick={() => setOpenChoiceA(false)}
          title={
            REACT_APP_caseHybrid["caseHybridColumnMiddle"].popupA["mainTitle"]
          }
          imageUrl={choiceAHighRes}
          popupType="basic"
        />
      </Modal>
      <Modal
        className="modal"
        open={openChoiceB}
        onClose={() => setOpenChoiceB(false)}>
        <Popup
          onCloseIconClick={() => setOpenChoiceB(false)}
          title={
            REACT_APP_caseHybrid["caseHybridColumnMiddle"].popupB["mainTitle"]
          }
          imageUrl={choiceBHighRes}
          popupType="basic"
        />
      </Modal>
      {casePageType === "ranking" && (
        <CaseHybridColumnRight
          className="survey-box"
          title={
            REACT_APP_caseHybrid &&
            REACT_APP_caseHybrid["caseHybridColumnRight"].title
          }
          text={
            REACT_APP_caseHybrid &&
            REACT_APP_caseHybrid["caseHybridColumnRight"].text
          }
          textClassName="background-text-content"
          topSectionClassName="generic-image-section"
          topSectionImageUrl={first}
          topSectionImageClassName="scaled-image-fit-height "
          topSectionImageHasRank={true}
          topSectionImageRank={1}
          bottomSectionClassName="generic-image-section"
          bottomSectionImageUrl={second}
          bottomSectionImageClassName="scaled-image-fit-height "
          bottomSectionImageHasRank={true}
          bottomSectionImageRank={2}
        />
      )}
    </div>
  );
};

export default CaseHybrid;
