import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

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
      color: DarkBlue,
    },
    background: {
      color: White,
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
    backgroundColor: White,
  },
  font: {
    fontSize: 30,
    color: DarkBlue,
    textAlign: 'center',
  },
});
