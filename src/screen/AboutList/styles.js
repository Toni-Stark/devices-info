import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  controlView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  button: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    borderRadius: 5,
  },
  right: {
    marginLeft: 10,
  },
  devicesList: {
    flex: 1,
    paddingHorizontal: 10,
  },
  devicesItem: {
    backgroundColor: '#ffffff',
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  contentView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelView: {},
  btnView: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    height: 27,
    width: '100%',
    backgroundColor: '#dedede',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  textView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textSpan: {},
  loading: {
    alignSelf: 'center',
  },
});
