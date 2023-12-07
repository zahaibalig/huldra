import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../context/appContext";
import CaseAnnotationColumnLeft from "../major-components/caseAnnotationColumnLeft";
import CaseAnnotationColumnRight from "../major-components/caseAnnotationColumnRight";
import "../assets/css/caseHybrid.css";
import getConfig from "../utils/handleStorageConfig";

const CaseAnnotation = ({ caseId, totalCases, REACT_APP_caseAnnotation }) => {
  const [subscribed, setSubscribed] = useState(false);
  const { disableNextButton, setDisableNextButton, REACT_APP_general } = useContext(AppContext);
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
  console.log(videoUrl);
  useEffect(() => {
    setDisableNextButton(false);
    setSubscribed(true);
    //get annotations
    const storedAnnotation = JSON.parse(localStorage.getItem("annotations"));
    if (storedAnnotation) {
      setAnnotations(storedAnnotation);
    }

    const CaseStudyAnswers = JSON.parse(localStorage.getItem("CaseStudyAnswers"));

    return () => {
      setSubscribed(false);
    };
  }, [caseId, disableNextButton, setDisableNextButton, setSubscribed]);

  return (
    <div className="case-hybrid-section-wrapper">
      <CaseAnnotationColumnLeft
        title={`${REACT_APP_caseAnnotation["caseAnnotationColumnLeft"].label} ${caseId}/${totalCases}`}
        text={`${REACT_APP_caseAnnotation["caseAnnotationColumnLeft"].text}`}
        className="case-hybrid-column"
        textClassName="case-hybrid-text-content-left"
        sectionVideoUrl={videoUrl}
        sectionImageClassName="case-hybrid-image-wrapper"
        sectionButtonClassName="btn control"
        handleSubmit={handleSubmit}
      />
      <CaseAnnotationColumnRight
        annotations={annotation}
        deleteAnnotation={deleteAnnotation}
        // title={`${REACT_APP_caseAnnotation["caseAnnotationColumnRight"].label}`}
      />
    </div>
  );
};

export default CaseAnnotation;

// fix the title of the answers section
// add slider in the right side section
// update the classes name used in the component
