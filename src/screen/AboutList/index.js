import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {ActiveNavi} from '../../common/activeTools';

const DarkBlue = '#30a2c4';
const White = '#ffffff';

export const AboutList = props => {
  return (
    <TouchableOpacity
      onPress={() => {
        ActiveNavi(props.componentId, {
          name: 'ShareView',
          data: null,
        });
      }}>
      <Text>举报列表页面</Text>
    </TouchableOpacity>
  );
};
AboutList.options = {
  topBar: {
    title: {
      text: '举报记录',
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
