import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {Navigation} from 'react-native-navigation';

const DarkBlue = '#30a2c4';
const White = '#ffffff';

export const HomeScreen = props => {
  return (
    <View style={styles.root}>
      <TouchableOpacity
        onPress={() => {
          Navigation.push(props.componentId, {
            component: {
              name: 'Admin',
              options: {
                topBar: {
                  title: {
                    text: '个人信息页',
                  },
                },
              },
            },
          });
        }}>
        <Text style={styles.font}>Hello React Native Navigation 👋</Text>
      </TouchableOpacity>
    </View>
  );
};
HomeScreen.options = {
  topBar: {
    title: {
      text: '首页',
      color: White,
    },
    background: {
      color: DarkBlue,
    },
  },
  bottomTab: {
    text: '首页',
  },
};
const styles = StyleSheet.create({
  root: {
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
