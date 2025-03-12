#import <React/RCTUtils.h>
#import <UIKit/UIKit.h>
#import "StatusBarHeightModule.h"

@implementation StatusBarHeightModule

RCT_EXPORT_MODULE()

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeStatusBarHeightSpecJSI>(params.jsInvoker);
}

- (facebook::jsi::Value)getHeight:(facebook::jsi::Runtime &)rt
{
    float statusBarHeight;
    if (@available(iOS 13.0, *)) {
        UIWindowScene *windowScene = (UIWindowScene *)[UIApplication sharedApplication].connectedScenes.allObjects.firstObject;
        statusBarHeight = windowScene.statusBarManager.statusBarFrame.size.height;
    } else {
        statusBarHeight = [UIApplication sharedApplication].statusBarFrame.size.height;
    }
    return facebook::jsi::Value(statusBarHeight);
}

// For backward compatibility with the old architecture
RCT_EXPORT_METHOD(getHeight:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    float statusBarHeight;
    if (@available(iOS 13.0, *)) {
        UIWindowScene *windowScene = (UIWindowScene *)[UIApplication sharedApplication].connectedScenes.allObjects.firstObject;
        statusBarHeight = windowScene.statusBarManager.statusBarFrame.size.height;
    } else {
        statusBarHeight = [UIApplication sharedApplication].statusBarFrame.size.height;
    }
    resolve(@(statusBarHeight));
}

@end 