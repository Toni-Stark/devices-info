import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Navigation} from 'react-native-navigation';

const DarkBlue = '#30a2c4';
const White = '#ffffff';

export const HomeScreen = props => {
  const openLayout = () => {
    console.log('显示侧边栏');
    Navigation.push(props.componentId, {
      component: {
        name: 'SideMenu',
        options: {
          topBar: {
            title: {
              text: '个人信息页',
            },
          },
        },
      },
    });
  };

  return (
    <View style={styles.root}>
      <TouchableOpacity
        onPress={() => {
          // Navigation.push(props.componentId, {
          //   component: {
          //     name: 'Admin',
          //     options: {
          //       topBar: {
          //         title: {
          //           text: '个人信息页',
          //         },
          //       },
          //     },
          //   },
          // });
          openLayout();
        }}>
        <Text style={styles.font}>Hello React Native Navigation 👋</Text>
      </TouchableOpacity>
    </View>
  );
};

const openLayout = () => {
  // console.log('显示侧边栏');
  // Navigation.push('Home', {
  //   component: {
  //     name: 'SideMenu',
  //     options: {
  //       topBar: {
  //         title: {
  //           text: '个人信息页',
  //         },
  //       },
  //     },
  //   },
  // });
};

HomeScreen.options = {
  topBar: {
    title: {
      // text: '首页',
      // color: White,
    },
    background: {
      color: DarkBlue,
    },
    styles: {
      textAlign: 'center',
    },
    leftButtons: [
      {
        component: {
          name: 'ButtonComponent',
          passProps: {
            openLayout: openLayout,
          },
        },
      },
    ],
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
