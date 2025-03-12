package com.statusbarheight;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.turbomodule.core.interfaces.TurboModule;
import com.facebook.react.bridge.Promise;

abstract class NativeStatusBarHeightSpec extends ReactContextBaseJavaModule implements TurboModule {
    NativeStatusBarHeightSpec(ReactApplicationContext context) {
        super(context);
    }

    abstract double getHeight();
} 