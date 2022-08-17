import SplashScreen from 'react-native-splash-screen';
import {Navigation} from 'react-native-navigation';
import {HomeScreen} from './screen/HomeScreen';
import {AdminInfo} from './screen/AdminInfo';
import {Tools} from './screen/Tools';
import {ButtonComponent} from './components/ButtonComponent';
import {SideMenu} from './screen/CardScreen/SideMenu';

SplashScreen.hide();

Navigation.registerComponent('Home', () => HomeScreen);
Navigation.registerComponent('Admin', () => AdminInfo);
Navigation.registerComponent('Tools', () => Tools);

// 状态栏头像位置
Navigation.registerComponent('ButtonComponent', () => ButtonComponent);
Navigation.registerComponent('SideMenu', () => SideMenu);

Navigation.setDefaultOptions({
  statusBar: {
    backgroundColor: '#30a2c4',
  },
  bottomTab: {
    fontSize: 10,
    selectedFontSize: 14,
  },
});

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'Home',
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: require('./static/tabBar/home.png'),
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'Tools',
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: require('./static/tabBar/eyes.png'),
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'Admin',
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: require('./static/tabBar/mine.png'),
                },
              },
            },
          },
        ],
      },
      topBar: {
        rightButtons: [
          {
            component: {
              name: 'ButtonComponent',
              passProps: {},
            },
          },
        ],
      },
    },
  });
});
