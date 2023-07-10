import React, { useEffect, useState, useContext } from "react";
import CaseTextColumnLeft from "../major-components/caseTextColumnLeft";
import CaseTextColumnRight from "../major-components/caseTextColumnRight";
import { AppContext } from "../context/appContext";
import "../assets/css/caseText.css";
import getConfig from "../utils/handleStorageConfig";

const CaseText = ({ REACT_APP_caseText, caseId, totalCases }) => {
  // console.log("REACT_APP_caseText", REACT_APP_caseText);
  // console.log("console of param", `${REACT_APP_caseText["caseTextColumnLeft"].label}`);
  console.log("console of caseId", `${caseId}`);
  let choiceAHighRes = "";
  let choiceBHighRes = "";
  let choiceAThumbnail = "";
  let choiceBThumbnail = "";
  let originalThumbnail = "";
  let originalHighRes = "";
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const pagesOrder = JSON.parse(localStorage.getItem("CaseOrder"));
  const { disableNextButton, setDisableNextButton } = useContext(AppContext);

  const storageConfig = getConfig();
  let storageType = storageConfig.assetsStorageType ? storageConfig.assetsStorageType : "firebase";
  if (storageConfig.assetsStorageType === "local") {
    const validCaseFiles = JSON.parse(localStorage.getItem("validCaseFiles"));
    console.log("validCaseFiles", validCaseFiles);
    if (validCaseFiles && validCaseFiles[caseId - 1]) {
      const caseFiles = validCaseFiles[caseId - 1];
      choiceAHighRes = caseFiles[2];
      choiceBHighRes = caseFiles[3];
      choiceAThumbnail = caseFiles[2];
      choiceBThumbnail = caseFiles[3];
      originalThumbnail = caseFiles[1];
      originalHighRes = caseFiles[1];
    }
  } else if (storageConfig.assetsStorageType === "firebase") {
    // the following file extensions will actually be overwritten in firebase.js
    choiceAHighRes = `/gallery/cases/${pagesOrder[caseId - 1]}/${pagesOrder[caseId - 1]}-a.txt`;
    choiceBHighRes = `/gallery/cases/${pagesOrder[caseId - 1]}/${pagesOrder[caseId - 1]}-b.txt`;
    choiceAThumbnail = `/gallery/cases/${pagesOrder[caseId - 1]}/${pagesOrder[caseId - 1]}-a.png`;
    choiceBThumbnail = `/gallery/cases/${pagesOrder[caseId - 1]}/${pagesOrder[caseId - 1]}-b.png`;
    originalThumbnail = `/gallery/cases/${pagesOrder[caseId - 1]}/${pagesOrder[caseId - 1]}.png`;
    originalHighRes = `/gallery/cases/${pagesOrder[caseId - 1]}/${pagesOrder[caseId - 1]}.png`;
  }

  // title={`${REACT_APP_caseText["CaseTextColumnLeft"].label} ${caseId}/${totalCases}`}

  useEffect(() => {
    localStorage.setItem("PageLocator", caseId);
    const CaseStudyAnswers = JSON.parse(localStorage.getItem("CaseStudyAnswers"));
    if (CaseStudyAnswers && CaseStudyAnswers[caseId]) {
      setDisableNextButton(false);

      if (CaseStudyAnswers[caseId] && CaseStudyAnswers[caseId][0] === "A") {
        setFirst("A");
        setSecond("B");
      } else if (CaseStudyAnswers[caseId] && CaseStudyAnswers[caseId][0] === "B") {
        setFirst("B");
        setSecond("A");
      }
    } else {
      setFirst("");
      setSecond("");
      setDisableNextButton(true);
    }
  }, [caseId, disableNextButton, setDisableNextButton]);
  const choiceA = `/gallery/cases/${pagesOrder[caseId - 1]}/${pagesOrder[caseId - 1]}-a.txt`;
  const choiceB = `/gallery/cases/${pagesOrder[caseId - 1]}/${pagesOrder[caseId - 1]}-b.txt`;
  const selectAsFirst = (choice) => {
    const CaseStudyAnswers = JSON.parse(localStorage.getItem("CaseStudyAnswers"));
    const newAnswers = { ...CaseStudyAnswers };

    if (choice === "Text A") {
      newAnswers[caseId] = ["A", "B"];
      setFirst("A");
      setSecond("B");
    } else {
      newAnswers[caseId] = ["B", "A"];
      setFirst("B");
      setSecond("A");
    }
    localStorage.setItem("CaseStudyAnswers", JSON.stringify(newAnswers));
    setDisableNextButton(false);
  };
  return (
    <div className="video-sections-wrapper">
      <CaseTextColumnLeft
        storageType={storageType}
        title={`${REACT_APP_caseText["caseTextColumnLeft"].label} ${caseId}/${totalCases}`}
        className="video-survey-box-left"
        textClassName="video-background-content"
        sectionTextAUrl={choiceA}
        sectionTextBUrl={choiceB}
        sectionTextHeight={REACT_APP_caseText["caseTextColumnLeft"].sectionTextHeight}
        sectionTextWidth={REACT_APP_caseText["caseTextColumnLeft"].sectionTextWidth}
        sectionTextClassName="text"
        rightSectionTextLabel={REACT_APP_caseText["caseTextColumnLeft"].rightSectionTextLabel}
        leftSectionTextLabel={REACT_APP_caseText["caseTextColumnLeft"].leftSectionTextLabel}
        rightSectionButtonOnClick={() => {
          selectAsFirst("Text B");
        }}
        leftSectionButtonOnClick={() => {
          selectAsFirst("Text A");
        }}
        sectionButtonlabel={REACT_APP_caseText["caseTextColumnLeft"].sectionButtonlabel}
        sectionButtonClassName="btn control"
        sectionHasButton={true}
      />
      <CaseTextColumnRight
        className="video-survey-box-right"
        title={REACT_APP_caseText["caseTextColumnRight"].title}
        text={REACT_APP_caseText["caseTextColumnRight"].text}
        textClassName="video-background-content"
        topSectionImageHasRank={true}
        topSectionImageRank={1}
        topSectionImageClassName="video-scaled-image-fit-height"
        topSectionClassName="video-generic-image-section"
        bottomSectionClassName="video-generic-image-section"
        bottomSectionImageHasRank={true}
        bottomSectionImageRank={2}
        bottomSectionImageClassName="video-scaled-image-fit-height"
        topSectionTextRankClassName="video-text-rank-section"
        bottomSectionTextRankClassName="video-text-rank-section"
        topSectionImageHasTextRank={true}
        topSectionImageRankText={first}
        bottomSectionImageHasTextRank={true}
        bottomSectionImageRankText={second}
      />
    </div>
  );
};

export default CaseText;
