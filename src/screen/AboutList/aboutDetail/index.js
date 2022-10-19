import React, {useEffect, useMemo, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  SafeAreaView,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
import {styles} from './styles';
import Toast from 'react-native-toast-message';

export const AboutDetail = props => {
  const [info, setSearching] = useState(false);

  const toastPress = () => {
    console.log('点击了状态栏');
  };

  const contentText = useMemo(() => {
    return (
      <ScrollView style={styles.devicesList}>
        <TouchableOpacity>
          <View>
            <Text>数据页面</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }, [deviceList, searching, connection]);

  return (
    <SafeAreaView style={styles.container}>
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
