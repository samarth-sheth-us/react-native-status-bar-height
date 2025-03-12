module.exports = {
  preset: "react-native",
  modulePathIgnorePatterns: [
    "<rootDir>/example/node_modules",
    "<rootDir>/lib/",
  ],
  setupFiles: ["<rootDir>/jest.setup.js"],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|react-native-builder-bob)/)",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$",
  moduleNameMapper: {
    "^react-native$": require.resolve("react-native"),
  },
};
