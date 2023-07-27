import { copyToClipboard } from "../utils/text";
import Header from "../minor-components/header";
import { useHistory } from "react-router-dom";

const HeaderWrapper = () => {
  const history = useHistory();
  const pageIsRegistration = history.location.pathname === "/survey/registration";
  const pageIsEndPage = history.location.pathname === "/survey/end";
  const pageIsHome = history.location.pathname === "/survey/home";

  if (localStorage.length > 0 && !pageIsRegistration && !pageIsEndPage && !pageIsHome) {
    return (
      <Header
        leftLabel={`Participant ID: ${
          JSON.parse(localStorage.getItem("ParticipantInfo"))["ParticipantId"]
        }`}
        leftIcon1TooltipMessage="This is your participant ID. You can copy this ID to keep for later reference, as well as to be able to resume your survey in case of accidental exit before completion."
        leftIcon2TooltipMessage=" Copy to clipboard"
        leftIcon1ClassName="fa fa-info-circle form-tooltip"
        leftIcon2ClassName="fa fa-clone ml-3 form-tooltip"
        leftIcon1OnClick={() => {
          return;
        }}
        leftIcon2OnClick={() =>
          copyToClipboard(JSON.parse(localStorage.getItem("ParticipantInfo"))["ParticipantId"])
        }
        history={history}
      />
    );
  } else {
    return null;
  }
};

export default HeaderWrapper;
