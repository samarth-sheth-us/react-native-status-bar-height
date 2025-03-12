#import "StatusBarHeightModule.h"
#import <React/RCTUtils.h>

@implementation StatusBarHeightModule

RCT_EXPORT_MODULE()

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