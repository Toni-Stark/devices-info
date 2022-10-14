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
  left: {
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
    marginTop: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  btn: {
    height: 27,
    width: 50,
    backgroundColor: '#ececec',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  regBtn: {
    backgroundColor: '#ffffff',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#ececec',
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
