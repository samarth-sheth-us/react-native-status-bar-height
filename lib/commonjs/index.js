"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStatusBarHeight = getStatusBarHeight;
var _reactNative = require("react-native");
const LINKING_ERROR = `The package 'react-native-status-bar-height' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ""
}) + "- You rebuilt the app after installing the package\n" + "- You are not using Expo Go\n";
let {
  StatusBarHeight
} = _reactNative.NativeModules;

// Check if we're using the new architecture (Turbo Modules)
if (global.nativeStatusBarHeightSpec) {
  StatusBarHeight = require("./NativeStatusBarHeight").default;
} else {
  // Fall back to the old architecture
  StatusBarHeight = _reactNative.NativeModules.StatusBarHeight ? _reactNative.NativeModules.StatusBarHeight : new Proxy({}, {
    get() {
      throw new Error(LINKING_ERROR);
    }
  });
}
function getStatusBarHeight(skipAndroid = false) {
  // Return 0 for Android when skipAndroid is true
  if (_reactNative.Platform.OS === "android" && skipAndroid) {
    return Promise.resolve(0);
  }
  if (!StatusBarHeight) {
    return Promise.reject(new Error("react-native-status-bar-height module doesn't seem to be linked."));
  }
  return StatusBarHeight.getHeight();
}
//# sourceMappingURL=index.js.map