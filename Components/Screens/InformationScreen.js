import React, { Component } from 'react';
import { View, Platform, Modal, Image, TouchableHighlight } from 'react-native';
import { Text } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { Icon } from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
var s = require('./cssGlobal');

export default class InformationScreen extends Component {
  state = {
    modalVisible: false,
  };

  render() {
    Platform.os === 'ios'
      ? (iconName = 'ios-information-circle')
      : (iconName = 'md-information-circle');

    return (
      <View>
        <Ionicons
          name={iconName}
          size={32}
          color="white"
          style={{ padding: 15 }}
          onPress={() => {
            this.setState({ modalVisible: true });
          }}
        />
        <Modal animationType="fade" transparent={false} visible={this.state.modalVisible}>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 0.4,
                backgroundColor: '#3C8874',
                alignItems: 'left',
                justifyContent: 'left',
              }}
            >
              <Image
                source={require('../../assets/image/logo-carbone.png')}
                style={{
                  width: '75%',
                  height: '75%',
                  resizeMode: 'contain',
                  padding: '10%',
                  margin: '10%',
                }}
              />
            </View>

            <View style={{ flex: 0.6, resizeMode: 'contain' }}>
              <Text style={[s.josephine, s.modaltextTitle]}>
                Méthode de calcul de l'empreinte carbone :
              </Text>
              <Text style={[s.josephine, s.modaltextsubTitle]}>3 paramètres pris en compte</Text>
              <View
                style={{
                  flex: 0.15,
                  flexDirection: 'row',
                  width: '100%',
                  flexWrap: 'wrap',
                  marginLeft: wp('15%'),
                  marginBottom: hp('5%'),
                  marginTop: hp('3%'),
                }}
              >
                <Image
                  source={require('../../assets/image/carbon.png')}
                  style={{ width: 30, height: 30 }}
                />
                <Text style={[s.josephine, s.textContent]}>
                  Facteur d'émission propre de l'aliment
                </Text>
              </View>

              <View
                style={{
                  flex: 0.15,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  marginLeft: wp('15%'),
                  marginBottom: hp('5%'),
                }}
              >
                <Image
                  source={require('../../assets/image/calendar.png')}
                  style={{ width: 30, height: 30, paddingTop: 10 }}
                />
                <Text style={[s.josephine, s.textContent]}>
                  {'Saison : supplément si hors saison'}
                </Text>
              </View>

              <View
                style={{
                  flex: 0.15,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  marginLeft: wp('15%'),
                  marginBottom: hp('5%'),
                }}
              >
                <Image
                  source={require('../../assets/image/world.png')}
                  style={{ width: 30, height: 30 }}
                />
                <Text style={[s.josephine, s.textContent]}>
                  {'Provenance : supplément si le produit vient de loin'}
                </Text>
              </View>

              <View
                style={{
                  flex: 0.25,
                  marginLeft: wp('1%'),
                  marginBottom: hp('0%'),
                  marginTop: hp('0.5%'),
                }}
              >
                <Text style={[s.josephine, s.textdescriptionResultat]}>
                  = Empreinte carbone de l'aliment en gC02 / g
                </Text>
              </View>
            </View>
          </View>
          <TouchableHighlight
            style={{ position: 'absolute', top: 50, right: 20 }}
            onPress={() => {
              this.setState({ modalVisible: !this.state.modalVisible });
            }}
          >
            <Icon name="ios-close-circle" size={46} type="ionicon" color="#F2FFFF" />
          </TouchableHighlight>
        </Modal>
      </View>
    );
  }
}
