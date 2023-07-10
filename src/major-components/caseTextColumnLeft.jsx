import React from "react";
import GenericTextSection from "../minor-components/genericTextSection";
const CaseTextColumnLeft = ({
  className,
  title,
  text,
  textClassName,
  sectionClassName,
  sectionText,
  sectionTextClassName,
  sectionImageUrl,
  sectionImageAlternativeText,
  sectionTitle,
  sectionButtonClassName,
  sectionButtonDisabled,
  sectionButtonHasIcon,
  sectionButtonIconClassName,
  sectionButtonId,
  sectionButtonlabel,
  sectionHasButton,
  sectionImageRank,
  sectionImageHasRank,
  sectionTextBUrl,
  sectionTextAUrl,
  sectionTextHeight,
  sectionTextWidth,
  rightSectionTextLabel,
  leftSectionTextLabel,
  rightSectionButtonOnClick,
  leftSectionButtonOnClick,
  storageType,
}) => {
  return (
    <div className={className}>
      <h4>{title}</h4>
      <p className={textClassName}>{text}</p>
      <div className="text-generic-section">
        <GenericTextSection
          storageType={storageType}
          className={sectionClassName}
          text={sectionText}
          textClassName={sectionTextClassName}
          imageUrl={sectionImageUrl}
          imageAlternativeText={sectionImageAlternativeText}
          title={sectionTitle}
          buttonClassName={sectionButtonClassName}
          buttonDisabled={sectionButtonDisabled}
          buttonHasIcon={sectionButtonHasIcon}
          buttonIconclassName={sectionButtonIconClassName}
          buttonId={sectionButtonId}
          buttonLabel={sectionButtonlabel}
          buttonOnClick={leftSectionButtonOnClick}
          hasButton={sectionHasButton}
          imageHasRank={sectionImageHasRank}
          imageRank={sectionImageRank}
          textUrl={sectionTextAUrl}
          textHeight={sectionTextHeight}
          textWidth={sectionTextWidth}
          textLabel={leftSectionTextLabel}
        />
        <GenericTextSection
          storageType={storageType}
          hasButton={sectionHasButton}
          className={sectionClassName}
          text={sectionText}
          textClassName={sectionTextClassName}
          imageUrl={sectionImageUrl}
          imageAlternativeText={sectionImageAlternativeText}
          title={sectionTitle}
          buttonClassName={sectionButtonClassName}
          buttonDisabled={sectionButtonDisabled}
          buttonHasIcon={sectionButtonHasIcon}
          buttonIconclassName={sectionButtonIconClassName}
          buttonId={sectionButtonId}
          buttonLabel={sectionButtonlabel}
          buttonOnClick={rightSectionButtonOnClick}
          imageHasRank={sectionImageHasRank}
          imageRank={sectionImageRank}
          textUrl={sectionTextBUrl}
          textHeight={sectionTextHeight}
          textWidth={sectionTextWidth}
          textLabel={rightSectionTextLabel}
        />
      </div>
    </div>
  );
};

export default CaseTextColumnLeft;
