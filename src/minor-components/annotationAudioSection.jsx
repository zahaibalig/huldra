import React from "react";
import AnnotationAudio from "./annotationAudio";

const AnnotationAudioSection = ({
  className,
  text,
  textClassName,
  audioUrl,
  imageAlternativeText,
  audioClassName,
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
  audioHeight,
  audioWidth,
  audioLabel,
  handleSubmit,
}) => {
  return (
    <div className={className}>
      <h5>{title}</h5>
      {text && <p className={textClassName}>{text}</p>}{" "}
      <AnnotationAudio
        url={audioUrl}
        width={audioWidth}
        height={audioHeight}
        alternativeText={imageAlternativeText}
        className={audioClassName}
        rank={imageRank}
        hasRank={imageHasRank}
        onClick={imageOnClick}
        label={audioLabel}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default AnnotationAudioSection;
