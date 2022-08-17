import React, {useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Navigation} from 'react-native-navigation';

export const SideMenu = props => {
  return (
    <View style={styles.view}>
      <Text>侧边栏</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    width: '30%',
    height: '100%',
    backgroundColor: '#ffffff',
  },
});
