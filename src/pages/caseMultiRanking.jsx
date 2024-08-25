import React from "react";
import CaseMultiRankingContainer from "../major-components/caseMultiRankingContainer";
import "../assets/css/caseMultiRanking.css";
import getConfig from "../utils/handleStorageConfig";

const CaseRankingMulti = ({ caseId, totalCases, REACT_APP_caseMultiRanking }) => {
  let choiceA = "";
  let choiceB = "";
  let choiceC = "";
  let choiceD = "";
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
