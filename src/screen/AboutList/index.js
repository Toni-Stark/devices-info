import React, {useEffect, useMemo, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  ScrollView,
  SafeAreaView,
  Modal,
  Alert,
  Platform,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
import {styles} from './styles';
import BleManager, {getDiscoveredPeripherals} from 'react-native-ble-manager';
import Toast from 'react-native-toast-message';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const DarkBlue = '#30a2c4';
const White = '#ffffff';

let manager = '';

export const AboutList = props => {
  const [searching, setSearching] = useState(false);
  const [deviceList, setDeviceList] = useState([]);
  const [connection, setConnection] = useState(0);

  const hasAndroidPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ).then(result => {
        if (result) {
          setSearching(true);
          startScan();
        } else {
          PermissionsAndroid.requestPermission(
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          ).then(result => {
            if (result) {
              console.log('User accept');
            } else {
              console.log('User refuse');
            }
          });
        }
      });
    }
  };
  // 获取蓝牙开启状态
  const NoticeStateChange = () => {};

  const startScan = () => {
    BleManager.scan([], 30, false).then(results => {
      console.log('Scanning...end');
    });
  };

  // 获取蓝牙信息列表
  let messageList = [];
  let timer = null;
  const handleDiscoverPeripheral = device => {
    if (device?.name) {
      console.log('Got ble peripheral', device);
      if (messageList.length > 0) {
        let index = messageList.findIndex(item => item?.name === device?.name);
        if (index < 0) {
          messageList.push(device);
        } else {
          messageList[index] = device;
        }
      } else {
        messageList = [device];
      }
      timer && clearTimeout(timer);
      timer = setTimeout(() => {
        setDeviceList(messageList);
      }, 1500);
    }
  };
  const handleStopScan = () => {
    console.log('Scan is stopped');
    setSearching(false);
  };
  const handleDisconnectedPeripheral = data => {
    console.log('Disconnected from ', data);
  };
  const handleUpdateValueForCharacteristic = data => {
    console.log('Received data from ' + data);
  };

  useEffect(() => {
    bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      handleDiscoverPeripheral,
    );
    bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);
    bleManagerEmitter.addListener(
      'BleManagerDisconnectPeripheral',
      handleDisconnectedPeripheral,
    );
    bleManagerEmitter.addListener(
      'BleManagerDidUpdateValueForCharacteristic',
      handleUpdateValueForCharacteristic,
    );
  }, []);

  const OpenBlueTooth = async () => {
    CloseBlueTooth();
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      BleManager.start({showAlert: true});
    }
  };
  const CloseBlueTooth = () => {
    setSearching(false);
  };

  const connectItem = (item, index) => {
    if (connection !== index + 1) {
      BleManager.connect(item.id)
        .then(res => {
          Toast.show({text1: `成功连接${item.name}`});
          setConnection(index + 1);
          console.log('Connected');
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      Toast.show({
        text1: '不能重复连接',
      });
    }
  };

  const naviToListen = item => {
    BleManager.retrieveServices(item.id).then(deviceInfo => {
      // Success code
      console.log('Peripheral info:', deviceInfo.characteristics[12]);
      // BleManager.write(
      //   item.id,
      //   deviceInfo.services[3].uuid,
      //   deviceInfo.characteristics[12].service,
      //   [0],
      // ).then(() => {});
      BleManager.startNotification(
        deviceInfo.id,
        'a149b002-fd80-47c2-a5e1-cb26b44667a7',
        '0000fdee-0000-1000-8000-00805f9b34fb',
      )
        .then(() => {
          // Success code
          console.log('Notification started');
        })
        .catch(error => {
          // Failure code
          console.log('listen-----', error);
        });
    });
  };

  const refreshListen = item => {
    BleManager.refreshCache(item.id)
      .then(deviceInfo => {
        // Success code
        Toast.show({
          text1: '连接正常',
        });

        BleManager.retrieveServices(item.id).then(deviceInfo => {
          // Success code
          console.log('Peripheral info:', deviceInfo.characteristics[12]);
          BleManager.write(
            item.id,
            'a149b002-fd80-47c2-a5e1-cb26b44667a7',
            '0000fdee-0000-1000-8000-00805f9b34fb',
            [0],
          ).then(() => {});
        });

        console.log('cache refreshed!', deviceInfo);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const toastPress = () => {
    console.log('点击了状态栏');
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
              </View>
              <View style={styles.textView}>
                <Text style={styles.textSpan}>RSSI: {item.rssi}</Text>
                <Text style={styles.textSpan}>
                  最大传输单元: {item.mtu}byte
                </Text>
              </View>
              <View style={styles.btnsList}>
                <View style={styles.btnView}>
                  {connection === index + 1 ? (
                    <TouchableOpacity
                      style={[styles.btn]}
                      onPress={() => {
                        naviToListen(item);
                      }}>
                      <Text style={[styles.defaultText]}>监听</Text>
                    </TouchableOpacity>
                  ) : null}

                  <TouchableOpacity
                    style={[
                      connection === index + 1 ? styles.currentBtn : styles.btn,
                      styles.right,
                    ]}
                    onPress={() => {
                      connectItem(item, index);
                    }}>
                    <Text
                      style={[
                        connection === index + 1
                          ? styles.currentText
                          : styles.defaultText,
                      ]}>
                      {connection === index + 1 ? '已连接' : '连接'}
                    </Text>
                  </TouchableOpacity>

                  {connection === index + 1 ? (
                    <TouchableOpacity
                      style={[styles.btn, styles.right]}
                      onPress={() => {
                        refreshListen(item);
                      }}>
                      <Text style={[styles.defaultText]}>刷新</Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            </View>
          );
        })}
        {searching ? <Text style={styles.loading}>搜索中...</Text> : null}
      </ScrollView>
    );
  }, [deviceList, searching, connection]);

  return (
    <SafeAreaView style={styles.container}>
      {controlBtns}
      {contentText}
      <Toast onPress={toastPress} />
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
