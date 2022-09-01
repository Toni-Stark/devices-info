import {Navigation} from 'react-native-navigation';
import {throttle} from './tools';

export const ActiveNavi = (componentId, {name, data}) => {
  console.log(componentId, 'referer');
  Navigation.push(componentId, {
    component: {
      name: name,
      passProps: data,
    },
  });
};

export const NaviToScreen = (files, componentId, name) => {
  throttle(() => {
    if (files) {
      ActiveNavi(componentId, {
        name: name,
        data: {files},
      });
    }
  }, 1000);
};
