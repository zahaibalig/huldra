import GenericButton from "../minor-components/genericButton";
import "../assets/css/home.css";
import { useHistory } from "react-router-dom";
import { handleLogin } from "../utils/handleLogin";

/* ALTERNATIVE 3: ANONYMOUS WITHOUT ID BOX */
const AnonymousWithoutID = ({ participantId, setRouteIsAllowed, Version }) => {
  const history = useHistory();
  return (
    <div className="home-registration-wrapper">
      <div className="home-login">
        <GenericButton
          onClick={() => {
            handleLogin(participantId, history, setRouteIsAllowed, Version);
          }}
          hasIcon={true}
          className={"btn"}
          id="start-survey-button"
          iconClassName={"fa fa-play mr-2"}
          label="Start survey"
        />
      </div>
    </div>
  );
};

export default AnonymousWithoutID;
