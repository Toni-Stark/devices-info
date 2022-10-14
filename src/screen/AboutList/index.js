import React, {useEffect, useMemo, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  MaskedViewIOS,
  ScrollView,
  SafeAreaView,
  Modal,
  Alert,
} from 'react-native';
import {styles} from './styles';

const DarkBlue = '#30a2c4';
const White = '#ffffff';

let manager = '';
let timer = '';

// BleManager.start({showAlert: false}).then(() => {
//   // Success code
//   console.log('Module initialized');
// });

export const AboutList = props => {
  const [isConnected, setIsConnected] = useState(false);
  const [isBleOpen, setIsBleOpen] = useState(false);
  const [deviceList, setDeviceList] = useState([]);
  const [searching, setSearching] = useState(false);

  const hasAndroidPermission = async () => {
    const permissions = [
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ];
    const granteds = await PermissionsAndroid.requestMultiple(permissions);
    if (
      granteds['android.permission.ACCESS_FINE_LOCATION'] === 'granted' &&
      granteds['android.permission.ACCESS_COARSE_LOCATION'] === 'granted'
    ) {
      return true;
    } else {
      Modal.alert(
        '请开启定位权限',
        '请开启获取手机位置服务，否则系统部分功能将无法使用',
        [
          {
            text: '开启',
            onPress: () => {
              console.log('点击开启按钮');
              if (
                granteds['android.permission.ACCESS_FINE_LOCATION'] ===
                  'never_ask_again' &&
                granteds['android.permission.ACCESS_COARSE_LOCATION'] ===
                  'never_ask_again'
              ) {
                Alert.alert(
                  '警告',
                  '您将应用获取手机定位的权限设为拒绝且不再询问，功能无法使用!' +
                    '想要重新打开权限，请到手机-设置-权限管理中允许[你的应用名称]app对该权限的获取',
                );
                return false;
              } else {
                //短时间第二次可以唤醒再次请求权限框，但是选项会从拒绝变为拒绝且不再询，如果选择该项则无法再唤起请求权限框
                // getPositionInit();
              }
            },
          },
          {
            text: '拒绝授权',
            onPress: () => {
              return false;
            },
          },
        ],
      );
    }
  };
  // 获取蓝牙开启状态
  const NoticeStateChange = manager => {};

  const Init = () => {
    manager = new BleManager();
    console.log('蓝牙已初始化');
    NoticeStateChange(manager);
  };

  const OpenBlueTooth = async () => {
    CloseBlueTooth();
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }
    Init();
  };
  const CloseBlueTooth = () => {
    setSearching(false);
  };

  const controlBtns = useMemo(() => {
    return (
      <View style={styles.controlView}>
        <TouchableOpacity style={styles.button} onPress={OpenBlueTooth}>
          <Text>搜索附件蓝牙设备</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.right]}
          onPress={CloseBlueTooth}>
          <Text>关闭蓝牙</Text>
        </TouchableOpacity>
      </View>
    );
  }, []);

  const contentText = useMemo(() => {
    return (
      <ScrollView style={styles.devicesList}>
        {deviceList?.map((item, index) => {
          return (
            <View
              style={styles.devicesItem}
              key={(index + Math.ceil(Math.random() * 10000)).toString()}>
              <View style={styles.contentView}>
                <View style={styles.labelView}>
                  <Text style={styles.textSpan}>设备名称：{item.name}</Text>
                  <Text style={styles.textSpan}>设备ID：{item.id}</Text>
                </View>
                <View style={styles.btnView}>
                  <TouchableOpacity style={styles.btn} onPress={() => {}}>
                    <Text>连接</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.textView}>
                <Text style={styles.textSpan}>RSSI: {item.rssi}</Text>
                <Text style={styles.textSpan}>
                  最大传输单元: {item.mtu}byte
                </Text>
              </View>
            </View>
          );
        })}
        {searching ? <Text style={styles.loading}>搜索中...</Text> : null}
      </ScrollView>
    );
  }, [deviceList, searching]);

  return (
    <SafeAreaView style={styles.container}>
      {controlBtns}
      {contentText}
    </SafeAreaView>
  );
};
AboutList.options = {
  topBar: {
    title: {
      text: '蓝牙连接',
      color: DarkBlue,
    },
    background: {
      color: White,
    },
  },
  bottomTab: {
    text: '蓝牙',
  },
};
