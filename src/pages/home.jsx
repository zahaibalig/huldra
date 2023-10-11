import "../assets/css/home.css";
import AnonymousWithID from "./anonymousWithID";
import NonAnonymous from "./non-anonymous";
import AnonymousWithoutID from "./anonymousWithoutID";
import { fetchConfigVariablesBatch } from "../utils/handleConfigVars";
const Home = ({ setRouteIsAllowed, participantId, setParticipantId, Version }) => {
  const { REACT_APP_general, REACT_APP_home } = fetchConfigVariablesBatch([
    "REACT_APP_general",
    "REACT_APP_home",
  ]);
  let pageToRender;
  switch (REACT_APP_general?.loginOption) {
    case "anonymousWithID":
      pageToRender = (
        /*Alternative 1: Anonymous Login With ID*/
        <AnonymousWithID
          setRouteIsAllowed={setRouteIsAllowed}
          participantId={participantId}
          setParticipantId={setParticipantId}
        />
      );
      break;
    case "non-anonymous":
      pageToRender = (
        /*Alternative 2: non-anonymous*/
        <NonAnonymous
          setRouteIsAllowed={setRouteIsAllowed}
          participantId={participantId}
          setParticipantId={setParticipantId}
        />
      );
      break;
    case "anonymousWithoutID":
      pageToRender = (
        /* Anonymous without ID */
        <AnonymousWithoutID
          setRouteIsAllowed={setRouteIsAllowed}
          participantId={participantId}
          Version={Version}
        />
      );
      break;
    default:
      pageToRender = (
        /* Default case: Anonymous With ID */
        <AnonymousWithID
          setRouteIsAllowed={setRouteIsAllowed}
          participantId={participantId}
          setParticipantId={setParticipantId}
        />
      );
  }
  return (
    <div className="home-welcome">
      <div className="home-header">
        <h2>
          {(REACT_APP_home && REACT_APP_home["title"]) ||
            (REACT_APP_general && REACT_APP_general["appName"])}
        </h2>
        <div className="home-intro">{REACT_APP_home && REACT_APP_home["introText"]}</div>
      </div>
      {pageToRender}
      <span className="home-additional-text">
        {REACT_APP_home && REACT_APP_home["additionalText"]}
      </span>
    </div>
  );
};

export default Home;
