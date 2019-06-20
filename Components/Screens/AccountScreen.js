import React from 'react';
import { ScrollView, View, TouchableOpacity, Animated, Easing } from 'react-native';
import { Text, Overlay } from 'react-native-elements';
import { Tab, Tabs, Content, Picker, Form, Icon } from 'native-base';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import LottieView from 'lottie-react-native';
import FoodDetails from './FoodDetailsScreen';

let s = require('./cssGlobal');

class AccountScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foodDisplayed: [],
      name: '',
      modalVisible: false,
      selectedMonth: null,
    };
  }

  componentDidMount = async value => {
    const todayDate = new Date();
    const todayMonth = todayDate.getMonth();
    this.setState({
      selectedMonth: todayMonth,
    });
  };

  onValueChange = value => {
    this.setState({
      selectedMonth: value,
    });
  };

  render() {
    const { allDataFromDB } = this.props;
    // const date = new Date()
    // var options = { month: 'long'}
    // const month = (new Intl.DateTimeFormat('fr-FR', options).format(date))
    let tableValidated = [];
    // if ( Platform.OS === 'ios'){
    //   const date = new Date()
    //   var options = { month: 'long'}
    const month = 'Juin';
    // }
    for (var i = 0; i < allDataFromDB.length; i++) {
      if (
        allDataFromDB[i].season[this.state.selectedMonth] &&
        allDataFromDB[i].type == 'Vegetables'
      ) {
        tableValidated.push(allDataFromDB[i]);
      }
    }

    let content = tableValidated.map((food, i) => {
      return (
        <FoodDetails
          key={i}
          name={food.nameFR}
          img={food.image}
          seasonJan={food.season[0]}
          seasonFev={food.season[1]}
          seasonMar={food.season[2]}
          seasonAv={food.season[3]}
          seasonMai={food.season[4]}
          seasonJuin={food.season[5]}
          seasonJui={food.season[6]}
          seasonAo={food.season[7]}
          seasonSept={food.season[8]}
          seasonOct={food.season[9]}
          seasonNov={food.season[10]}
          seasonDec={food.season[11]}
        />
      );
    });

    let welcome = 'Bienvenue';

    return (
      <View
        style={{
          flex: 3,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F2FFFF',
        }}
      >
        <Tabs
          style={{ backgroundColor: '#F2FFFF' }}
          tabBarUnderlineStyle={{ backgroundColor: '#3C8874' }}
        >
          <Tab
            activeTabStyle={{ backgroundColor: '#F2FFFF' }}
            tabStyle={{ backgroundColor: '#F2FFFF' }}
            textStyle={{ color: '#c6c6c6' }}
            style={{ backgroundColor: '#F2FFFF' }}
            heading={welcome}
            activeTextStyle={s.textPrimary}
          >
            <ScrollView
              showsVerticalScrollIndicator={true}
              contentContainerStyle={s.contentContainerResult}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ textAlign: 'center' }}
              >
                <Text style={[s.josephine, s.textInstruction]}>
                  Calculateur d'empreinte carbone
                </Text>
                <Text style={[s.josephine, s.textInstructionTitle]}>Le but de l'application?</Text>
                <Text style={[s.josephine, s.textInstructionSubtitle]}>
                  Sensibiliser le consommateur sur l’empreinte carbone générée par son alimentation.
                </Text>

                <TouchableOpacity
                  style={s.buttonAccount}
                  onPress={() => this.setState({ modalVisible: true })}
                  underlayColor="#fff"
                >
                  <Overlay
                    borderRadius={25}
                    height={300}
                    isVisible={this.state.modalVisible}
                    overlayBackgroundColor="#3C8874"
                    height={hp('50%')}
                    isVisible={this.state.modalVisible}
                    onBackdropPress={() => this.setState({ modalVisible: false })}
                    containerStyle={{ padding: 15 }}
                  >
                    <Text style={[s.overlayText, s.josephine, s.white]}>
                      A partir du facteur d'émission propre à l'aliment, de la provenance et de la
                      saison en cours (concernant les fruits et légumes), l'application donne une
                      estimation de l'empreinte carbone et son équivalent en terme de transport.
                    </Text>
                    <Text style={[s.overlayText, s.josephine, s.white]}>
                      Les données utilisées sont celles de l'ADEME (facteur d'émission propre à
                      l'aliment) et de la SNCF (comparaison avec l'empreinte carbone générée par
                      voyageur pour les principaux moyens de transport).
                    </Text>
                  </Overlay>
                  <Text style={[s.white, s.josephine]}>En savoir plus</Text>
                </TouchableOpacity>

                <Text style={[s.josephine, s.textInstructionTitle]}>Comment ça marche ? </Text>
                <Text style={[s.josephine, s.textInstructionSubtitle]}>
                  1) Cliquer sur la loupe pour recherche un aliment
                </Text>
                <Text style={[s.josephine, s.textInstructionSubtitle]}>
                  2) Prendre en photo l'aliment ou utiliser le champ de recherche
                </Text>
                <Text style={[s.josephine, s.textInstructionSubtitle]}>
                  3) Renseigner la provenance (Local, France, Europe ou Monde)
                </Text>
                <Text style={[s.josephine, s.textInstructionSubtitle]}>
                  4) Enregistrer le produit dans le panier
                </Text>
                <LottieView
                  style={{ width: '75%' }}
                  source={require('../../assets/connexion.json')}
                  ref={animation => {
                    this.animationMain = animation;
                  }}
                />
              </ScrollView>
            </ScrollView>
          </Tab>

          <Tab
            activeTabStyle={{ backgroundColor: '#F2FFFF' }}
            tabStyle={{ backgroundColor: '#F2FFFF' }}
            textStyle={{ color: '#c6c6c6' }}
            style={{ backgroundColor: '#F2FFFF' }}
            heading="Produits de saison"
            activeTextStyle={s.textPrimary}
          >
            <ScrollView
              showsVerticalScrollIndicator={true}
              contentContainerStyle={s.contentContainerResult}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ textAlign: 'center' }}
              >
                <View style={{ flex: 3, backgroundColor: '#F2FFFF', width: '100%' }}>
                  <View style={{ flex: 0.2, width: '90%', justifyContent: 'flex-end', margin: 15 }}>
                    <Text style={[s.josephine, s.textTitleReco]}>
                      Principaux fruits et légumes de saison en :
                    </Text>

                    <Form style={{ padding: 0, width: '100%' }}>
                      <Picker
                        mode="dropdown"
                        iosHeader={this.state.selectedMonth}
                        iosIcon={<Icon name="arrow-down" />}
                        selectedValue={this.state.selectedMonth}
                        placeholder={month}
                        placeholderStyle={{
                          color: '#3C8874',
                          letterSpacing: 1,
                          fontSize: hp('3%'),
                          fontWeight: 'bold',
                          fontFamily: 'josephine',
                          textAlign: 'center',
                          margin: 0,
                          padding: 0,
                          textTransform: 'capitalize',
                        }}
                        textStyle={{
                          color: '#3C8874',
                          letterSpacing: 1,
                          fontSize: hp('3%'),
                          fontWeight: 'bold',
                          fontFamily: 'josephine',
                          textAlign: 'center',
                          margin: 0,
                          padding: 0,
                        }}
                        placeholderIconColor="#007aff"
                        onValueChange={this.onValueChange.bind(this)}
                      >
                        <Picker.Item label="Janvier" value="0" />
                        <Picker.Item label="Février" value="1" />
                        <Picker.Item label="Mars" value="2" />
                        <Picker.Item label="Avril" value="3" />
                        <Picker.Item label="Mai" value="4" />
                        <Picker.Item label="Juin" value="5" />
                        <Picker.Item label="Juillet" value="6" />
                        <Picker.Item label="Août" value="7" />
                        <Picker.Item label="Septembre" value="8" />
                        <Picker.Item label="Octobre" value="9" />
                        <Picker.Item label="Novembre" value="10" />
                        <Picker.Item label="Décembre" value="11" />
                      </Picker>
                    </Form>
                  </View>
                  <Content>{content}</Content>
                </View>
              </ScrollView>
            </ScrollView>
          </Tab>
        </Tabs>
      </View>
    );
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Next',
      headerRight: (
        <Ionicons
          onPress={() => navigation.navigate('AccountScreen')}
          name="ios-home"
          style={{ marginRight: 25 }}
          color="white"
          size={30}
        />
      ),
    };
  };
}

mapStateToProps = state => {
  return { allDataFromDB: state.allDataFromDB, dataSavedFromReducer: state.foodSaved };
};

export default connect(
  mapStateToProps,
  null,
)(AccountScreen);
