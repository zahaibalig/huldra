import React from "react";
import GenericButton from "./genericButton";
import RankedText from "./rankedText";
import TextWithIcons from "./textWithIcons";

const GenericTextSection = ({
  className,
  text,
  textClassName,
  textUrl,
  imageAlternativeText,
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
  textHeight,
  textWidth,
  textLabel,
  storageType,
}) => {
  return (
    <div className={className}>
      <h5>{title}</h5>
      {text && <p className={textClassName}>{text}</p>}{" "}
      <RankedText
        url={textUrl}
        width={textWidth}
        height={textHeight}
        alternativeText={imageAlternativeText}
        className={textClassName}
        rank={imageRank}
        hasRank={imageHasRank}
        onClick={imageOnClick}
        label={textLabel}
        storageType={storageType}
      />
      {hasButton && (
        <div className="generic-text-section-button">
          {" "}
          <GenericButton
            className={buttonClassName}
            disabled={buttonDisabled}
            hasIcon={buttonHasIcon}
            iconClassName={buttonIconClassName}
            id={buttonId}
            label={buttonLabel}
            onClick={buttonOnClick}
          />
          {showTextWithIcons && (
            <TextWithIcons
              hasLeftIcon={textWithIconsHasLeftIcon}
              leftIconClassName={textWithIconLeftIconClassName}
              label={textWithIconsLabel}
              hasRightIcon={textWithIconsHasRightIcon}
              rightIconClassName={textWithIconsRightIconClassName}
              className={textWithIconsClassName}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default GenericTextSection;
