#import "StatusBarHeight.h"
#import <UIKit/UIKit.h>

@implementation StatusBarHeight

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(getHeight:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        float statusBarHeight = [[UIApplication sharedApplication] statusBarFrame].size.height;
        resolve(@(statusBarHeight));
    });
}

@end 