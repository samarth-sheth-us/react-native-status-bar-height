jest.mock("react-native", () => ({
  NativeModules: {
    StatusBarHeight: {
      getHeight: jest.fn().mockResolvedValue(20),
    },
  },
  Platform: {
    OS: "ios",
    select: jest.fn((obj) => obj.ios),
  },
  StatusBar: {
    currentHeight: 24,
  },
  StyleSheet: {
    create: (styles) => styles,
  },
  Settings: {
    get: jest.fn(),
    set: jest.fn(),
  },
  TurboModuleRegistry: {
    getEnforcing: jest.fn(),
  },
}));
