import React from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import FastImage from 'react-native-fast-image';

const DarkBlue = '#30a2c4';
const White = '#ffffff';
export const ButtonComponent = props => {
  return (
    <TouchableWithoutFeedback onPress={props.openLayout}>
      <FastImage
        style={styles.image}
        source={{
          uri: 'https://unsplash.it/400/400?image=1',
          headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.normal,
        }}
      />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 33,
    height: 33,
    borderRadius: 60,
    alignSelf: 'center',
    marginLeft: 10,
  },
});
