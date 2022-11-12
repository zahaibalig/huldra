import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import App from './App';
import { BrowserRouter as Router, MemoryRouter } from "react-router-dom";
import { AppContext } from "./context/appContext";

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

});
