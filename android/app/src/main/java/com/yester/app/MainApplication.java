package com.yester.app;

import android.app.Application;
import android.util.Log;

import com.facebook.react.PackageList;
import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.bridge.JavaScriptExecutorFactory;
import com.facebook.react.ReactApplication;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.segment.analytics.reactnative.core.RNAnalyticsPackage;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import com.reactlibrary.RNPurchasesPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.babisoft.ReactNativeLocalization.ReactNativeLocalizationPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.amazonaws.RNAWSCognitoPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      // packages.add(new MainReactPackage());
      // packages.add(new RNDeviceInfo());
      // packages.add(new RNAnalyticsPackage());
      // packages.add(new ReactNativeOneSignalPackage());
      // packages.add(new RNPurchasesPackage());
      // packages.add(new SplashScreenReactPackage());
      // packages.add(new RNAWSCognitoPackage());
      // packages.add(new FBSDKPackage());
      // packages.add(new ReactNativeLocalizationPackage());
      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
