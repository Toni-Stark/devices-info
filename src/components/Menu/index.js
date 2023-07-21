import React from 'react';
import {StyleSheet, ScrollView, View, Image, Text} from 'react-native';
import FastImage from 'react-native-fast-image';

const uri = 'https://unsplash.it/400/400?image=1';
const userInfoUri = require('../../static/user.png');
const settingUri = require('../../static/setting.png');

export const Menu = ({onItemSelected}) => {
  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{
            uri: uri,
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.normal,
          }}
        />
        <Text style={styles.name}>@Gerric</Text>
        <Text style={styles.nickName}>15502354225@163.com</Text>
      </View>
      <View style={styles.settingList}>
        <View style={[styles.settingItem, styles.borderTop]}>
          <Image style={styles.image} source={userInfoUri} />
          <Text onPress={() => onItemSelected('About')} style={styles.label}>
            个人资料
          </Text>
        </View>
        <View style={styles.settingItem}>
          <Image style={styles.image} source={settingUri} />
          <Text onPress={() => onItemSelected('Contacts')} style={styles.label}>
            设置和隐私
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  menu: {
    display: 'flex',
    backgroundColor: 'white',
  },
  avatarContainer: {
    marginVertical: 20,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  name: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  nickName: {
    fontSize: 13,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
  },
  settingList: {
    paddingHorizontal: 20,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: '#f2f2f2',
  },
  settingItem: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 20,
    height: 20,
  },
  label: {
    fontSize: 16,
    marginLeft: 10,
    color: '#080808',
  },
});
