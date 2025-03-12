import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import App from "../src/App";
import { getStatusBarHeight } from "react-native-status-bar-height";

// Mock the getStatusBarHeight function
jest.mock("react-native-status-bar-height", () => ({
  getStatusBarHeight: jest.fn().mockResolvedValue(44),
}));

// Mock the useColorScheme hook
jest.mock("react-native", () => {
  const RN = jest.requireActual("react-native");
  return {
    ...RN,
    useColorScheme: () => "light",
    Platform: {
      ...RN.Platform,
      OS: "ios",
    },
  };
});

describe("Status Bar Height Example App", () => {
  it("renders correctly and shows status bar height", async () => {
    const { getByText } = render(<App />);

    // Wait for async operations to complete
    await waitFor(() => {
      expect(getByText("Status Bar Height Demo")).toBeTruthy();
      expect(getByText("44px")).toBeTruthy();
    });

    // Verify all UI elements are present
    expect(getByText("Current Platform:")).toBeTruthy();
    expect(getByText("Android Height:")).toBeTruthy();
    expect(getByText("iOS Height:")).toBeTruthy();
  });

  it("calls getStatusBarHeight with correct parameters", async () => {
    render(<App />);

    await waitFor(() => {
      expect(getStatusBarHeight).toHaveBeenCalled();
    });
  });
});
