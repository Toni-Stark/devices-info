import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
  AppState,
} from 'react-native';
import SideMenu from 'react-native-side-menu';
import Toast from 'react-native-toast-message';
import {Menu} from '../../components/Menu';
import {HeaderBar} from '../../components/HeaderBar';
import SplashScreen from 'react-native-splash-screen';
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';
import {NaviToScreen} from '../../common/activeTools';

const DarkBlue = '#30a2c4';
const White = '#ffffff';

export const HomeScreen = props => {
  const [menuOptions, setMenuOptions] = useState({
    isOpen: false,
    selectedItem: 'About',
  });
  const [showModal, setShowModal] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;

  const changeOpacity = num => {
    Animated.timing(opacity, {
      toValue: num,
      easing: Easing.back(),
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const onMenuItemSelected = item =>
    setMenuOptions({
      isOpen: false,
      selectedItem: item,
    });

  const updateMenuState = isOpen => {
    setMenuOptions({...menuOptions, isOpen});
    if (!isOpen) {
      setTimeout(() => {
        setShowModal(isOpen);
      }, 500);
    } else {
      setShowModal(isOpen);
    }
    changeOpacity(isOpen ? 1 : 0);
  };

  const changeMenuState = () =>
    setMenuOptions({
      ...menuOptions,
      isOpen: !menuOptions.isOpen,
    });

  const handleAppStateChange = e => {
    if (e === 'active') {
      Toast.show({text1: '新的分享链接，请点击确认进入'});
    }
  };

  const toastPress = () => {
    console.log('触发Toast点击事件');
  };

  useEffect(() => {
    SplashScreen.hide();
    AppState.addEventListener('change', handleAppStateChange);
    ReceiveSharingIntent.getReceivedFiles(
      files => {
        NaviToScreen(files, props.componentId, 'ShareView');
      },
      error => {
        NaviToScreen();
      },
      'ShareMedia',
    );
    return () => {
      ReceiveSharingIntent.clearReceivedFiles();
    };
  }, []);

  const menu = <Menu onItemSelected={onMenuItemSelected} />;
  return (
    <SideMenu
      menu={menu}
      isOpen={menuOptions.isOpen}
      onChange={isOpen => updateMenuState(isOpen)}
      animationFunction={(prop, value) =>
        Animated.spring(prop, {
          toValue: value,
          friction: 8,
          useNativeDriver: true,
        })
      }>
      <>
        <View style={styles.container}>
          <Toast onPress={toastPress} />
          <HeaderBar openLayout={() => updateMenuState(true)} />
          <View style={styles.root}>
            <TouchableOpacity onPress={changeMenuState}>
              <View>
                <Text style={styles.font}>通过分享进入应用程序</Text>
                <Text style={styles.font}>即可打开举报窗口 👋</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {showModal ? (
          <Animated.View style={[styles.shadow, {opacity: opacity}]} />
        ) : null}
      </>
    </SideMenu>
  );
};

HomeScreen.options = {
  topBar: {visible: false},
  bottomTab: {
    text: '首页',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: White,
  },
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  font: {
    fontSize: 30,
    color: DarkBlue,
    textAlign: 'center',
  },
  shadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(161,161,161,0.44)',
  },
});
