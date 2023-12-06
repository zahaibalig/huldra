import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../context/appContext";
import CaseAnnotationColumn from "../major-components/caseAnnotationColumn";
import "../assets/css/caseHybrid.css";
import getConfig from "../utils/handleStorageConfig";

const CaseAnnotation = ({ caseId, totalCases, REACT_APP_caseAnnotation }) => {
  const [subscribed, setSubscribed] = useState(false);
  const { disableNextButton, setDisableNextButton, REACT_APP_general } = useContext(AppContext);
  const pagesOrder = JSON.parse(localStorage.getItem("CaseOrder"));

  let videoUrl = "";
  const storageConfig = getConfig();
  if (storageConfig.assetsStorageType === "local") {
    const validCaseFiles = JSON.parse(localStorage.getItem("ValidCaseFiles"));
    if (validCaseFiles && validCaseFiles[caseId - 1]) {
      const caseFiles = validCaseFiles[caseId - 1];
      videoUrl = caseFiles[0];
    }
  } else if (storageConfig.assetsStorageType === "firebase") {
    // the following file extensions will actually be overwritten in firebase.js
    videoUrl = `/gallery/cases/${pagesOrder[caseId - 1]}/${pagesOrder[caseId - 1]}.mp4`;
  }
  console.log(videoUrl);
  useEffect(() => {
    setDisableNextButton(false);
    setSubscribed(true);

    const CaseStudyAnswers = JSON.parse(localStorage.getItem("CaseStudyAnswers"));

    return () => {
      setSubscribed(false);
    };
  }, [caseId, disableNextButton, setDisableNextButton, setSubscribed]);

  return (
    <div className="case-hybrid-section-wrapper">
      <CaseAnnotationColumn
        title={`${REACT_APP_caseAnnotation["caseAnnotationColumn"].label} ${caseId}/${totalCases}`}
        text={`${REACT_APP_caseAnnotation["caseAnnotationColumn"].text}`}
        className="case-hybrid-column"
        textClassName="case-hybrid-text-content-left"
        sectionVideoUrl={videoUrl}
        sectionImageClassName="case-hybrid-image-wrapper"
        sectionButtonClassName="btn control"
      />
    </div>
  );
};

export default CaseAnnotation;
