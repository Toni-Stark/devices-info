import {Navigation} from 'react-native-navigation';
import {HomeScreen} from './src/screen/HomeScreen';
import {AdminInfo} from './src/screen/AdminInfo';
import {AboutList} from './src/screen/AboutList';
import {ShareView} from './src/screen/CardScreen/ShareView';

Navigation.registerComponent('Home', () => HomeScreen);
Navigation.registerComponent('Admin', () => AdminInfo);
Navigation.registerComponent('About', () => AboutList);

Navigation.registerComponent('ShareView', () => ShareView);

Navigation.setDefaultOptions({
  statusBar: {
    backgroundColor: '#ffffff',
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
                  icon: require('./src/static/tabBar/home.png'),
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'About',
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: require('./src/static/tabBar/eyes.png'),
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
                  icon: require('./src/static/tabBar/mine.png'),
                },
              },
            },
          },
        ],
      },
    },
  });
});
