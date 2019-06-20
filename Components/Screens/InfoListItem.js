import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export default class InfoListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foodDisplayed: [],
      showAlert: false,
    };
  }

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

  render() {
    return (
      <ListItem avatar>
        <Left>
          <Thumbnail
            source={{ uri: this.props.image }}
            style={{ width: 42, height: 42, overflow: 'visible' }}
          />
        </Left>
        <Body>
          <Text style={{ fontFamily: 'josephine' }}>{this.props.name}</Text>
          <Text note style={{ fontFamily: 'josephine' }}>
            Facteur d'émission :
          </Text>
          <Text note style={{ fontFamily: 'josephine' }}>
            {this.props.emission} g CO2 / g
          </Text>
          <Text note style={{ fontFamily: 'josephine' }}>
            Poids : {this.props.quantity} g
          </Text>
        </Body>
        <Right
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            paddingBottom: 0,
            marginBottom: 0,
            borderBottomWidth: 0,
          }}
        >
          <Text style={{ padding: 0, marginRight: 15, fontFamily: 'josephine' }} />
          <TouchableOpacity
            style={{
              padding: 6,
              width: 45,
              height: 45,
              backgroundColor: '#E61C27',
              borderRadius: 25,
            }}
            onPress={this.props.function}
          >
            <Ionicons
              name="ios-trash"
              size={25}
              style={{ margin: 0, paddingTop: 3, textAlign: 'center' }}
              type="ionicon"
              color="#fff"
            />
          </TouchableOpacity>
        </Right>
      </ListItem>
    );
  }
}
