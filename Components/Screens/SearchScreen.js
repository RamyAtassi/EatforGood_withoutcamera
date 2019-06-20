import React from 'react';
import {
  View,
  Animated,
  Alert,
  TouchableOpacity,
  Image,
  Switch,
  ImageBackground,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Text, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import Autocomplete from './AutocompleteScreen';
import { Item, Picker, Icon } from 'native-base';

var s = require('./cssGlobal');

class SearchScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Home',
      headerRight: (
        <Ionicons
          onPress={() => navigation.navigate('AccountScreen')}
          name="ios-home"
          style={{ marginRight: 25 }}
          color="white"
          size={30}
        />
      ),
      headerLeft: (
        <Button
          icon={{ name: 'arrow-left', type: 'font-awesome', color: 'white' }}
          title="Back"
          onPress={() => navigation.navigate('BeforeNavigateScreen')}
          buttonStyle={{ backgroundColor: 'transparent' }}
        />
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
      pressStatusLocal: false,
      pressStatusFrance: false,
      pressStatusEurope: false,
      pressStatusMonde: false,
      foodValidated: false,
      search: '',
      quantity: 0,
    };
  }
  componentDidUpdate() {
    this.props.navigation.navigate('SearchScreen');
  }
  onValueChange = value => {
    this.setState({
      quantity: value,
    });
  };
  handleDataFromAutocomplete = name => {
    if (name == 'novalidation') {
      //console.log('handleDataFromAutocomplete, pas encore de validation');
      this.setState({
        search: '',
        foodValidated: false,
      });
    } else {
      this.setState({
        search: name,
        foodValidated: true,
      });
    }
  };

  handleValidation = async () => {
    const { allDataFromDB } = this.props;
    for (var i = 0; i < allDataFromDB.length; i++) {
      if (this.state.search.toLowerCase() === allDataFromDB[i].nameFR.toLowerCase()) {
        this.props.handleSearch(
          this.props.allDataFromDB[i],
          this.state.pressStatusLocal,
          this.state.pressStatusFrance,
          this.state.pressStatusEurope,
          this.state.pressStatusMonde,
          this.state.quantity,
        );
        await this.setState({
          foodValidated: true,
        });
        break;
      }
    }
    if (this.state.search == '') {
      Alert.alert("Il faut d'abord sélectionner un aliment !", '', [{ text: 'OK' }], {
        cancelable: false,
      });
    }
    // Alerte si l'élément rentré ne correspond pas à un fruit / légume répertorié
    else if (this.state.quantity == 0) {
      Alert.alert("Il faut d'abord sélectionner une quantité", '', [{ text: 'OK' }], {
        cancelable: false,
      });
    } else if (!this.state.foodValidated && this.state.search !== '') {
      Alert.alert(
        "Désolé, le produit recherché n'est pas encore répertorié ...",
        '',
        [{ text: 'OK' }],
        { cancelable: false },
      );
    }
    // Alerte si la provenance n'est pas renseignée
    else if (
      this.state.foodValidated &&
      this.state.pressStatusLocal == false &&
      this.state.pressStatusFrance == false &&
      this.state.pressStatusEurope == false &&
      this.state.pressStatusMonde == false
    ) {
      Alert.alert('Vous devez choisir une provenance pour votre produit', '', [{ text: 'OK' }], {
        cancelable: false,
      });
    } else {
      await this.setState({
        foodValidated: false,
        search: '',
      });
      this.setState({ foodValidated: false, search: '' });
      this.props.navigation.navigate('ResultScreenFromInput');
    }
  };
  // les 4 fonctions Toogle pour la provenance
  handleToogle1 = () => {
    if (this.state.pressStatusLocal) {
      this.setState({
        pressStatusLocal: false,
      });
    } else {
      this.setState({
        pressStatusLocal: true,
        pressStatusFrance: false,
        pressStatusEurope: false,
        pressStatusMonde: false,
      });
    }
  };

  handleToogle2() {
    if (this.state.pressStatusFrance) {
      this.setState({
        pressStatusFrance: false,
      });
    } else {
      this.setState({
        pressStatusFrance: true,
        pressStatusLocal: false,
        pressStatusEurope: false,
        pressStatusMonde: false,
      });
    }
  }

  handleToogle3() {
    if (this.state.pressStatusEurope) {
      this.setState({ pressStatusEurope: false });
    } else {
      this.setState({
        pressStatusFrance: false,
        pressStatusLocal: false,
        pressStatusEurope: true,
        pressStatusMonde: false,
      });
    }
  }
  handleRefresh = () => {
    this.setState({
      search: '',
      foodValidated: false,
    });
  };
  handleToogle4() {
    if (this.state.pressStatusMonde) {
      this.setState({ pressStatusMonde: false });
    } else {
      this.setState({
        pressStatusFrance: false,
        pressStatusLocal: false,
        pressStatusEurope: false,
        pressStatusMonde: true,
      });
    }
  }

  render = () => {
    console.log(this.state.foodValidated, this.state.search, '<---------------------');

    let content = { flex: 1, width: '100%', position: 'absolute', top: 0, height: '40%' };
    if (this.state.foodValidated) {
      content = { flex: 1, width: '100%', position: 'absolute', top: 0, height: '30%' };
      display = { position: 'absolute', height: '60%', top: '40%' };
    } else {
      content = { flex: 1, width: '100%', position: 'absolute', top: 0, height: '100%' };
      display = { height: 0, display: 'none' };
    }

    return (
      <View style={{ flex: 6, backgroundColor: '#F2FFFF', zIndex: 1 }}>
        <View style={content}>
          <ImageBackground
            source={require('../../assets/image/background_search.jpg')}
            style={{ width: '100%', height: '100%' }}
          >
            <Autocomplete
              style={{ zIndex: 3000, borderRadius: 40, borderWidth: 3 }}
              foodValidatedFromSearch={this.state.foodValidated}
              allDataFromDB={this.props.allDataFromDB}
              handleDataFromAutocomplete={this.handleDataFromAutocomplete}
              refreshAutocomplete={this.refreshAutocomplete}
            />
          </ImageBackground>
        </View>
        <View style={display}>
          <View>
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
          <Text style={[s.josephine, s.textInstruction]}>D'où vient votre produit?</Text>
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
                value={this.state.pressStatusMonde}
                ios_backgroundColor="#d6ede7"
              />
              <Text style={[s.fsm, s.josephine, s.mt]}>Monde</Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: '#F2FFFF',
              justifyContent: 'flex-end',
              marginLeft: 50,
              marginRight: 50,
            }}
          >
            <TouchableOpacity
              style={s.buttonSearch}
              underlayColor="#fff"
              onPress={this.handleValidation}
            >
              <Text style={[s.buttonTextSearch, s.josephine]}>Valider</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
}

mapStateToProps = state => {
  //console.log(state.allDataFromDB, "<--- Data reçue dans Search Screen")
  return { allDataFromDB: state.allDataFromDB };
};

mapDispatchToProps = dispatch => {
  return {
    handleSearch: function(Food, Local, France, Europe, Monde, Quantity) {
      dispatch({
        type: 'search',
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
)(SearchScreen);
