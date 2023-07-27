import CaseImage from "../pages/caseImage";
import CaseVideo from "../pages/caseVideo";
import CaseHybrid from "../pages/caseHybrid";
import CaseAudio from "../pages/caseAudio";
import CaseText from "../pages/caseText";
import { useContext } from "react";
import { AppContext } from "../context/appContext";
import { fetchConfigVariablesBatch } from "../utils/handleConfigVars";
import { useParams } from "react-router-dom";

const CaseWrapper = () => {
  const { casesCount } = useContext(AppContext);
  const CaseId = useParams().id;

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

  const prefix = JSON.parse(localStorage.getItem("CaseOrder"))
    [CaseId - 1].split("-")[0]
    .toLowerCase();

  return prefix === "text" ? (
    <CaseText totalCases={casesCount} caseId={CaseId} REACT_APP_caseText={REACT_APP_caseText} />
  ) : prefix === "audio" ? (
    <CaseAudio totalCases={casesCount} caseId={CaseId} REACT_APP_caseAudio={REACT_APP_caseAudio} />
  ) : prefix === "hybrid" ? (
    <CaseHybrid
      totalCases={casesCount}
      caseId={CaseId}
      REACT_APP_caseHybrid={REACT_APP_caseHybrid}
    />
  ) : prefix === "video" ? (
    <CaseVideo totalCases={casesCount} caseId={CaseId} REACT_APP_caseVideo={REACT_APP_caseVideo} />
  ) : (
    <CaseImage totalCases={casesCount} caseId={CaseId} REACT_APP_caseImage={REACT_APP_caseImage} />
  );
};

export default CaseWrapper;
