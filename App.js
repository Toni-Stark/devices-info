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
  const GetGB = num => {
    return Math.ceil(num / 1024 / 1024 / 1024) + 'GB';
  };
  const getPoint = num => {
    return num * 100 + '%';
  };
  const DevicesInfo = async () => {
    let DeviceType = getDeviceType();
    return {
      title: '系统信息',
      data: {
        设备ID: getDeviceId(),
        系统名称: getSystemName(),
        系统版本: getSystemVersion(),
        // 可读版本: getReadableVersion(),
        是平板吗: isTablet() ? '是' : '否',
        设备品牌: getBrand(),
        设备型号: getModel(),
        设备类型: DeviceType === 'Handset' ? '移动电话' : DeviceType,
      },
    };
  };
  const SyncInfo = async () => {
    return {
      title: '硬件参数',
      data: {
        制造商: getManufacturerSync(),
        生产标识: getBuildIdSync(),
        摄像头: isCameraPresentSync() ? '有' : '无',
        蓝牙名称: getDeviceNameSync(),
        内存型号: getUsedMemorySync(),
        实例ID: getInstanceIdSync(),
        安装渠道: getInstallReferrerSync(),
        模拟器: isEmulatorSync() ? '是' : '否',
        字体比例: getFontScaleSync(),
        刘海屏: hasNotch() ? '是' : '否',
        androidId: getAndroidIdSync(),
        代理商: await getUserAgent(),
        设备唯一ID: await getUniqueId(),
        // phoneNumber: getPhoneNumberSync(),
        SDK版本: getApiLevelSync(),
        运营商: getCarrierSync(),
        运行内存: GetGB(getTotalMemorySync()),
        剩余运行内存: GetGB(getTotalDiskCapacityOldSync()),
        缓存空间: GetGB(getMaxMemorySync()),
        储存空间: GetGB(getTotalDiskCapacitySync()),
        剩余储存空间: GetGB(getFreeDiskStorageSync()),
        // freeDiskStorageOld: GetGB(getFreeDiskStorageOldSync()),
        电池电量: getPoint(getBatteryLevelSync()),
        是否横屏: isLandscapeSync() ? '是' : '否',
        飞行模式: isAirplaneModeSync() ? '是' : '否',
        充电状态: isBatteryChargingSync() ? '是' : '否',
        指纹锁: isPinOrFingerprintSetSync() ? '是' : '否',
        支持的处理器架构版本列表: supportedAbisSync(),
        特定系统功能: hasSystemFeatureSync('android.software.webview')
          ? '是'
          : '否',
        android可用系统功能: getSystemAvailableFeaturesSync(),
        定位服务: isLocationEnabledSync() ? '是' : '否',
        连接耳机: isHeadphonesConnectedSync() ? '是' : '否',
        设计名称: getDeviceSync(),
        构建字段: getDisplaySync(),
        标识字符串: getFingerprintSync(),
        硬件名称: getHardwareSync(),
        主机名: getHostSync(),
        产品名称: getProductSync(),
        设备标签: getTagsSync(),
        安全补丁级别: getSecurityPatchSync(),
        开发代号: getCodenameSync(),
        构建内部值: getIncrementalSync(),
        设备支持的32位ABI有序列表: supported32BitAbisSync(),
        设备支持的64位ABI有序列表: supported64BitAbisSync(),
        是否支持Google服务: hasGmsSync() ? '是' : '否',
        是否支持华为移动服务: hasHmsSync() ? '是' : '否',
        是否连接了鼠标: isMouseConnectedSync(),
        是否连接了键盘: isKeyboardConnectedSync(),
      },
    };
  };
  const HooksInfo = async () => {
    return {
      title: '设备信息 Hooks',
      data: {
        manufacturer: getManufacturerSync(),
        buildId: getBuildIdSync(),
        isCameraPresent: isCameraPresentSync(),
        deviceName: getDeviceNameSync(),
        usedMemory: getUsedMemorySync(),
        instanceId: getInstanceIdSync(),
        installReferrer: getInstallReferrerSync(),
        installerPackageName: getInstallerPackageNameSync(),
        isEmulator: isEmulatorSync(),
        fontScale: getFontScaleSync(),
        hasNotch: hasNotch(),
        firstInstallTime: getFirstInstallTimeSync(),
        lastUpdateTime: getLastUpdateTimeSync(),
        serialNumber: getSerialNumberSync(),
        androidId: getAndroidIdSync(),
        phoneNumber: getPhoneNumberSync(),
        ApiLevel: getApiLevelSync(),
        carrier: getCarrierSync(),
        totalMemory: getTotalMemorySync(),
        maxMemory: getMaxMemorySync(),
        totalDiskCapacity: getTotalDiskCapacitySync(),
        totalDiskCapacityOld: getTotalDiskCapacityOldSync(),
        freeDiskStorage: getFreeDiskStorageSync(),
        freeDiskStorageOld: getFreeDiskStorageOldSync(),
        batteryLevel: getBatteryLevelSync(),
        isLandscape: isLandscapeSync(),
        isAirplaneMode: isAirplaneModeSync(),
        isBatteryCharging: isBatteryChargingSync(),
        isPinOrFingerprintSet: isPinOrFingerprintSetSync(),
        supportedAbis: supportedAbisSync(),
        hasSystemFeature: hasSystemFeatureSync('android.software.webview'),
        getSystemAvailableFeatures: getSystemAvailableFeaturesSync(),
        powerState: getPowerStateSync(),
        isLocationEnabled: isLocationEnabledSync(),
        headphones: isHeadphonesConnectedSync(),
        getAvailableLocationProviders: getAvailableLocationProvidersSync(),
        bootloader: getBootloaderSync(),
        device: getDeviceSync(),
        display: getDisplaySync(),
        fingerprint: getFingerprintSync(),
        hardware: getHardwareSync(),
        host: getHostSync(),
        product: getProductSync(),
        tags: getTagsSync(),
        type: getTypeSync(),
        baseOS: getBaseOsSync(),
        previewSdkInt: getPreviewSdkIntSync(),
        securityPatch: getSecurityPatchSync(),
        codename: getCodenameSync(),
        incremental: getIncrementalSync(),
        supported32BitAbis: supported32BitAbisSync(),
        supported64BitAbis: supported64BitAbisSync(),
        hasGms: hasGmsSync(),
        hasHms: hasHmsSync(),
        isMouseConnected: isMouseConnectedSync(),
        isKeyboardConnected: isKeyboardConnectedSync(),
      },
    };
  };
  const GetBar = () => [
    {
      title: '系统信息',
      type: 'devices',
    },
    {
      title: '硬件参数',
      type: 'await',
    },
    // {
    //   title: 'Async',
    //   type: 'async',
    // },
    // {
    //   title: 'Hooks',
    //   type: 'hooks',
    // },
  ];

  const isDarkMode = useColorScheme() === 'dark';
  const [devicesInfo, setDevicesInfo] = useState({});
  const [btnType, setBtnType] = useState('devices');

  const getInfo = useCallback(async type => {
    switch (type) {
      case 'devices':
        return await DevicesInfo();
      case 'await':
        return await SyncInfo();
      case 'hooks':
        return await HooksInfo();
    }
  }, []);

  useEffect(() => {
    SplashScreen.hide();
    (async () => {
      setDevicesInfo(await getInfo('devices'));
    })();
  }, []);

  const checkTab = async e => {
    setBtnType(e);
    let params = await getInfo(e);
    // Toast.show({
    //   type: 'success',
    //   text1: 'Hello',
    //   text2: params.title,
    // });
    setDevicesInfo(params);
  };

  const TextItem = ({data}) => {
    const {keys, value} = data;
    return (
      <View style={styles.sectionItem}>
        <Text style={styles.sectionLabel}>{keys}： </Text>
        <Text style={styles.sectionItemText}>{value}</Text>
      </View>
    );
  };

  const useCurrentContext = info => {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{info.title}</Text>
        <View style={styles.sectionDescription}>
          {info.data &&
            Object.keys(info.data).map((item, index) => {
              if (typeof info.data[item] !== 'object') {
                return (
                  <TextItem
                    key={index}
                    data={{
                      keys: item,
                      value: info.data[item].toString(),
                    }}
                  />
                );
              } else if (Array.isArray(info.data[item])) {
                return (
                  <View key={index} style={styles.sectionWrapItem}>
                    <Text style={[styles.sectionLabel, {borderRadius: 8}]}>
                      {item}：
                    </Text>
                    <View style={styles.sectionItemWrap}>
                      {info.data[item].map((itemChild, indexChild) => {
                        return (
                          <Text
                            key={indexChild}
                            style={styles.sectionArrayLabel}>
                            {itemChild}
                          </Text>
                        );
                      })}
                    </View>
                  </View>
                );
              } else {
                return (
                  <View key={index} style={styles.sectionWrapItem}>
                    <Text style={[styles.sectionLabel, {borderRadius: 8}]}>
                      {item}
                    </Text>
                    {Object.keys(info.data[item]).map(
                      (itemKeys, indexChild) => {
                        return (
                          <TextItem
                            key={indexChild}
                            data={{
                              keys: itemKeys,
                              value: info.data[item][itemKeys],
                            }}
                          />
                        );
                      },
                    )}
                  </View>
                );
              }
            })}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} />
      <ScrollView>{useCurrentContext(devicesInfo)}</ScrollView>
      <View style={styles.tabBarStyle}>
        {GetBar().map((item, index) => {
          return (
            <TouchableWithoutFeedback
              activeOpacity={0.6}
              key={index}
              style={[
                styles.opacity,
                item.type === btnType ? styles.opacityActive : null,
              ]}
              onPress={async () => {
                await checkTab(item.type);
              }}>
              <Text
                style={
                  item.type === btnType
                    ? styles.activeBtnStyle
                    : styles.btnStyle
                }>
                {item.title}
              </Text>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
      <Toast />
    </SafeAreaView>
  );
};

const DarkBlue = 'rgba(48,162,196,0.82)';
const GrayBlue = '#8eb3c4';
const BlackBlue = '#215e69';
const Black = '#546585';
const White = '#ffffff';
// const DarkBlue = '#1f5d71';
// const GrayBlue = '#4e6366';
// const BlackBlue = '#071e21';
// const Black = '#282c35';

const styles = StyleSheet.create({
  safeArea: {
    height: '100%',
  },
  sectionContainer: {
    marginTop: 12,
    paddingHorizontal: 14,
    paddingBottom: 14,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  sectionItem: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
    paddingVertical: 5,
  },
  sectionItemText: {
    flex: 1,
    backgroundColor: GrayBlue,
    color: White,
    fontSize: 16,
    padding: 3,
    alignItems: 'center',
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
  sectionArrayLabel: {
    color: White,
  },
  sectionItemWrap: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 5,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: Black,
  },
  sectionWrapItem: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 5,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '400',
    backgroundColor: DarkBlue,
    color: White,
    padding: 3,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
  },
  tabBarStyle: {
    flexDirection: 'row',
    height: '6%',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 25,
    marginVertical: 25,
    padding: 5,
    borderWidth: 2,
    borderColor: DarkBlue,
    borderRadius: 20,
    backgroundColor: BlackBlue,
  },
  opacity: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  opacityActive: {
    backgroundColor: DarkBlue,
    borderRadius: 20,
  },
  btnStyle: {
    color: GrayBlue,
  },
  activeBtnStyle: {
    color: White,
  },
});

export default App;
