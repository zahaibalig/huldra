import React from "react";
import CaseMultiRankingContainer from "../major-components/caseMultiRankingContainer";
import "../assets/css/caseMultiRanking.css";
import getConfig from "../utils/handleStorageConfig";

const CaseRankingMulti = ({ caseId, totalCases, REACT_APP_caseMultiRanking }) => {
  let choiceA = "-a";
  let choiceB = "-b";
  let choiceC = "-c";
  let choiceD = "-d";
  const storageConfig = getConfig();
  if (storageConfig.assetsStorageType === "local") {
    const validCaseFiles = JSON.parse(localStorage.getItem("ValidCaseFiles"));
    if (validCaseFiles && validCaseFiles[caseId - 1]) {
      const caseFiles = validCaseFiles[caseId - 1];
      choiceA = caseFiles[0];
      choiceB = caseFiles[1];
      choiceC = caseFiles[2];
      choiceD = caseFiles[3];
    }
  } else if (storageConfig.assetsStorageType === "firebase") {
    //TODO::dynamic path
    choiceA = `/gallery/cases/multiranking/multiranking${choiceA}.jpg`;
    choiceB = `/gallery/cases/multiranking/multiranking${choiceB}.jpg`;
    choiceC = `/gallery/cases/multiranking/multiranking${choiceC}.jpg`;
    choiceD = `/gallery/cases/multiranking/multiranking${choiceD}.jpg`;
  }
  return (
    <div className="case-multi-ranking-section-wrapper">
      <CaseMultiRankingContainer
        titleLeftSection={`${REACT_APP_caseMultiRanking["caseMultiRankingColumnLeft"].label} ${caseId}/${totalCases}`}
        titleRightSection={`${REACT_APP_caseMultiRanking["caseMultiRankingColumnRight"].label}`}
        text={`${REACT_APP_caseMultiRanking["caseMultiRankingColumnLeft"].text}`}
        caseId={caseId}
        totalCases={totalCases}
        REACT_APP_caseMultiRank={REACT_APP_caseMultiRanking}
        choiceA={choiceA}
        choiceB={choiceB}
        choiceC={choiceC}
        choiceD={choiceD}
      />
    </div>
  );
};

export default CaseRankingMulti;
