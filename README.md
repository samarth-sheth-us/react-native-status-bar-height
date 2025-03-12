# react-native-status-bar-height

A React Native plugin to get the status bar height for both iOS and Android devices.

## Installation

```sh
npm install react-native-status-bar-height
# or
yarn add react-native-status-bar-height
```

### iOS

```sh
cd ios && pod install
```

## Usage

```javascript
import { getStatusBarHeight } from "react-native-status-bar-height";

// Get status bar height
const statusBarHeight = getStatusBarHeight();

// Get status bar height (skip Android status bar height)
const statusBarHeight = getStatusBarHeight(true);
```

## Example

The example app demonstrates how to use the status bar height plugin in a real React Native application. It shows:

- Current platform detection
- Status bar height for the current device
- Platform-specific height values
- Visual representation of the status bar height

To run the example app:

1. Clone this repository
2. Install dependencies:

```sh
yarn install
cd example && yarn install
```

3. Run the example:

For iOS:

```sh
cd example/ios && pod install
cd .. && yarn ios
```

For Android:

```sh
yarn android
```

## API

### getStatusBarHeight(skipAndroid?: boolean)

Returns the height of the status bar.

#### Parameters:

- `skipAndroid` (optional): If true, returns 0 for Android devices. Defaults to false.

#### Returns:

- `number`: The height of the status bar in pixels.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
