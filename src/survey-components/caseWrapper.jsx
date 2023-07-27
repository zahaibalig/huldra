import CaseImage from "../pages/caseImage";
import CaseVideo from "../pages/caseVideo";
import CaseHybrid from "../pages/caseHybrid";
import CaseAudio from "../pages/caseAudio";
import CaseText from "../pages/caseText";
import { useContext } from "react";
import { AppContext } from "../context/appContext";
import { fetchConfigVariablesBatch } from "../utils/handleConfigVars";

const CaseWrapper = () => {
  const { PageLocator, casesCount } = useContext(AppContext);

  const {
    REACT_APP_caseImage,
    REACT_APP_caseVideo,
    REACT_APP_caseAudio,
    REACT_APP_caseHybrid,
    REACT_APP_caseText,
  } = fetchConfigVariablesBatch([
    "REACT_APP_caseImage",
    "REACT_APP_caseVideo",
    "REACT_APP_caseAudio",
    "REACT_APP_caseHybrid",
    "REACT_APP_caseText",
  ]);

  let prefix = JSON.parse(localStorage.getItem("CaseOrder"))
    [PageLocator - 1].split("-")[0]
    .toLowerCase();

  return prefix === "text" ? (
    <CaseText
      totalCases={casesCount}
      caseId={PageLocator}
      REACT_APP_caseText={REACT_APP_caseText}
    />
  ) : prefix === "audio" ? (
    <CaseAudio
      totalCases={casesCount}
      caseId={PageLocator}
      REACT_APP_caseAudio={REACT_APP_caseAudio}
    />
  ) : prefix === "hybrid" ? (
    <CaseHybrid
      totalCases={casesCount}
      caseId={PageLocator}
      REACT_APP_caseHybrid={REACT_APP_caseHybrid}
    />
  ) : prefix === "video" ? (
    <CaseVideo
      totalCases={casesCount}
      caseId={PageLocator}
      REACT_APP_caseVideo={REACT_APP_caseVideo}
    />
  ) : (
    <CaseImage
      totalCases={casesCount}
      caseId={PageLocator}
      REACT_APP_caseImage={REACT_APP_caseImage}
    />
  );
};

export default CaseWrapper;
