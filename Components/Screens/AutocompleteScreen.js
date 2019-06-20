import React from 'react';
import { Icon, Text } from 'react-native-elements';
import { View, Animated, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Avatar, Badge } from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Autocomplete from 'react-native-autocomplete-input';
var s = require('./cssGlobal');

export default class AutocompleteScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
      query: '',
      queryImg: '',
      fruit: [],
      search: '',
    };
  }
  componentDidMount() {
    this.setState({
      query: '',
    });
  }

  static renderFruit() {
    return (
      <View>
        <Text>{allDataFromDB.nameFR}</Text>
      </View>
    );
  }

  _filterData(query, state) {
    if (query === '') {
      return [];
    }
    const data = this.props.allDataFromDB;
    const regex = new RegExp(`${query.trim()}`);
    return data.filter(
      data => data.nameFR.search(regex) >= 0,
      data => data.image.search(regex) >= 0,
    );
  }

  updateSearch = search => {
    this.setState({ search });
  };
  handleDataFromAutocomplete = (nameFR, image) => {
    this.setState({
      query: nameFR,
      queryImg: image,
    });
    this.props.foodValidatedFromSearch
    this.props.refreshAutocomplete
    this.props.handleDataFromAutocomplete(nameFR);
  };

  render() {
    if (this.props.refreshAutocomplete) {
      console.log('OKOKOKOK---------------------_>');
    }
    const { query } = this.state;
    const data = this._filterData(query);
    let content = (
      <Autocomplete
        listStyle={styles.listContainerStyle}
        listContainerStyle={styles.listContainerStyle}
        containerStyle={styles.containerInput}
        inputContainerStyle={styles.input}
        style={styles.autocomplete}
        data={data}
        placeholder="Cherchez votre aliment"
        onChangeText={search => this.setState({ query: search })}
        renderItem={({ image, nameFR }) => (
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.handleDataFromAutocomplete(nameFR, image)}
            >
              <Image
                style={{ width: 30, height: 30, marginRight: 10, resizeMode: 'center' }}
                source={{ uri: image }}
              />
              <Text style={{ position: 'relative', top: 5 }}>{nameFR}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    );
    if (this.props.foodValidatedFromSearch) {
      content = (
        <View style={{ zIndex: 3000 }}>
          <Avatar
            rounded
            source={{ uri: this.state.queryImg }}
            overlayContainerStyle={{ backgroundColor: 'rgba(60, 136, 116, 1)', padding: 10 }}
            containerStyle={{
              height: 75,
              width: 75,
              position: 'absolute',
              top: hp('15%'),
              left: wp('0%'),
              zIndex: 100,
            }}
          />
          <Badge
            badgeStyle={{
              zIndex: 10,
              position: 'absolute',
              right: 0,
              left: wp('7%'),
              top: hp('15%'),
              backgroundColor: 'rgba(60, 136, 116, 1)',
              borderWidth: 1,
              borderColor: '#3c8874',
              height: 75,
              width: '80%',
              borderRadius: 5,
              marginLeft: 25,
            }}
            value={<Text style={{ color: '#F2FFFF', fontSize: hp('4%') }}>{this.state.query}</Text>}
          />
        </View>
      );
    }

    return (
      <View style={{ height: '100%' }}>
        <View style={styles.autocompleteContainer}>{content}</View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  autocompleteContainer: {
    flex: 1,
    position: 'absolute',
    left: '5%',
    right: '5%',
    top: '20%',
    maxWidth: '100%',
  },
  button: {
    flexDirection: 'row',
  },
  itemText: {
    zIndex: 4000,
    height: 'auto',
    width: 'auto',
  },
  autocomplete: {
    backgroundColor: '#F2FFFF',
    color: '#000',
    height: hp('8%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.19,
    paddingLeft: 10,
    shadowRadius: 4,
    elevation: 12,
    width: '100%',
    fontSize: hp('2%'),
    borderRadius: 5,
  },
  inputResponse: {
    fontSize: 35,
    color: '#F2FFFF',
    fontWeight: 'bold',
    backgroundColor: '#3C8874',
    padding: 15,
    paddingTop: 5,
    borderRadius: 25,
    overflow: 'hidden',
  },
  containerInput: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 3000,
  },
  input: {
    borderWidth: 0,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderColor: '#3C8874',
  },
  listContainerStyle: {
    position: 'relative',
    maxHeight: hp('50%'),
    padding: 10,
    paddingTop: 3,
    zIndex: 3500,
  },
  iconRefresh: {
    position: 'absolute',
    // width:20,
    top: 2.5,
    right: 5,
  },
});
