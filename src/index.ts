import { NativeModules, Platform, StatusBar } from 'react-native';

declare global {
  var nativeStatusBarHeightSpec: boolean;
}

const LINKING_ERROR =
  `The package 'react-native-status-bar-height' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const { StatusBarHeight } = NativeModules;

// Check if we're using the new architecture (Turbo Modules)
if (global.nativeStatusBarHeightSpec) {
  StatusBarHeight = require('./NativeStatusBarHeight').default;
} else {
  // Fall back to the old architecture
  StatusBarHeight = NativeModules.StatusBarHeight
    ? NativeModules.StatusBarHeight
    : new Proxy(
        {},
        {
          get() {
            throw new Error(LINKING_ERROR);
          },
        }
      );
}

export function getStatusBarHeight(skipAndroid: boolean = false): Promise<number> {
  // Return 0 for Android when skipAndroid is true
  if (Platform.OS === 'android' && skipAndroid) {
    return Promise.resolve(0);
  }

  if (!StatusBarHeight) {
    return Promise.reject(
      new Error('react-native-status-bar-height module doesn\'t seem to be linked.')
    );
  }

  return StatusBarHeight.getHeight();
} 