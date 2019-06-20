import React from 'react';
import { connect } from 'react-redux';
import { View, Animated, Easing, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native-elements';
import LottieView from 'lottie-react-native';
var s = require('./cssGlobal');

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
      allDataFromDB: null,
    };
  }

  componentDidMount() {
    this.animationMain.play(0, 100);
    this.animationLoader.play(0, 100);
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 10000,
      easing: Easing.linear,
    }).start();

    fetch('https://eatforgoodbackend.herokuapp.com/getAllAliment')
      .then(response => {
        return response.text();
      })
      .then(data => {
        this.setState({ allDataFromDB: data });
        this.props.handleData(JSON.parse(this.state.allDataFromDB));
      })
      .catch(error => {
        console.error(error);
      });
  }

  render = () => {
    let content = (
      <TouchableOpacity
        style={s.buttonHome}
        onPress={() => this.props.navigation.navigate('AccountScreen')}
        underlayColor="#fff"
      >
        <Text style={[s.buttonTextHome, s.josephine]}>Commencez!</Text>
      </TouchableOpacity>
    );

    if (this.state.allDataFromDB === null) {
      content = (
        <LottieView
          style={{ width: '60%' }}
          ref={animation => {
            this.animationLoader = animation;
          }}
          source={require('../../assets/loading.json')}
        />
      );
    }

    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1.1, backgroundColor: '#3C8874' }}>
          <LottieView
            style={{ maxWidth: '100%' }}
            ref={animation => {
              this.animationMain = animation;
            }}
            source={require('../../assets/animation-jongleur.json')}
          />
        </View>
        <View style={{ flex: 1, backgroundColor: '#F2FFFF', alignItems: 'center' }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 15,
            }}
          >
            <Text style={[s.josephine, s.titleApp]}>
              EatforGood
              {<Text style={{ top: 5, color: 'white' }} />}
            </Text>
            <Image
              source={require('../../assets/image/logo/othercolor.png')}
              style={{ width: 90, height: 75 }}
            />
          </View>
          <Text style={[s.josephine, s.subtitleApp]}>
            L'empreinte carbone de votre alimentation
          </Text>
          {content}
        </View>
      </View>
    );
  };
}

mapDispatchToProps = dispatch => {
  return {
    handleData: function(data) {
      dispatch({
        type: 'handleData',
        allDataFromDB: data,
      });
    },
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(HomeScreen);
