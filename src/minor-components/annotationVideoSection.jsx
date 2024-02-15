import React from "react";
import AnnotationVideo from "./annotationVideo";

const AnnotationVideoSection = ({
  className,
  text,
  textClassName,
  videoUrl,
  imageAlternativeText,
  videoClassName,
  title,
  buttonClassName,
  buttonDisabled,
  buttonHasIcon,
  buttonIconClassName,
  buttonId,
  buttonLabel,
  buttonOnClick,
  hasButton,
  imageRank,
  imageHasRank,
  imageOnClick,
  textWithIconsHasLeftIcon,
  textWithIconLeftIconClassName,
  textWithIconsLabel,
  textWithIconsHasRightIcon,
  textWithIconsRightIconClassName,
  textWithIconsClassName,
  showTextWithIcons = false,
  videoHeight,
  videoWidth,
  videoLabel,
  handleSubmit,
}) => {
  return (
    <div className={className}>
      <h5>{title}</h5>
      {text && <p className={textClassName}>{text}</p>}{" "}
      <AnnotationVideo
        url={videoUrl}
        width={videoWidth}
        height={videoHeight}
        alternativeText={imageAlternativeText}
        className={videoClassName}
        rank={imageRank}
        hasRank={imageHasRank}
        onClick={imageOnClick}
        label={videoLabel}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default AnnotationVideoSection;
