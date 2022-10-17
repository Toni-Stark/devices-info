import React, {useEffect, useMemo, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  MaskedViewIOS,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {ActiveNavi} from '../../common/activeTools';
import {BleManager} from 'react-native-ble-plx';
import {styles} from './styles';
import Toast from 'react-native-toast-message';

const DarkBlue = '#30a2c4';
const White = '#ffffff';

let manager = '';
let timer = '';

export const AboutList = props => {
  const [isConnected, setIsConnected] = useState(false);
  const [isBleOpen, setIsBleOpen] = useState(false);
  const [deviceList, setDeviceList] = useState([]);
  const [searching, setSearching] = useState(false);
  const [macId, setMacId] = useState('');
  const [writeId, setWriteId] = useState('');
  const [notifyId, setNotifyId] = useState('');
  const [responseData, setResponseData] = useState({});

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
                getPositionInit();
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
  const NoticeStateChange = manager => {
    manager.onStateChange(state => {
      console.log('蓝牙状态===', state);
      if (state === 'PoweredOff') {
        setIsConnected(false);
        setIsBleOpen(false);
        alert('蓝牙关闭状态');
      }
      if (state === 'PoweredOn') {
        setIsBleOpen(true);
      }
    }, true);
  };
  const DisconnectBle = devices_id => {
    if (!devices_id) {
      return;
    }
    manager
      .cancelDeviceConnection(devices_id)
      .then(res => {
        console.warn('disconnect success', res);
        setIsConnected(false);
      })
      .catch(err => {
        console.warn('disconnect fail', err);
        alert(' Bluetooth disconnection failed :', err);
      });
  };

  const onDisconnect = () => {
    manager.onDeviceDisconnected(macId, (error, device) => {
      if (error) {
        //蓝牙遇到错误自动断开
        console.log('onDeviceDisconnected', 'device disconnect', error);
      } else {
        console.log('蓝牙连接状态', device);
      }
    });
  };

  const GetCharacterIdNotify = (
    devices_id,
    server_uuid,
    successCallback,
    errorCallback,
    devices_name,
  ) => {
    manager.characteristicsForDevice(devices_id, server_uuid).then(
      data => {
        console.log('characteristics list: ', data);
        setWriteId(data[0].serviceUUID); //写入id
        setNotifyId(data[0].uuid); //接收id
        StartNoticeBle(devices_id, data[0].serviceUUID, data[0].uuid);
        onDisconnect(devices_id);
        successCallback(
          devices_id,
          data[0].serviceUUID,
          data[0].uuid,
          devices_name,
        );
      },
      err => {
        console.log('characteristics list fail:', err);
        errorCallback(err);
      },
    );
  };
  const StartNoticeBle = (devices_id, writeId, notifyId) => {
    console.log('开始数据接收监听', macId, writeId, notifyId);
    manager.monitorCharacteristicForDevice(
      devices_id,
      writeId,
      notifyId,
      (error, characteristic) => {
        if (error) {
          setIsConnected(false);
          DisconnectBle(devices_id);
        } else {
          let resData = Buffer.from(characteristic.value, 'base64').toString(
            'hex',
          );
          console.log('ble response hex data:', resData);
          setResponseData(resData);
        }
      },
      'monitor',
    );
  };

  const ConnectBle = (macId, successCallback, errorCallback) => {
    if (isConnected) {
      alert('Only one Bluetooth can be connected ');
      errorCallback('device is already connected');
    } else {
      console.log(macId);
      manager
        .connectToDevice(macId, {
          autoConnect: true,
          timeout: 1000000,
        })
        .then(device => {
          setIsConnected(true);
          // 查找设备的所有服务、特征和描述符。
          manager
            .discoverAllServicesAndCharacteristicsForDevice(device.id)
            .then(
              data => {
                GetServiceId(device, successCallback, errorCallback);
              },
              err =>
                console.log(
                  'get all available services and characteristics device fail : ',
                  err,
                ),
            );
        })
        .catch(err => {
          console.log(err, '连接失败');
          console.log('connect fail===', err);
          return;
          // errorCallback(err);
        });
    }
  };

  const GetServiceId = (device, successCallback, errorCallback) => {
    manager.servicesForDevice(device.id).then(
      data => {
        // 为设备发现的服务id对象数组
        setMacId(device.id);
        let server_uuid = data[2].uuid;
        GetCharacterIdNotify(
          device.id,
          server_uuid,
          successCallback,
          errorCallback,
          device.name,
        );
      },
      err => console.log('services list fail===', err),
    );
  };
  const getServiceId = item => {
    ListeningItem();
    // manager.servicesForDevice('0000fdee-0000-1000-8000-00805f9b34fbr').then(
    //   data => {
    //     console.log('services list: ', data);
    //     this.GetCharacterIdNotify(server_uuid, successCallback, errorCallback);
    //   },
    //   err => console.log('services list fail===', err),
    // );
    // ListeningItem()
  };
  const ListeningItem = item => {
    manager
      .characteristicsForDevice(
        'CC:81:2A:E6:86:F2',
        '0000fd92-0000-1000-8000-00805f9b34fb',
      )
      .then(
        data => {
          console.log('characte ', data);
        },
        err => {
          console.log('characteristics list fail:', err);
          errorCallback(err);
        },
      );
  };

  const ConnectItem = item => {
    ConnectBle(
      item,
      device => {
        successCallback('log-------------------');
        successCallback(device);
        successCallback('log-------------------');
        Toast.show({
          text1: '连接成功',
          text2: device,
        });
      },
      err => {
        console.log('连接失败===', err);
      },
    );
  };
  let times = 0;
  const SearchBle = (
    deviceName,
    successCallback,
    errorCallback,
    seconds = 5000,
  ) => {
    // timer && clearTimeout(timer);
    console.log('开始搜索=====>>>>>');
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        errorCallback(error);
        return;
      }
      console.log('log-------------', device.name);
      if (device.name) {
        console.log('log-------------', device.name, '||||', deviceName);
      }
      // if (device.name === deviceName && device?.serviceUUIDs !== null) {
      // if (device.name === deviceName) {
      // if (device.name) {
      //   successCallback(device);
      //   timer = 0;
      //   setSearching(false);
      //   CloseBlueTooth();
      //   timer && clearTimeout(timer);
      // }

      if (device.name) {
        successCallback(device);
      }
    });
    if (isBleOpen) {
      timer = setTimeout(() => {
        console.warn('扫描结束====停止扫描');
        successCallback(device_list);
        timer = 0;
        CloseBlueTooth();
      }, seconds);
    }
  };

  const Init = () => {
    console.log('蓝牙已初始化');
    NoticeStateChange(manager);
  };

  useEffect(() => {
    manager = new BleManager();
  }, []);

  const OpenBlueTooth = async () => {
    CloseBlueTooth();
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }
    Init();
    setSearching(true);
    let searchName = 'HUAWEI WATCH GT 2-250';
    // let searchName = 'vivo TWS 2e';
    let result = deviceList;
    let timer = null;
    let closeTimer = null;
    SearchBle(
      searchName,
      data => {
        console.log(times, data.name);
        if (times >= 5) {
          CloseBlueTooth();
        }
        if (data?.name) {
          if (result.length > 0) {
            let index = result.findIndex(item => item?.name === data?.name);
            if (index < 0) {
              times++;
              result.push(data);
              closeTimer && clearTimeout(closeTimer);
              closeTimer = setTimeout(() => {
                CloseBlueTooth();
              }, 5000);
            } else {
              result[index] = data;
            }
          } else {
            result = [data];
          }
          timer && clearTimeout(timer);
          timer = setTimeout(() => {
            console.log(result);
            setDeviceList(result);
          }, 2000);
        }
      },
      err => {
        console.log('搜索失败===', err);
      },
      5000,
    );
  };
  const CloseBlueTooth = async () => {
    // console.log(await manager.isDeviceConnected());

    setSearching(false);
    manager && manager?.stopDeviceScan();
  };

  const toastPress = () => {
    console.log('close');
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
              <View style={styles.labelView}>
                <Text style={styles.textSpan}>设备名称：{item.name}</Text>
                <Text style={styles.textSpan}>设备ID：{item.id}</Text>
              </View>
              <View style={styles.textView}>
                <Text style={styles.textSpan}>RSSI: {item.rssi}</Text>
                <Text style={styles.textSpan}>
                  最大传输单元: {item.mtu}byte
                </Text>
              </View>
              <View style={styles.btnView}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    ConnectItem(item.id);
                  }}>
                  <Text>连接</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.btn, styles.left, styles.regBtn]}
                  onPress={() => {
                    manager.isDeviceConnected(item.id).then(res => {
                      alert(res);
                    });
                  }}>
                  <Text>验证</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
        {searching ? <Text style={styles.loading}>搜索中...</Text> : null}
        <TouchableOpacity
          style={[styles.btn, styles.left]}
          onPress={() => {
            getServiceId();
          }}>
          <Text>监听</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }, [deviceList, searching]);

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
