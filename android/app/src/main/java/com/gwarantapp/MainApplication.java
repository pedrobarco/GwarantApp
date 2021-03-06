package com.gwarantapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.tradle.react.UdpSocketsModule;
import com.peel.react.TcpSocketsModule;
import com.pusherman.networkinfo.RNNetworkInfoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.bitgo.randombytes.RandomBytesPackage;
import com.reactlibrary.securekeystore.RNSecureKeyStorePackage;
import com.RNRSA.RNRSAPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new UdpSocketsModule(),
            new TcpSocketsModule(),
			new RNNetworkInfoPackage(),
            new VectorIconsPackage(),
            new RandomBytesPackage(),
            new RNSecureKeyStorePackage(),
            new RNRSAPackage(),
            new RCTCameraPackage()
      );
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
