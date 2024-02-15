import React, { useEffect, useState, useContext } from "react";
import CaseAudioAnnotationColumnLeft from "../major-components/caseAudioAnnotationColumnLeft";
import CaseAudioAnnotationColumnRight from "../major-components/caseAudioAnnotationColumnRight";
import "../assets/css/caseAudio.css";
import getConfig from "../utils/handleStorageConfig";

const CaseAudioAnnotation = ({ REACT_APP_caseAudioAnnotation, caseId, totalCases }) => {
  const pagesOrder = JSON.parse(localStorage.getItem("CaseOrder"));
  const [annotation, setAnnotations] = useState([]);
  const handleSubmit = (timestamp, comment) => {
    if (comment !== "") {
      const previousAnnotations = JSON.parse(localStorage.getItem("audioAnnotations"));
      if (previousAnnotations?.length > 0) {
        let newAnnotations = [
          ...previousAnnotations,
          {
            timeStamp: timestamp.toFixed(2),
            comment,
          },
        ];
        setAnnotations(newAnnotations);
        localStorage.setItem("audioAnnotations", JSON.stringify(newAnnotations));
      } else {
        let firstAnnotations = [
          {
            timeStamp: timestamp.toFixed(2),
            comment,
          },
        ];
        localStorage.setItem("audioAnnotations", JSON.stringify(firstAnnotations));
      }
      setAnnotations(JSON.parse(localStorage.getItem("audioAnnotations")));
    }
  };
  const deleteAnnotation = (index) => {
    const filtered = annotation.filter((_, annotationIndex) => annotationIndex !== index);
    setAnnotations(filtered);
    localStorage.setItem("audioAnnotations", JSON.stringify(filtered));
  };

  let audioUrl = "";
  const storageConfig = getConfig();
  if (storageConfig.assetsStorageType === "local") {
    const validCaseFiles = JSON.parse(localStorage.getItem("ValidCaseFiles"));
    if (validCaseFiles && validCaseFiles[caseId - 1]) {
      const caseFiles = validCaseFiles[caseId - 1];
      audioUrl = caseFiles[0];
    }
  } else if (storageConfig.assetsStorageType === "firebase") {
    // the following file extensions will actually be overwritten in firebase.js
    audioUrl = `/gallery/cases/${pagesOrder[caseId - 1]}/${pagesOrder[caseId - 1]}.mp3`;
  }
  useEffect(() => {
    const storedAnnotations = JSON.parse(localStorage.getItem("audioAnnotations"));
    if (storedAnnotations) {
      setAnnotations(storedAnnotations);
    }
  }, []);
  return (
    <div className="case-hybrid-section-wrapper">
      <CaseAudioAnnotationColumnLeft
        title={`${REACT_APP_caseAudioAnnotation["caseAudioAnnotationColumnLeft"].label} ${caseId}/${totalCases}`}
        text={`${REACT_APP_caseAudioAnnotation["caseAudioAnnotationColumnLeft"].text}`}
        sectionAudioAUrl={audioUrl}
        className="case-hybrid-column"
        textClassName="case-hybrid-text-content-left"
        handleSubmit={handleSubmit}
      />
      <CaseAudioAnnotationColumnRight
        title={`${REACT_APP_caseAudioAnnotation["caseAudioAnnotationColumnRight"].label}`}
        className="case-hybrid-column"
        textClassName="case-hybrid-text-content-right"
        annotations={annotation}
        deleteAnnotation={deleteAnnotation}
      />
    </div>
  );
};

export default CaseAudioAnnotation;
