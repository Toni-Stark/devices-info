import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';

const DarkBlue = '#30a2c4';
const White = '#ffffff';
const panelLine = require('../../static/control/panel-line.png');
const reorder = require('../../static/control/reorder.png');
const theme = require('../../static/control/theme.png');
const email = require('../../static/control/e-mail.png');
const icon = require('../../static/control/e-mail.png');

export const AdminInfo = props => {
  return (
    <View style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.configList}>
          <FastImage style={styles.image} source={reorder} />
          <View style={styles.setting}>
            <FastImage style={styles.image} source={panelLine} />
            <FastImage style={styles.image} source={theme} />
            <FastImage style={styles.image} source={email} />
          </View>
        </View>
        <View style={styles.headerContent}>
          <View style={styles.headerIcon}>
            <View style={styles.headerTop}>
              <View style={styles.headerMain}>
                <FastImage
                  style={styles.icon}
                  source={{
                    uri: 'https://unsplash.it/400/400?image=1',
                    headers: {Authorization: 'someAuthToken'},
                    priority: FastImage.priority.normal,
                  }}
                />
                <Text style={styles.headerTitle}>Gerric</Text>
              </View>
              <View style={styles.headerDesc}>
                <Text style={styles.evalText}>个人主页</Text>
              </View>
            </View>
            <View style={styles.headerBottom}>
              <View style={styles.tipBar}>
                <Text style={styles.tipText}>安全卫士证书</Text>
              </View>
              <View style={styles.tipBar}>
                <Text style={styles.tipText}>成就</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

AdminInfo.options = {
  topBar: {visible: false},
  bottomTab: {
    text: '我的',
  },
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  font: {
    fontSize: 30,
    color: DarkBlue,
    textAlign: 'center',
  },
  image: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
  },
  header: {
    height: 170,
    flexDirection: 'column',
  },
  configList: {
    backgroundColor: 'gray',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
  },
  setting: {
    flexDirection: 'row',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 30,
    width: '100%',
    flex: 1,
  },
  icon: {
    height: 45,
    width: 45,
    borderRadius: 360,
  },
  headerIcon: {},
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  headerMain: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '75%',
  },
  headerTitle: {
    fontSize: 22,
    color: '#ffffff',
    marginLeft: 15,
  },
  headerDesc: {
    width: '25%',
  },
  evalText: {
    color: '#ffffff',
  },
  headerBottom: {
    flexDirection: 'row',
    marginLeft: 20,
    marginVertical: 8,
  },
  tipBar: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(192,192,192,0.6)',
    borderRadius: 20,
    marginRight: 10,
  },
  tipText: {
    color: '#ffffff',
  },
});
