import { NativeModules, Platform, StatusBar } from 'react-native';

declare global {
  var nativeStatusBarHeightSpec: boolean;
}

const LINKING_ERROR =
  `The package 'react-native-status-bar-height' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

let StatusBarHeight: { getHeight(): Promise<number> };

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

export async function getStatusBarHeight(skipAndroid: boolean = false): Promise<number> {
  // Handle iOS status bar height
  if (Platform.OS === 'ios') {
    return StatusBarHeight.getHeight();
  }
  
  // Handle Android status bar height
  if (Platform.OS === 'android' && !skipAndroid) {
    // First try to get height from native module
    try {
      return await StatusBarHeight.getHeight();
    } catch {
      // Fall back to StatusBar API if native module fails
      return StatusBar.currentHeight || 0;
    }
  }
  
  return 0;
} 