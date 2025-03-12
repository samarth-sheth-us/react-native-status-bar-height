import { NativeModules, Platform } from 'react-native';
import { getStatusBarHeight } from '../src';

describe('StatusBarHeight Module', () => {
  const originalStatusBarHeight = NativeModules.StatusBarHeight;
  const mockGetHeight = jest.fn().mockResolvedValue(20);

  beforeEach(() => {
    mockGetHeight.mockClear();
    (Platform.OS as any) = 'ios';
    NativeModules.StatusBarHeight = {
      getHeight: mockGetHeight,
    };
  });

  afterEach(() => {
    NativeModules.StatusBarHeight = originalStatusBarHeight;
  });

  it('should return status bar height for iOS', async () => {
    const height = await getStatusBarHeight();
    expect(height).toBe(20);
    expect(mockGetHeight).toHaveBeenCalledTimes(1);
  });

  it('should return status bar height for Android', async () => {
    (Platform.OS as any) = 'android';
    const height = await getStatusBarHeight();
    expect(height).toBe(20);
    expect(mockGetHeight).toHaveBeenCalledTimes(1);
  });

  it('should return 0 for Android when skipAndroid is true', async () => {
    (Platform.OS as any) = 'android';
    const height = await getStatusBarHeight(true);
    expect(height).toBe(0);
    expect(mockGetHeight).not.toHaveBeenCalled();
  });

  it('should handle native module errors on Android', async () => {
    (Platform.OS as any) = 'android';
    mockGetHeight.mockRejectedValueOnce(new Error('Native module error'));
    const height = await getStatusBarHeight();
    expect(height).toBe(24); // Should fall back to StatusBar.currentHeight
  });

  it('should throw error when native module is not linked', async () => {
    delete (NativeModules as any).StatusBarHeight;
    await expect(getStatusBarHeight()).rejects.toThrow(/doesn't seem to be linked/);
  });
}); 