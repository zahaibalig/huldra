import React from "react";
import AnnotationVideoSection from "../minor-components/annotationVideoSection";
const CaseAnnotationColumn = ({ className, title, text, textClassName, sectionVideoUrl }) => {
  return (
    <div className={className}>
      <h4>{title}</h4>
      <p className={textClassName}>{text}</p>
      <div className={"case-hybrid-video-section-centered"}>
        <AnnotationVideoSection
          className={"case-hybrid-video-section-centered"}
          videoClassName={"case-hybrid-video"}
          hasButton={false}
          videoUrl={sectionVideoUrl}
          videoWidth="400px"
          videoHeight="225px"
        />
      </div>
    </div>
  );
};

export default CaseAnnotationColumn;
