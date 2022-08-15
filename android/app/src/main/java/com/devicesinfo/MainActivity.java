package com.devicesinfo;
import android.os.Bundle;
import com.reactnativenavigation.NavigationActivity;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends NavigationActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
      SplashScreen.show(this);  // here
//       SplashScreen.show(this, R.style.SplashScreenTheme);  // here
      super.onCreate(savedInstanceState);
  }
  
}
