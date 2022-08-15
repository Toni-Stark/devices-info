import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-toast-message';

const DarkBlue = '#30a2c4';
const White = '#ffffff';
export const AdminInfo = props => {
  return (
    <View style={styles.safeArea}>
      <Text style={styles.font}>个人详情</Text>
    </View>
  );
};

AdminInfo.options = {
  topBar: {
    title: {
      text: '个人信息页',
      color: White,
    },
    background: {
      color: DarkBlue,
    },
  },
  bottomTab: {
    text: '我的',
  },
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: DarkBlue,
  },
  font: {
    fontSize: 30,
    color: White,
    textAlign: 'center',
  },
});
