import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Text, Animated, Easing, I18nManager } from 'react-native';
import { LinearGradient } from 'expo';
import AppIntroSlider from 'react-native-app-intro-slider';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';

I18nManager.forceRTL(false);

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '100%',
  },
  image: {
    width: 320,
    height: 320,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'left',
    paddingHorizontal: 14,
  },
  title: {
    fontSize: 20,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  },
  buttonCircle: {
    width: wp('35%'),
    flexDirection: 'row',
    height: 50,
    backgroundColor: 'rgba(90, 173, 34, 1)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp('2%'),
    left: wp('-10%'),
  },
  buttonCirclePrev: {
    width: wp('35%'),
    flexDirection: 'row-reverse',
    height: 50,
    backgroundColor: 'rgba(240, 60, 60, 1)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp('2%'),
    left: wp('-10%'),
  },
  buttonCircleSkip: {
    width: wp('35%'),
    flexDirection: 'row',
    height: 50,
    backgroundColor: 'rgba(243, 185, 25, 1)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp('2%'),
    left: wp('-10%'),
  },
  buttonCircleText: {
    color: '#F2FFFF',
    marginRight: 15,
  },
  buttonCircleTextPrev: {
    color: '#F2FFFF',
    marginLeft: 15,
  },
});

const slides = [
  {
    key: '1',
    title: 'But de EatforGood?',
    text: "Estimer facilement l'empreinte carbone d'un aliment!",
    lottie: "require('../../assets/animation-jongleur.json')",
    colors: ['#02aab0', '#00cdac'],
  },
  {
    key: '2',
    title: 'Comment ça marche ?',
    text:
      'Prenez en photo votre aliment ou recherchez-le directement, puis renseigner sa provenance (connue ou supposée)',
    lottie: "require('../../assets/animation-jongleur.json')",
    colors: ['#02aab0', '#00cdac'],
  },
  {
    key: '3',
    title: 'Comment sont faites les estimations?',
    text:
      "Empreinte carbone = Facteur d'émission du produit + Supplément lié à la provenance +  Supplément lié à la saison",
    lottie: "require('../../assets/animation-jongleur.json')",
    colors: ['#02aab0', '#00cdac'],
  },
];

export default class IntroScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
    };
  }
  componentDidMount() {
    this.animationMain.play(0, 100);
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 6000,
      easing: Easing.linear,
    }).start();
  }

  _renderItem = props => (
    <LinearGradient
      style={[
        styles.mainContent,
        {
          paddingTop: props.topSpacer,
          paddingBottom: props.bottomSpacer,
          width: props.width,
          height: props.height,
        },
      ]}
      colors={props.colors}
      start={{ x: 0, y: 0.1 }}
      end={{ x: 0.1, y: 1 }}
    >
      <LottieView
        style={{ width: 300, height: 300 }}
        progress={this.state.progress}
        source={require('../../assets/animation-jongleur.json')}
        ref={animation => {
          this.animationMain = animation;
        }}
      />
      <View>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.text}>{props.text}</Text>
        <Text style={styles.text}>{props.text2}</Text>
        <Text style={styles.text}>{props.text3}</Text>
      </View>
    </LinearGradient>
  );

  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={styles.buttonCircleText}>Terminé!</Text>
        <Ionicons
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  };
  _renderPrevButton = () => {
    return (
      <View style={styles.buttonCirclePrev}>
        <Text style={styles.buttonCircleTextPrev}>Précédent</Text>
        <Ionicons
          name="md-arrow-round-back"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  };
  _renderSkipButton = () => {
    return (
      <View style={styles.buttonCircleSkip}>
        <Text style={styles.buttonCircleText}>Passer</Text>
        <Ionicons
          name="md-close"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  };
  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={styles.buttonCircleText}>Suivant</Text>
        <Ionicons
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppIntroSlider
          slides={slides}
          renderItem={this._renderItem}
          bottomButton={true}
          dotStyle={{ display: 'none' }}
          activeDotStyle={{ display: 'none' }}
          showSkipButton
          showPrevButton
          showNextButton
          showDoneButton
          paginationStyle={{ flexDirection: 'row-reverse', width: '100%' }}
          buttonStyle={{ flexDirection: 'row-reverse', width: '100%' }}
          renderDoneButton={this._renderDoneButton}
          renderSkipButton={this._renderSkipButton}
          renderPrevButton={this._renderPrevButton}
          renderNextButton={this._renderNextButton}
          onDone={this.props._changeState}
        />
      </View>
    );
  }
}
