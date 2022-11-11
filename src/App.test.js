import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import App from './App';
import { BrowserRouter as Router, MemoryRouter } from "react-router-dom";

test('App homepage: renders', () => {
  render(<App />, { wrapper: Router });

  const element = screen.getByText(/Please view this page on a device with a screen resolution/);
  expect(element).toBeInTheDocument();
});
