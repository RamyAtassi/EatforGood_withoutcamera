import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import { Platform } from 'react-native';

export default class LogoScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var styles = StyleSheet.create({
      logo:{
        width: (Platform.OS === 'ios') ? 75 : 75,
        height: (Platform.OS === 'ios') ? 60 : 60,
        left: (Platform.OS === 'ios') ? 0 : -30,
      }
    });
    return (
      <View style={{alignItems: 'center', width:'100%'}}>
      <Image
        source={require('../../assets/image/logo/othercolor.png')}
        style={styles.logo}
      />
      </View>
    );
  }
}
