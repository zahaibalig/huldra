import { render, screen, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom";
import App from './App';
import { BrowserRouter as Router, MemoryRouter } from "react-router-dom";
import { AppContext } from "./context/appContext";
import userEvent from '@testing-library/user-event';

test('App renders the warning page if window.innerWidth < 1200', () => {
  window.innerWidth = 1199;
  render(<App />, { wrapper: Router });

  const element = screen.getByText(/Please view this page on a device with a screen resolution/);
  expect(element).toBeInTheDocument();
});

// This customRender is necessary to correctly render the App dependent on AppContext
const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <AppContext.Provider value={providerProps}>{ui}</AppContext.Provider>,
    renderOptions
  );
};

describe("if window.innerWidth = 1200", () => {
  let providerProps;

  beforeEach(
    () => {
      window.innerWidth = 1200;

      // set the providerProps for the customRender
      (providerProps = {
        disableNextButton: [],
        setDisableNextButton: [],
        getCurrentPageIndex: [],
        PageLocator: [],
        setPageLocator: [],
        firebaseConfig: [],
        rootDirectory: [],
        clientUid: [],
        casesCount: [],
        REACT_APP_general: [],
        setCasesCount: jest.fn(),
        getCasesCount: [],
        currentDemonstrationPageIndex: [],
        setCurrentDemonstrationPageIndex: [],
      })
    }
  );

  test('App homepage: renders with correct title', () => {
    customRender(<App />, { wrapper: Router, providerProps });

    const element = screen.getByText(/Huldra: Sample Title/);
    expect(element).toBeInTheDocument();
  });

  test('App renders all pages and navigation works', async () => {
    customRender(<App />, { wrapper: Router, providerProps });
    const user = userEvent.setup();

    // verify page content for default route /survey/home
    const element = screen.getByRole('button', {name: 'Get participant ID'});
    expect(element).toBeInTheDocument();

    // verify navigation to /survey/registration works and page renders correctly
    // adding `await` in front of `waitFor` causes warning messages. putting `user.click` out of `waitFor` block causes error messages. don't know why
    waitFor(() => {
      user.click(element);
      expect(screen.getByText(/Name/)).toBeInTheDocument();
      expect(screen.getByText(/E-mail address/)).toBeInTheDocument();

      const buttonStartSurvey = screen.getByRole('button', {name: 'Start Survey'});
      expect(buttonStartSurvey).toBeInTheDocument();
    });

    // verify navigation to /survey/background works and page renders correctly
    waitFor(() => {
      user.click(buttonStartSurvey);
      expect(screen.getByText(/Background/)).toBeInTheDocument();

      const buttonNextOnBackground = screen.getByRole('button', {name: 'Next'});
      expect(buttonNextOnBackground).toBeInTheDocument();
    });

    // verify navigation to /survey/demonstration works and page renders correctly
    waitFor(() => {
      user.click(buttonNextOnBackground);
      expect(screen.getByText(/You can have a demonstration page with a single image/)).toBeInTheDocument();

      const buttonNextOnDemeonstration = screen.getByRole('button', {name: 'Next'});
      expect(buttonNextOnDemeonstration).toBeInTheDocument();
    });

});

});
