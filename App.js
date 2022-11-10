import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

import {
  getUniqueId,
  getDeviceId,
  getSystemName,
  getSystemVersion,
  isTablet,
  getBrand,
  getModel,
  getDeviceType,
  getManufacturerSync,
  getBuildIdSync,
  isCameraPresentSync,
  getDeviceNameSync,
  getUsedMemorySync,
  getInstanceIdSync,
  getInstallReferrerSync,
  getInstallerPackageNameSync,
  isEmulatorSync,
  getFontScaleSync,
  hasNotch,
  getFirstInstallTimeSync,
  getLastUpdateTimeSync,
  getSerialNumberSync,
  getAndroidIdSync,
  getPhoneNumberSync,
  getApiLevelSync,
  getCarrierSync,
  getTotalMemorySync,
  getMaxMemorySync,
  getTotalDiskCapacitySync,
  getTotalDiskCapacityOldSync,
  getFreeDiskStorageSync,
  getFreeDiskStorageOldSync,
  getBatteryLevelSync,
  isLandscapeSync,
  isAirplaneModeSync,
  isBatteryChargingSync,
  isPinOrFingerprintSetSync,
  supportedAbisSync,
  hasSystemFeatureSync,
  getSystemAvailableFeaturesSync,
  getPowerStateSync,
  isLocationEnabledSync,
  isHeadphonesConnectedSync,
  getAvailableLocationProvidersSync,
  getBootloaderSync,
  getDeviceSync,
  getDisplaySync,
  getFingerprintSync,
  getHardwareSync,
  getHostSync,
  getProductSync,
  getTagsSync,
  getTypeSync,
  getBaseOsSync,
  getPreviewSdkIntSync,
  getSecurityPatchSync,
  getCodenameSync,
  getIncrementalSync,
  supported32BitAbisSync,
  supported64BitAbisSync,
  hasGmsSync,
  hasHmsSync,
  isMouseConnectedSync,
  isKeyboardConnectedSync,
  getUserAgent,
} from 'react-native-device-info';
import SplashScreen from 'react-native-splash-screen';

const App: () => Node = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <App />;
};
const styles = StyleSheet.create({
  safeArea: {
    height: '100%',
  },
});

export default App;
