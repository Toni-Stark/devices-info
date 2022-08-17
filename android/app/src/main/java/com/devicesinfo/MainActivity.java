package com.devicesinfo;
import android.os.Bundle;
import android.content.Intent;
import com.reactnativenavigation.NavigationActivity;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends NavigationActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
      SplashScreen.show(this, true);  // here
//       SplashScreen.show(this, R.style.SplashScreenTheme);  // here
      super.onCreate(savedInstanceState);
  }
   @Override
    public void onNewIntent(Intent intent) {
      super.onNewIntent(intent);
      setIntent(intent);
    }
}
