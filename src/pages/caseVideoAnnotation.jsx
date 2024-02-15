import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../context/appContext";
import CaseVideoAnnotationColumnLeft from "../major-components/caseVideoAnnotationColumnLeft";
import CaseVideoAnnotationColumnRight from "../major-components/caseVideoAnnotationColumnRight";
import "../assets/css/caseHybrid.css";
import getConfig from "../utils/handleStorageConfig";

const CaseVideoAnnotation = ({ caseId, totalCases, REACT_APP_caseVideoAnnotation }) => {
  const [subscribed, setSubscribed] = useState(false);
  const { disableNextButton, setDisableNextButton } = useContext(AppContext);
  const [annotation, setAnnotations] = useState([]);
  const pagesOrder = JSON.parse(localStorage.getItem("CaseOrder"));
  const handleSubmit = (timestamp, comment) => {
    if (comment !== "") {
      const previousAnnotations = JSON.parse(localStorage.getItem("annotations"));
      if (previousAnnotations?.length > 0) {
        let newAnnotations = [
          ...previousAnnotations,
          {
            timeStamp: timestamp.toFixed(2),
            comment,
          },
        ];
        setAnnotations(newAnnotations);
        localStorage.setItem("annotations", JSON.stringify(newAnnotations));
      } else {
        let firstAnnotations = [
          {
            timeStamp: timestamp.toFixed(2),
            comment,
          },
        ];
        localStorage.setItem("annotations", JSON.stringify(firstAnnotations));
      }
      setAnnotations(JSON.parse(localStorage.getItem("annotations")));
    }
  };

  const deleteAnnotation = (index) => {
    const filtered = annotation.filter((_, annotationIndex) => annotationIndex !== index);
    setAnnotations(filtered);
    localStorage.setItem("annotations", JSON.stringify(filtered));
  };
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
  useEffect(() => {
    setDisableNextButton(false);
    setSubscribed(true);
    const storedAnnotation = JSON.parse(localStorage.getItem("annotations"));
    if (storedAnnotation) {
      setAnnotations(storedAnnotation);
    }
    return () => {
      setSubscribed(false);
    };
  }, [caseId, disableNextButton, setDisableNextButton, setSubscribed]);

  return (
    <div className="case-hybrid-section-wrapper">
      <CaseVideoAnnotationColumnLeft
        title={`${REACT_APP_caseVideoAnnotation["caseVideoAnnotationColumnLeft"].label} ${caseId}/${totalCases}`}
        text={`${REACT_APP_caseVideoAnnotation["caseVideoAnnotationColumnLeft"].text}`}
        className="case-hybrid-column"
        textClassName="case-hybrid-text-content-left"
        sectionVideoUrl={videoUrl}
        sectionImageClassName="case-hybrid-image-wrapper"
        sectionButtonClassName="btn control"
        handleSubmit={handleSubmit}
      />
      <CaseVideoAnnotationColumnRight
        title={`${REACT_APP_caseVideoAnnotation["caseVideoAnnotationColumnRight"].label}`}
        className="case-hybrid-column"
        textClassName="case-hybrid-text-content-right"
        annotations={annotation}
        deleteAnnotation={deleteAnnotation}
      />
    </div>
  );
};

export default CaseVideoAnnotation;
