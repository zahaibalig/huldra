import { useContext } from "react";
import { AppContext } from "../context/appContext";

const HeaderRightLabel = ({ history }) => {
  const { PageLocator, casesCount, REACT_APP_general } = useContext(AppContext);

  return (
    history.location.pathname !== "/survey/end" && (
      <div className="survey-header">
        {history.location.pathname === "/survey/background" ? (
          <span>{`${REACT_APP_general && REACT_APP_general["appName"]} |
				 ${
           REACT_APP_general &&
           REACT_APP_general["header"] &&
           REACT_APP_general["header"]["labelBackground"]
         }
				`}</span>
        ) : history.location.pathname === "/survey/demonstration" ? (
          <span>{`${REACT_APP_general && REACT_APP_general["appName"]} |
				${
          REACT_APP_general &&
          REACT_APP_general["header"] &&
          REACT_APP_general["header"]["labelDemonstration"]
        }`}</span>
        ) : history.location.pathname === "/survey/summary-and-feedback" ? (
          <span>{`${REACT_APP_general && REACT_APP_general["appName"]} |
				${
          REACT_APP_general &&
          REACT_APP_general["header"] &&
          REACT_APP_general["header"]["labelSummaryAndFeedback"]
        }`}</span>
        ) : history.location.pathname.includes("case") ? (
          <span>{`${REACT_APP_general && REACT_APP_general["appName"]} |
				${
          REACT_APP_general &&
          REACT_APP_general["header"] &&
          REACT_APP_general["header"]["labelCase"]
        } | Case ${PageLocator}/${casesCount}`}</span>
        ) : (
          <span></span>
        )}
      </div>
    )
  );
};

export default HeaderRightLabel;
