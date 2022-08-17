import React, {useEffect, useMemo, useState} from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RegSharePath} from '../../../common/tools';
import WebView from 'react-native-webview';
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';
import DropDownPicker from 'react-native-dropdown-picker';
import {Navigation} from 'react-native-navigation';

const DarkBlue = '#30a2c4';
const White = '#ffffff';
export const ShareView = props => {
  const window = useWindowDimensions();
  const screenHeight = Dimensions.get('screen');
  const [shareFile, setShareFile] = useState(undefined);
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(['fake', 'swindle']);
  const [items, setItems] = useState([
    {label: '虚假信息', value: 'fake'},
    {label: '虚假新闻', value: 'news', parent: 'fake'},
    {label: '虚假论坛', value: 'talk', parent: 'fake'},

    {label: '诈骗信息', value: 'swindle'},
    {label: '诈骗钱财', value: 'money', parent: 'swindle'},

    {label: '煽动舆论', value: 'stirOpinion'},
  ]);

  useEffect(() => {
    Navigation.mergeOptions(props.componentId, {
      bottomTabs: {
        visible: false,
      },
    });
    setShareFile(props.files);
  }, []);

  const useSourceOrView = useMemo(() => {
    let source = shareFile?.length > current ? shareFile[current] : {};
    if (source?.fileName) {
      return (
        <View>
          <FastImage
            style={styles.viewImage}
            source={{
              uri: source.filePath,
            }}
          />
        </View>
      );
    } else {
      let options = {
        uri: source.text ? RegSharePath(source.text) : source.weblink,
      };
      if (options.uri) {
        return (
          <WebView source={options} onLoad={() => {}} style={styles.webView} />
        );
      } else {
        return (
          <TouchableOpacity style={styles.webViewTouch}>
            <Text style={styles.webViewText}>ReactNative</Text>
          </TouchableOpacity>
        );
      }
    }
  }, [current, shareFile]);

  const usePicker = useMemo(() => {
    return (
      <View style={styles.pickerView}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          multiple={true}
          mode="BADGE"
          badgeDotColors={[
            '#e76f51',
            '#00b4d8',
            '#e9c46a',
            '#e76f51',
            '#8ac926',
            '#00b4d8',
            '#e9c46a',
          ]}
          placeholder="请选择举报类型"
          placeholderStyle={styles.placeholder}
        />
      </View>
    );
  }, [items, open, value]);

  const currentContext = useMemo(() => {
    return (
      <SafeAreaView
        style={{
          width: window.width,
          height: screenHeight.height,
          paddingTop: props.equipmentType ? 0 : 35,
          backgroundColor: 'white',
          alignItems: 'center',
        }}>
        <View style={styles.currentView}>
          <View style={styles.contextView}>{useSourceOrView}</View>
        </View>
        {usePicker}
        <TouchableOpacity style={styles.touchOpacity}>
          <View style={styles.touchButton}>
            <Text style={styles.touchText}>提交</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }, [
    props.equipmentType,
    screenHeight.height,
    usePicker,
    useSourceOrView,
    window.width,
  ]);

  return (
    <KeyboardAvoidingView behavior="position">
      {currentContext}
    </KeyboardAvoidingView>
  );
};

ShareView.options = {
  topBar: {
    title: {
      text: '举报此网站',
      color: DarkBlue,
    },
    background: {
      color: White,
    },
  },
  bottomTab: {visible: false},
};
const styles = StyleSheet.create({
  currentView: {
    width: '100%',
    height: '50%',
  },
  titleView: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
  },
  contextView: {
    flex: 1,
    borderStyle: 'solid',
    borderColor: '#f2f2f2',
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  touchOpacity: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchButton: {
    marginTop: 30,
    marginRight: 10,
    marginLeft: 10,
    padding: 10,
    width: '90%',
    backgroundColor: '#14a2a2',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  touchText: {
    color: '#fff',
    fontSize: 15,
  },
  webView: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000E2E',
  },
  webViewTouch: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  webViewText: {fontSize: 32, color: '#070d33'},
  viewImage: {
    width: 300,
    height: 200,
  },
  pickerView: {
    padding: 10,
  },
  placeholder: {
    color: '#666666',
  },
});
