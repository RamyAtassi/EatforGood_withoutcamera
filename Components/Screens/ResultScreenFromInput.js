import React from 'react';
import {
  AsyncStorage,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { connect } from 'react-redux';
import { Icon, Button, Overlay } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import AwesomeAlert from 'react-native-awesome-alerts';
import LottieView from 'lottie-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

var s = require('./cssGlobal');

class ResultScreenFromInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      showAlert: false,
      modalVisible: false,
      progress: new Animated.Value(0),
    };
  }
  // Retour vers l'écran Account
  componentDidMount() {
    this.animationMain.play(0, 75);
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 10000,
      easing: Easing.linear,
    }).start();
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <Ionicons
          onPress={() => navigation.navigate('AccountScreen')}
          name="ios-home"
          style={{ marginRight: 25 }}
          color="white"
          size={30}
        />
      ),
      headerLeft: null,
    };
  };

  onButtonPress = () => {
    if (this.state.isVisible == false) {
      this.setState({
        isVisible: true,
      });
    } else {
      this.setState({
        isVisible: false,
      });
    }
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };

  showAlert = () => {
    if (this.state.showAlert == false) {
      this.setState({
        showAlert: true,
      });
    } else {
      this.setState({
        showAlert: false,
      });
    }
  };

  OnSavePress = async () => {
    let date = new Date();
    let food = {
      Food: this.props.dataFromSearchScreen.Food,
      Date: {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
      },
      Europe: this.props.dataFromSearchScreen.Europe,
      France: this.props.dataFromSearchScreen.France,
      Local: this.props.dataFromSearchScreen.Local,
      Monde: this.props.dataFromSearchScreen.Monde,
      Quantity: this.props.dataFromSearchScreen.Quantity,
    };
    let foods = await AsyncStorage.getItem('foods');
    foods = JSON.parse(foods);
    if (!foods) {
      foods = [];
    }
    foods.push(food);
    await AsyncStorage.setItem('foods', JSON.stringify(foods));
    this.props.saveDataFromInput(foods);
    this.props.navigation.navigate('HistoScreen');
  };

  render() {
    const { showAlert } = this.state;
    let tableSeasonFromAPI = this.props.dataFromSearchScreen.Food.season;
    let tableSeason = [];
    tableSeasonFromAPI[0] ? (tableSeason[0] = '1') : null;
    tableSeasonFromAPI[1] ? (tableSeason[1] = '2') : null;
    tableSeasonFromAPI[2] ? (tableSeason[2] = '3') : null;
    tableSeasonFromAPI[3] ? (tableSeason[3] = '4') : null;
    tableSeasonFromAPI[4] ? (tableSeason[4] = '5') : null;
    tableSeasonFromAPI[5] ? (tableSeason[5] = '6') : null;
    tableSeasonFromAPI[6] ? (tableSeason[6] = '7') : null;
    tableSeasonFromAPI[7] ? (tableSeason[7] = '8') : null;
    tableSeasonFromAPI[8] ? (tableSeason[8] = '9') : null;
    tableSeasonFromAPI[9] ? (tableSeason[9] = '10') : null;
    tableSeasonFromAPI[10] ? (tableSeason[10] = '11') : null;
    tableSeasonFromAPI[11] ? (tableSeason[11] = '12') : null;
    // Prise en compte de la date du jour pour les saisons
    var todayDate = new Date();
    var todayMonth = todayDate.getMonth();

    // ----- Calcul de l'emission ------- //

    // ---- 1) Facteur d'émission ------- //
    var emissionFactor = this.props.dataFromSearchScreen.Food.emission;
    emissionFactor.toFixed(0);

    // ---- 2) Saisonalité  ------- //
    // Supplément de 25% sur la facteur d'émission si le fruit /

    let supplementSeason = 1;
    this.props.dataFromSearchScreen.Food.season[todayMonth]
      ? (supplementSeason = 1)
      : (supplementSeason = 1.25);

    // ---- 3) Provenance ------- //

    let supplementTransport = 1;
    this.props.dataFromSearchScreen.Local
      ? (supplementTransport = 1)
      : this.props.dataFromSearchScreen.France
      ? (supplementTransport = 1.1)
      : this.props.dataFromSearchScreen.Europe
      ? (supplementTransport = 1.3)
      : (supplementTransport = 1.5);

    let origin = '';

    this.props.dataFromSearchScreen.Local
      ? (origin = 'local')
      : this.props.dataFromSearchScreen.France
      ? (origin = 'France')
      : this.props.dataFromSearchScreen.Europe
      ? (origin = 'Europe')
      : (origin = 'Monde');

    let logoResult = '';
    var styleCopy = { ...s.response };

    // Calcul avec 3 paramètres et arrondi à 2 chiffres
    let emission = (
      emissionFactor +
      emissionFactor * (supplementSeason - 1) +
      emissionFactor * (supplementTransport - 1) +
      emissionFactor * this.props.dataFromSearchScreen.Quantity
    ).toFixed(0);

    let emissionUnitaire = (
      emissionFactor +
      emissionFactor * (supplementSeason - 1) +
      emissionFactor * (supplementTransport - 1) +
      emissionFactor
    ).toFixed(2);

    // Attribution du résultat final
    if (emissionUnitaire < 2) {
      logoResult = 'FAIBLE';
      styleCopy.color = '#32ce59';
    } else if (emissionUnitaire < 10) {
      logoResult = 'MOYEN';
      styleCopy.color = '#FFA700';
    } else {
      logoResult = 'FORT';
      styleCopy.color = '#C0392B';
    }
    // ! Afficher les badges de saison, si le produit est tjrs de saison aussi
    if (tableSeasonFromAPI[0]) {
      var seasonJanuary = <Text style={s.containerBadge}>Janvier</Text>;
    } else {
      var seasonJanuary = <Text style={s.containerBadgeFalse}>Janvier</Text>;
    }
    if (tableSeasonFromAPI[1]) {
      var seasonFebruary = <Text style={s.containerBadge}>Février</Text>;
    } else {
      var seasonFebruary = <Text style={s.containerBadgeFalse}>Février</Text>;
    }
    if (tableSeasonFromAPI[2]) {
      var seasonMarch = <Text style={s.containerBadge}>Mars</Text>;
    } else {
      var seasonMarch = <Text style={s.containerBadgeFalse}>Mars</Text>;
    }
    if (tableSeasonFromAPI[3]) {
      var seasonApril = <Text style={s.containerBadge}>Avril</Text>;
    } else {
      var seasonApril = <Text style={s.containerBadgeFalse}>Avril</Text>;
    }
    if (tableSeasonFromAPI[4]) {
      var seasonMay = <Text style={s.containerBadge}>Mai</Text>;
    } else {
      var seasonMay = <Text style={s.containerBadgeFalse}>Mai</Text>;
    }
    if (tableSeasonFromAPI[5]) {
      var seasonJune = <Text style={s.containerBadge}>Juin</Text>;
    } else {
      var seasonJune = <Text style={s.containerBadgeFalse}>Juin</Text>;
    }
    if (tableSeasonFromAPI[6]) {
      var seasonJuly = <Text style={s.containerBadge}>Juillet</Text>;
    } else {
      var seasonJuly = <Text style={s.containerBadgeFalse}>Juillet</Text>;
    }
    if (tableSeasonFromAPI[7]) {
      var seasonAugust = <Text style={s.containerBadge}>Août</Text>;
    } else {
      var seasonAugust = <Text style={s.containerBadgeFalse}>Août</Text>;
    }
    if (tableSeasonFromAPI[8]) {
      var seasonSeptember = <Text style={s.containerBadge}>Septembre</Text>;
    } else {
      var seasonSeptember = <Text style={s.containerBadgeFalse}>Septembre</Text>;
    }
    if (tableSeasonFromAPI[9]) {
      var seasonOctober = <Text style={s.containerBadge}>Octobre</Text>;
    } else {
      var seasonOctober = <Text style={s.containerBadgeFalse}>Octobre</Text>;
    }
    if (tableSeasonFromAPI[10]) {
      var seasonNovember = <Text style={s.containerBadge}>Novembre</Text>;
    } else {
      var seasonNovember = <Text style={s.containerBadgeFalse}>Novembre</Text>;
    }
    if (tableSeasonFromAPI[11]) {
      var seasonDecember = <Text style={s.containerBadge}>Décembre</Text>;
    } else {
      var seasonDecember = <Text style={s.containerBadgeFalse}>Décembre</Text>;
    }
    if (
      tableSeasonFromAPI[0] &&
      tableSeasonFromAPI[1] &&
      tableSeasonFromAPI[2] &&
      tableSeasonFromAPI[3] &&
      tableSeasonFromAPI[4] &&
      tableSeasonFromAPI[5] &&
      tableSeasonFromAPI[6] &&
      tableSeasonFromAPI[7] &&
      tableSeasonFromAPI[8] &&
      tableSeasonFromAPI[9] &&
      tableSeasonFromAPI[10] &&
      tableSeasonFromAPI[11]
    ) {
      var seasonText = (
        <View style={{ flexDirection: 'row' }}>
          <LottieView
            style={{ width: 90 }}
            source={require('../../assets/check_ok_2.json')}
            progress={this.state.progress}
          />
          <Text style={s.containerBadgeAlwaysTrue}>Ce produit est toujours de saison</Text>
        </View>
      );
      var seasonJanuary = null;
      var seasonFebruary = null;
      var seasonMarch = null;
      var seasonApril = null;
      var seasonMay = null;
      var seasonJune = null;
      var seasonJuly = null;
      var seasonAugust = null;
      var seasonSeptember = null;
      var seasonOctober = null;
      var seasonNovember = null;
      var seasonDecember = null;
    } else {
      var seasonText = <Text />;
    }
    //Afficher les saisons seulement pour les fruits et légumes
    let season = <View />;
    if (this.props.dataFromSearchScreen.Food.type === 'Vegetables') {
      season = (
        <View>
          <View
            style={{
              flex: 0.2,
              width: '100%',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Text style={[s.josephine, s.Season]}>Mois de Saison :</Text>
          </View>
          <View style={{ flex: 0.5, margin: 2, width: '100%', flexDirection: 'row' }}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
              }}
            >
              {seasonText}
              {seasonJanuary}
              {seasonFebruary}
              {seasonMarch}
              {seasonApril}
              {seasonMay}
              {seasonJune}
              {seasonJuly}
              {seasonAugust}
              {seasonSeptember}
              {seasonOctober}
              {seasonNovember}
              {seasonDecember}
            </View>
          </View>
        </View>
      );
    }

    return (
      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={s.contentContainerResult}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ textAlign: 'center' }}
        >
          <View style={{ flex: 0.2, marginTop: 15 }}>
            <Text style={[s.josephine, s.titleResult]}>
              {this.props.dataFromSearchScreen.Food.nameFR}
            </Text>
          </View>
          <View style={{ flex: 0.1 }}>
            <Text style={[s.josephine, s.titleEmission]}>
              Poids : {this.props.dataFromSearchScreen.Quantity} g
            </Text>
            <Text style={[s.josephine, s.titleEmission]}>Empreinte carbone: {emission} gCO2</Text>
          </View>
          <View
            style={{
              flex: 0.2,
              marginLeft: wp('3%'),
              marginRight: wp('3%'),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name="ios-square" size={hp('8%')} type="ionicon" color={styleCopy.color} />
            <Text style={[s.josephine, s.logoResult, styleCopy]}>{logoResult}</Text>
          </View>

          <View style={{ flex: 0.2 }}>
            <Button
              title="Pourquoi ce score ?"
              titleStyle={[s.josephine, s.white]}
              onPress={() => {
                this.setState({ modalVisible: true });
              }}
              buttonStyle={{
                backgroundColor: '#3C8874',
                margin: '10%',
                marginTop: 0,
                marginBottom: 0,
              }}
            />
          </View>
          <Overlay
            height={200}
            isVisible={this.state.modalVisible}
            overlayBackgroundColor="#3C8874"
            onBackdropPress={() => this.setState({ modalVisible: false })}
          >
            <View>
              <Text style={[s.white, s.josephine, s.directionRow, s.overlayText]}>
                - Facteur d'émission propre à l'aliment :{' '}
                <Text style={{ fontSize: hp('2.5%'), fontWeight: 'bold' }}>
                  {emissionFactor} g C02/g
                </Text>
              </Text>
              <Text style={[s.white, s.josephine, s.directionRow, s.overlayText]}>
                - Supplément lié à la saison actuelle :{' '}
                <Text style={{ fontSize: hp('2.5%'), fontWeight: 'bold' }}>
                  +{((supplementSeason - 1) * 100).toFixed(0)}
                </Text>
                %
              </Text>
              <Text style={[s.white, s.josephine, s.directionRow, s.overlayText]}>
                - Supplément lié à la provenance :{' '}
                <Text style={{ fontSize: hp('2.5%'), fontWeight: 'bold' }}>
                  +{((supplementTransport - 1) * 100).toFixed(0)}%
                </Text>
              </Text>
            </View>
          </Overlay>
          {season}
        </ScrollView>
        <AwesomeAlert
          style={{ zIndex: 4000, fontSize: hp('1%') }}
          show={showAlert}
          showProgress={false}
          title="Enregistrer l'aliment dans le panier?"
          message=""
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Annuler"
          confirmText="Confirmer"
          confirmButtonColor="#32ce59"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.OnSavePress();
          }}
        >
          <Icon
            containerStyle={{ marginTop: 10 }}
            name="ios-save"
            size={30}
            type="ionicon"
            color="#F2FFFF"
          />
        </AwesomeAlert>
        <LottieView
          style={{ width: 80, position: 'absolute', bottom: 2.4, right: 2.4 }}
          source={require('../../assets/circle.json')}
          ref={animation => {
            this.animationMain = animation;
          }}
        />
        <TouchableOpacity
          style={[s.buttonSaveResult]}
          onPress={() => this.showAlert()}
          underlayColor="#fff"
        >
          <Icon
            containerStyle={{ marginTop: 10 }}
            name="ios-save"
            size={30}
            type="ionicon"
            color="#F2FFFF"
          />
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

mapDispatchToProps = dispatch => {
  return {
    saveDataFromInput: data => {
      dispatch({
        type: 'dataSavedFromInput',
        foodSaved: data,
      });
    },
  };
};

mapStateToProps = state => {
  console.log('dans le mapStateToProps -->', state.data);
  return { dataFromSearchScreen: state.data };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResultScreenFromInput);
