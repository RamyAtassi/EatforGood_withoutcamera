import React from 'react';
import { View, Animated, Easing, Image, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { Item, Picker, Icon } from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

let s = require('./cssGlobal');
// Affichage de l'app

class ChoicesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Next',
      headerRight: (
        <Ionicons
          onPress={() => navigation.navigate('HomeScreen')}
          name="ios-home"
          style={{ marginRight: 25 }}
          color="white"
          size={30}
        />
      ),
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
      switch: false,
      pressStatusLocal: false,
      pressStatusFrance: false,
      pressStatusEurope: false,
      pressStatusWorld: false,
      fruitName: '',
      quantity: 0,
    };
  }

  handleToogle1 = () => {
    if (this.state.pressStatusLocal) {
      this.setState({ pressStatusLocal: false });
    } else if (!this.state.pressStatusLocal) {
      this.setState({
        pressStatusLocal: true,
        pressStatusFrance: false,
        pressStatusEurope: false,
        pressStatusWorld: false,
      });
    }
  };
  handleToogle2 = () => {
    if (this.state.pressStatusFrance) {
      this.setState({ pressStatusFrance: false });
    } else if (!this.state.pressStatusFrance) {
      this.setState({
        pressStatusFrance: true,
        pressStatusLocal: false,
        pressStatusEurope: false,
        pressStatusWorld: false,
      });
    }
  };
  handleToogle3 = () => {
    if (this.state.pressStatusEurope) {
      this.setState({ pressStatusEurope: false });
    } else if (!this.state.pressStatusWorld) {
      this.setState({
        pressStatusWorld: false,
        pressStatusFrance: false,
        pressStatusLocal: false,
        pressStatusEurope: true,
      });
    }
  };
  handleToogle4 = () => {
    if (this.state.pressStatusWorld) {
      this.setState({ pressStatusWorld: false });
    } else if (!this.state.pressStatusWorld) {
      this.setState({
        pressStatusFrance: false,
        pressStatusLocal: false,
        pressStatusEurope: false,
        pressStatusWorld: true,
      });
    }
  };
  componentDidMount = () => {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 4000,
      easing: Easing.linear,
    }).start();
  };

  onValueChange = value => {
    this.setState({
      quantity: value,
    });
  };

  render = () => {
    return (
      <ScrollView contentContainerStyle={s.contentContainer}>
        <View style={{ flex: 0.25, alignItems: 'center', justifyContent: 'flex-end' }}>
          <Text style={[s.confirmationTitle, s.josephine]}>
            Quelle est le poids / la quantité de votre{' '}
            {
              this.props.dataFromCameraConfirmed.dataFromCamera[
                this.props.dataFromCameraConfirmed.chosenFood
              ].article.nameFR
            }
            ?
          </Text>
        </View>

        <View style={{ flex: 0.25, alignItems: 'center', justifyContent: 'flex-end' }}>
          <Item
            picker
            style={{
              width: '100%',
              borderColor: '#3C8874',
              borderWidth: 5,
              textAlign: 'center',
              marginBottom: 15,
            }}
          >
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              underline={false}
              bordered
              placeholder="Quantité"
              placeholderStyle={{
                color: '#bfc6ea',
                textAlign: 'center',
                letterSpacing: 0,
                fontSize: hp('2%'),
              }}
              textStyle={{
                color: '#3C8874',
                letterSpacing: 1,
                fontSize: hp('3%'),
                fontWeight: 'bold',
                fontFamily: 'josephine',
                textAlign: 'center',
              }}
              placeholderIconColor="#007aff"
              selectedValue={this.state.quantity}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="100g ou 100mL" value="100" />
              <Picker.Item label="200g ou 200mL" value="200" />
              <Picker.Item label="500g ou 500mL" value="500" />
              <Picker.Item label="750g ou 750mL" value="750" />
              <Picker.Item label="1kg ou 1L" value="1000" />
            </Picker>
          </Item>
        </View>

        <View style={{ flex: 0.25, alignItems: 'center', justifyContent: 'flex-end' }}>
          <Text style={[s.confirmationTitle, s.josephine]}>
            Quelle est la provenance de votre{' '}
            {
              this.props.dataFromCameraConfirmed.dataFromCamera[
                this.props.dataFromCameraConfirmed.chosenFood
              ].article.nameFR
            }
            ?
          </Text>
        </View>

        <View style={[s.globalChoice]}>
          <View style={{ flex: 0.25, alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={require('../../assets/image/local.png')}
              style={{ width: wp('6%'), height: hp('6%') }}
            />
            <Switch
              style={s.toogleFrom}
              onValueChange={() => this.handleToogle1()}
              value={this.state.pressStatusLocal}
              ios_backgroundColor="#d6ede7"
            />
            <Text style={[s.fsm, s.josephine, s.mt]}>Local</Text>
          </View>
          <View style={{ flex: 0.25, alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={require('../../assets/image/france.png')}
              style={{ width: wp('6%'), height: hp('6%') }}
            />
            <Switch
              style={s.toogleFrom}
              onValueChange={() => this.handleToogle2()}
              value={this.state.pressStatusFrance}
              ios_backgroundColor="#d6ede7"
            />
            <Text style={[s.fsm, s.josephine, s.mt, s.flexText]}>France</Text>
          </View>
          <View style={{ flex: 0.25, alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={require('../../assets/image/europe.png')}
              style={{ width: wp('6%'), height: hp('6%') }}
            />
            <Switch
              style={s.toogleFrom}
              onValueChange={() => this.handleToogle3()}
              value={this.state.pressStatusEurope}
              ios_backgroundColor="#d6ede7"
            />
            <Text style={[s.fsm, s.josephine, s.mt]}>Europe</Text>
          </View>
          <View style={{ flex: 0.25, alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={require('../../assets/image/monde.png')}
              style={{ width: wp('6%'), height: hp('6%') }}
            />
            <Switch
              style={s.toogleFrom}
              onValueChange={() => this.handleToogle4()}
              value={this.state.pressStatusWorld}
              ios_backgroundColor="#d6ede7"
            />
            <Text style={[s.fsm, s.josephine, s.mt]}>Monde</Text>
          </View>
        </View>

        <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity
            style={[s.buttonChoice, s.josephine]}
            onPress={() => {
              this.props.handlePicture(
                this.props.dataFromCameraConfirmed.dataFromCamera[
                  this.props.dataFromCameraConfirmed.chosenFood
                ].article.nameFR,
                this.state.pressStatusLocal,
                this.state.pressStatusFrance,
                this.state.pressStatusEurope,
                this.state.pressStatusWorld,
                this.state.quantity,
              ),
                this.props.navigation.navigate('ResultScreenFromCamera');
            }}
            underlayColor="#fff"
          >
            <Text style={[s.buttonT, s.josephine]}>Valider</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };
}

mapStateToProps = state => {
  return { dataFromCameraConfirmed: state.data };
};

// My new container component
mapDispatchToProps = dispatch => {
  return {
    handlePicture: function(Food, Local, France, Europe, Monde, Quantity) {
      dispatch({
        type: 'choiceScreen',
        Food: Food,
        Local: Local,
        France: France,
        Europe: Europe,
        Monde: Monde,
        Quantity: Quantity,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChoicesScreen);
