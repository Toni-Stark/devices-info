import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';

const GGUri = require('../../static/gg.png');
export const HeaderBar = props => {
  return (
    <>
      <View style={styles.header}>
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
        <Image style={styles.logo} source={GGUri} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    position: 'relative',
  },
  image: {
    width: 28,
    height: 28,
    borderRadius: 60,
  },
  logo: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: 28,
    height: 28,
  },
});
