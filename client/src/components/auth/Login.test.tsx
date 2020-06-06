import { MockedProvider } from "@apollo/react-testing";
import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import "mutationobserver-shim";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";

const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

describe("Login Component", () => {
  describe("Render withour crashing", () => {
    it("Render the inputs", () => {
      const { getByLabelText } = render(
        <MockedProvider>
          <BrowserRouter>
            <Login />
          </BrowserRouter>
        </MockedProvider>
      );

      expect(getByLabelText("username")).toBeInTheDocument();
      expect(getByLabelText("password")).toBeInTheDocument();
    });

    it("Render the button", () => {
      const { getByText } = render(
        <MockedProvider>
          <BrowserRouter>
            <Login />
          </BrowserRouter>
        </MockedProvider>
      );

      expect(getByText("Login")).toBeInTheDocument();
    });
  });

  describe("Validating the form", () => {
    it("When a invalid username is give change the username input color to red and disable the button", async () => {
      const { getByLabelText, getByText } = render(
        <MockedProvider>
          <BrowserRouter>
            <Login />
          </BrowserRouter>
        </MockedProvider>
      );

      const usernameInput = getByLabelText("username");
      const submitButton = getByText("Login");

      fireEvent.blur(usernameInput);
      await waitFor(() => expect(usernameInput).toHaveClass("bg-red-100"));

      fireEvent.change(usernameInput, { target: { value: "aa" } });
      fireEvent.blur(usernameInput);
      await waitFor(() => expect(usernameInput).toHaveClass("bg-red-100"));
      await waitFor(() => expect(submitButton).toBeDisabled());
    });

    it("When a invalid password is give change the password input color to red and disable the button", async () => {
      const { getByLabelText, getByText } = render(
        <MockedProvider>
          <BrowserRouter>
            <Login />
          </BrowserRouter>
        </MockedProvider>
      );

      const passwordInput = getByLabelText("password");
      const submitButton = getByText("Login");

      fireEvent.blur(passwordInput);
      await waitFor(() => expect(passwordInput).toHaveClass("bg-red-100"));

      fireEvent.change(passwordInput, { target: { value: "1234567" } });
      fireEvent.blur(passwordInput);
      await waitFor(() => expect(passwordInput).toHaveClass("bg-red-100"));
      await waitFor(() => expect(submitButton).toBeDisabled());
    });

    it("When a valid username and password is give, enable the button", async () => {
      const { getByLabelText, getByText } = render(
        <MockedProvider>
          <BrowserRouter>
            <Login />
          </BrowserRouter>
        </MockedProvider>
      );

      const usernameInput = getByLabelText("username");
      const passwordInput = getByLabelText("password");
      const submitButton = getByText("Login");

      fireEvent.change(passwordInput, { target: { value: "12345678" } });
      fireEvent.blur(passwordInput);

      fireEvent.change(usernameInput, { target: { value: "John Doe" } });
      fireEvent.blur(usernameInput);

      await waitFor(() => expect(usernameInput).not.toHaveClass("bg-red-100"));
      await waitFor(() => expect(passwordInput).not.toHaveClass("bg-red-100"));
      await waitFor(() => expect(submitButton).not.toBeDisabled());
    });
  });
});
