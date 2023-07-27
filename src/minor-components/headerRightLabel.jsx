import { useContext } from "react";
import { AppContext } from "../context/appContext";
import { useLocation } from "react-router-dom";

const HeaderRightLabel = () => {
  const { PageLocator, casesCount, REACT_APP_general } = useContext(AppContext);

  const location = useLocation();

  return (
    location.pathname !== "/survey/end" && (
      <div className="survey-header">
        {location.pathname === "/survey/background" ? (
          <span>{`${REACT_APP_general && REACT_APP_general["appName"]} |
				 ${
           REACT_APP_general &&
           REACT_APP_general["header"] &&
           REACT_APP_general["header"]["labelBackground"]
         }
				`}</span>
        ) : location.pathname === "/survey/demonstration" ? (
          <span>{`${REACT_APP_general && REACT_APP_general["appName"]} |
				${
          REACT_APP_general &&
          REACT_APP_general["header"] &&
          REACT_APP_general["header"]["labelDemonstration"]
        }`}</span>
        ) : location.pathname === "/survey/summary-and-feedback" ? (
          <span>{`${REACT_APP_general && REACT_APP_general["appName"]} |
				${
          REACT_APP_general &&
          REACT_APP_general["header"] &&
          REACT_APP_general["header"]["labelSummaryAndFeedback"]
        }`}</span>
        ) : location.pathname.includes("case") ? (
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
