package com.statusbarheight;

import android.content.res.Resources;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.turbomodule.core.CallInvokerHolderImpl;
import com.facebook.react.turbomodule.core.interfaces.TurboModule;

@ReactModule(name = StatusBarHeightModule.NAME)
public class StatusBarHeightModule extends NativeStatusBarHeightSpec implements TurboModule {
    public static final String NAME = "StatusBarHeight";
    private final ReactApplicationContext reactContext;

    public StatusBarHeightModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return NAME;
    }

    @Override
    public double getHeight() {
        Resources resources = this.reactContext.getResources();
        int resourceId = resources.getIdentifier("status_bar_height", "dimen", "android");
        if (resourceId > 0) {
            return resources.getDimensionPixelSize(resourceId);
        }
        return 0;
    }

    // For backward compatibility with the old architecture
    public void getHeight(Promise promise) {
        try {
            double height = getHeight();
            promise.resolve(height);
        } catch (Exception e) {
            promise.reject("ERROR", "Could not get status bar height", e);
        }
    }
} 