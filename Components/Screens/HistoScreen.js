import React from 'react';
import { AsyncStorage, Image, ScrollView, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Overlay, Button } from 'react-native-elements';
import { Tab, Tabs, Container, Header, Content, List, Text } from 'native-base';
import FoodDetails from './FoodDetailsScreen';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import InfoListItem from './InfoListItem';
var s = require('./cssGlobal');

class RecoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foodDisplayed: [],
      name: '',
      modalVisible: false,
    };
  }

  componentDidMount = async () => {
    let foodSaved = await AsyncStorage.getItem('foods');
    foodSaved = await JSON.parse(foodSaved);
    let foodDisplayedCopy = [...this.state.foodDisplayed];
    if (foodSaved != null) {
      foodDisplayedCopy = foodSaved;
    }
    this.setState({
      foodDisplayed: foodDisplayedCopy,
    });
    console.log('state de foodDisplayed --->', this.state.foodDisplayed);
  };

  componentDidUpdate = async prevProps => {
    let foodSaved = await AsyncStorage.getItem('foods');
    foodSaved = await JSON.parse(foodSaved);

    const { dataSavedFromReducer } = this.props;
    if (dataSavedFromReducer !== prevProps.dataSavedFromReducer) {
      let foodDisplayedCopy = [...this.state.foodDisplayed];
      foodDisplayedCopy = dataSavedFromReducer;
      this.setState({
        foodDisplayed: foodDisplayedCopy,
      });
    }
    this.state.foodDisplayed.map((data, i) => {
      if (data.Food.nameFR) {
        //console.log('toto');
      } else {
        //console.log('marche pas');
      }
    });
  };

  deleteItem(data) {
    const index = this.state.foodDisplayed.indexOf(data);
    const foodDisplayedCopy = [...this.state.foodDisplayed];
    foodDisplayedCopy.splice(index, 1);
    this.setState({
      foodDisplayed: foodDisplayedCopy,
    });
    AsyncStorage.setItem('foods', JSON.stringify(foodDisplayedCopy));
  }

  render = () => {
    let welcome = 'Bienvenue ';
    let total = 0;
    let content = (
      <View>
        <TouchableOpacity
          style={s.buttonHistorique}
          onPress={() => this.props.navigation.navigate('SearchScreen')}
          underlayColor="#fff"
        >
          <Text style={[s.buttonTextHome, s.josephine]}>Panier vide ! Rajoutez un aliment</Text>
        </TouchableOpacity>
        <Image
          source={require('../../assets/image/placeholder.png')}
          style={{ width: '100%', resizeMode: 'contain', flex: 0.5 }}
        />
      </View>
    );

    if (this.state.foodDisplayed !== null && this.state.foodDisplayed.length == 0) {
      content = (
        <View>
          <TouchableOpacity
            style={s.buttonHistorique}
            onPress={() => this.props.navigation.navigate('SearchScreen')}
            underlayColor="#fff"
          >
            <Text style={[s.buttonTextHome, s.josephine]}>Panier vide ! Rajoutez un aliment</Text>
          </TouchableOpacity>
          <Image
            source={require('../../assets/image/placeholder.png')}
            style={{ width: '100%', resizeMode: 'contain', flex: 0.5 }}
          />
        </View>
      );
    } else if (this.state.foodDisplayed.length > 0) {
      total = this.state.foodDisplayed.reduce((acc, cur) => {
        acc += cur.Food.emission * cur.Quantity;
        return acc;
      }, 0);
      content = this.state.foodDisplayed.map((data, i) => {
        return (
          <InfoListItem
            key={i}
            image={data.Food.image}
            name={data.Food.nameFR}
            quantity={data.Quantity}
            emission={data.Food.emission.toFixed(1)}
            function={() => this.deleteItem(data)}
          />
        );
      });
    }
    var carAndCarbone = total / 112;
    var TgvAndCarbone = total / 2.4;
    var EuroStarAndCarbone = total / 11.45;
    var BusAndCarbone = total / 93.5;
    var MetroAndCarbone = total / 3.4;
    var TramwayAndCarbone = total / 2.8;

    return (
      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={s.contentContainerResultHistoric}
      >
        <Container>
          <Header
            style={{
              flexDirection: 'column',
              backgroundColor: '#3C8874',
              height: 130,
              paddingTop: 0,
            }}
          >
            <Text
              style={{
                fontSize: hp('3.0%'),
                width: '100%',
                fontFamily: 'josephine',
                color: 'white',
                textAlign: 'center',
                padding: hp('0.5%'),
              }}
            >
              Consommation historique
            </Text>
            <Text
              style={{
                padding: hp('1%'),
                fontSize: hp('2.0%'),
                fontFamily: 'josephine',
                color: 'white',
                textAlign: 'center',
                width: '100%',
              }}
            >
              Empreinte carbone totale : {total.toFixed(0)} g CO2
            </Text>
            <Button
              title="A quoi correspond cette émission?"
              titleStyle={[s.josephine, s.white]}
              onPress={() => {
                this.setState({ modalVisible: true });
              }}
              buttonStyle={{ backgroundColor: '#F2FFFF', borderRadius: 25 }}
              titleStyle={{ color: '#3C8874', fontSize: hp('1.5%') }}
            />
            <Overlay
              borderRadius={25}
              height={300}
              isVisible={this.state.modalVisible}
              overlayBackgroundColor="#3C8874"
              height={325}
              isVisible={this.state.modalVisible}
              overlayBackgroundColor="#F2FFFF"
              onBackdropPress={() => this.setState({ modalVisible: false })}
              containerStyle={{ padding: 15 }}
            >
              <View style={[s.directionColumn, s.centerOverlay]}>
                <Text style={[s.textPrimary, s.josephine, s.overlayText]}>
                  Votre panier correspond à :
                </Text>
                <View style={{ display: 'flex', flexDirection: 'row', alignContent: 'center' }}>
                  <Text style={[s.josephine, s.directionRow, s.overlaySubtitle]}>
                    {carAndCarbone.toFixed(1)}
                    km de voiture
                    <Image
                      source={require('../../assets/image/car.png')}
                      style={{
                        width: 24,
                        height: 24,
                        top: 100,
                        left: 10,
                        position: 'relative',
                        marginLeft: 20,
                      }}
                    />
                  </Text>
                </View>

                <Text style={[s.josephine, s.directionRow, s.overlaySubtitle]}>
                  {TgvAndCarbone.toFixed(1)}
                  km de TGV
                  <Image
                    source={require('../../assets/image/tgv.png')}
                    style={{
                      width: 24,
                      height: 24,
                      top: 10,
                      left: 10,
                      position: 'relative',
                      marginLeft: 20,
                    }}
                  />
                </Text>
                <Text style={[s.josephine, s.directionRow, s.overlaySubtitle]}>
                  {EuroStarAndCarbone.toFixed(1)}
                  km d'Eurostar
                  <Image
                    source={require('../../assets/image/eurostar.png')}
                    style={{
                      width: 24,
                      height: 24,
                      top: 10,
                      left: 10,
                      position: 'relative',
                      marginLeft: 20,
                    }}
                  />
                </Text>
                <Text style={[s.josephine, s.directionRow, s.overlaySubtitle]}>
                  {BusAndCarbone.toFixed(1)}
                  km de bus
                  <Image
                    source={require('../../assets/image/bus.png')}
                    style={{
                      width: 24,
                      height: 24,
                      top: 10,
                      left: 10,
                      position: 'relative',
                      marginLeft: 20,
                    }}
                  />
                </Text>
                <Text style={[s.josephine, s.directionRow, s.overlaySubtitle]}>
                  {MetroAndCarbone.toFixed(1)}
                  km de métro
                  <Image
                    source={require('../../assets/image/metro.png')}
                    style={{
                      width: 24,
                      height: 24,
                      top: 10,
                      left: 10,
                      position: 'relative',
                      marginLeft: 20,
                    }}
                  />
                </Text>
                <Text style={[s.josephine, s.directionRow, s.overlaySubtitle]}>
                  {TramwayAndCarbone.toFixed(1)}
                  km de tramway
                  <Image
                    source={require('../../assets/image/tramway.png')}
                    style={{
                      width: 24,
                      height: 24,
                      top: 10,
                      left: 10,
                      position: 'relative',
                      marginLeft: 20,
                    }}
                  />
                </Text>
              </View>
            </Overlay>
          </Header>
          <Content>
            <List>{content}</List>
          </Content>
        </Container>
      </ScrollView>
    );
  };
}

mapStateToProps = state => {
  return { allDataFromDB: state.allDataFromDB, dataSavedFromReducer: state.foodSaved };
};
export default connect(
  mapStateToProps,
  null,
)(RecoScreen);
