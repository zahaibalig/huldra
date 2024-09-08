import React, { useState, useCallback, useEffect } from "react";
import { useDrop } from "react-dnd";
import MultiRankingSlot from "../minor-components/MultiRankingSlot";
import ImageSection from "../minor-components/MultiRankingImageSection";

const CaseMultiRankingContainer = ({
  caseId,
  choiceA,
  choiceB,
  choiceC,
  choiceD,
  titleLeftSection,
  titleRightSection,
  text,
}) => {
  const images = [choiceA, choiceB, choiceC, choiceD];
  const [rankedImages, setRankedImages] = useState([null, null, null, null]);

  const saveRanking = useCallback((newRankedImages) => {
    const userRanking = newRankedImages.reduce((acc, item, index) => {
      acc[`choice${index + 1}`] = item;
      return acc;
    }, {});

    const userAnswer = newRankedImages.reduce((acc, item, index) => {
      if (item) {
        const letter = item.slice(-5, -4).toUpperCase();
        acc[`choice${index + 1}`] = letter;
      }
      return acc;
    }, {});

    localStorage.setItem("UserRanking", JSON.stringify(userRanking));

    const CaseStudyAnswers = JSON.parse(localStorage.getItem("CaseStudyAnswers"));
    const newAnswers = { ...CaseStudyAnswers };
    newAnswers[caseId] = userAnswer;
    localStorage.setItem("CaseStudyAnswers", JSON.stringify(newAnswers));
  }, []);

  const getranking = useCallback(() => {
    const ranking = JSON.parse(localStorage.getItem("UserRanking"));
    if (ranking) {
      const newRankedImages = images.map((_, index) => ranking[`choice${index + 1}`]);
      setRankedImages(newRankedImages);
    }
  }, [images]);

  useEffect(() => {
    getranking();
  }, []);

  const moveImageToSlot = useCallback(
    (name, index) => {
      setRankedImages((prev) => {
        const newRankedImages = [...prev];
        newRankedImages[index] = name;
        saveRanking(newRankedImages);
        return newRankedImages;
      });
    },
    [saveRanking]
  );

  const swapImages = useCallback(
    (fromIndex, toIndex) => {
      setRankedImages((prev) => {
        const newRankedImages = [...prev];
        const temp = newRankedImages[fromIndex];
        newRankedImages[fromIndex] = newRankedImages[toIndex];
        newRankedImages[toIndex] = temp;
        saveRanking(newRankedImages);
        return newRankedImages;
      });
    },
    [saveRanking]
  );

  const [{ canDrop: canDropLeft, isOver: isOverLeft }, dropLeft] = useDrop(() => ({
    accept: "IMAGE",
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const availableImages = images.filter((img) => !rankedImages.includes(img));

  return (
    <div>
      <div className="case-multi-ranking-container">
        <div className="case-multi-ranking-column" ref={dropLeft}>
          <h4>{titleLeftSection}</h4>
          <h3>{text}</h3>

          <div className="case-multi-ranking-column-middle">
            {availableImages.map((name) => (
              <ImageSection key={name} name={name} />
            ))}
          </div>
        </div>
        <div className="case-multi-ranking-column">
          <h4>{titleRightSection}</h4>
          <div className="case-multi-ranking-column-right-vertical">
            {rankedImages.map((name, index) => (
              <MultiRankingSlot
                rankedImages={rankedImages}
                setRankedImages={setRankedImages}
                key={index}
                name={name}
                index={index}
                moveImage={moveImageToSlot}
                swapImages={swapImages}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseMultiRankingContainer;