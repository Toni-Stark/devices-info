import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-toast-message';

const DarkBlue = '#30a2c4';
const White = '#ffffff';

export const Tools = props => {
  return <View style={styles.root}></View>;
};
Tools.options = {
  topBar: {
    title: {
      text: '展示卡片',
      color: DarkBlue,
    },
    background: {
      color: White,
    },
  },
  bottomTab: {
    text: '展示框',
  },
};
const styles = StyleSheet.create({
  root: {
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
