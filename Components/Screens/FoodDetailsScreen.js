import React from 'react';
import { Image } from 'react-native';
import { ListItem, Left, Body, Text } from 'native-base';
//  ! Désactivation de la modale pour les fruits et légumes // import ModalScreen from './ModalFood';
var s = require('./cssGlobal');

export default class FoodDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  handleOpen = () => {
    this.setState({
      visible: true,
    });
  };

  handleClose = () => {
    this.setState({
      visible: false,
    });
  };

  render = () => {
    let seasonAllYear = false;
    this.props.seasonJan &&
    this.props.seasonFev &&
    this.props.seasonMar &&
    this.props.seasonAv &&
    this.props.seasonMai &&
    this.props.seasonJuin &&
    this.props.seasonJui &&
    this.props.seasonAo &&
    this.props.seasonSept &&
    this.props.seasonOct &&
    this.props.seasonNov &&
    this.props.seasonDec
      ? (seasonAllYear = true)
      : (seasonAllYear = false);

    let tableSeason = [];
    this.props.seasonJan ? (tableSeason[0] = 'Janvier') : (tableSeason[0] = '');
    this.props.seasonFev ? (tableSeason[1] = 'Février') : (tableSeason[1] = '');
    this.props.seasonMar ? (tableSeason[2] = 'Mars') : (tableSeason[2] = '');
    this.props.seasonAv ? (tableSeason[3] = 'Avril') : (tableSeason[3] = '');
    this.props.seasonMai ? (tableSeason[4] = 'Mai') : (tableSeason[4] = '');
    this.props.seasonJuin ? (tableSeason[5] = 'Juin') : (tableSeason[5] = '');
    this.props.seasonJui ? (tableSeason[6] = 'Juillet') : (tableSeason[6] = '');
    this.props.seasonAo ? (tableSeason[7] = 'Août') : (tableSeason[7] = '');
    this.props.seasonSept ? (tableSeason[8] = 'Septembre') : (tableSeason[8] = '');
    this.props.seasonOct ? (tableSeason[9] = 'Octobre') : (tableSeason[9] = '');
    this.props.seasonNov ? (tableSeason[10] = 'Novembre') : (tableSeason[10] = '');
    this.props.seasonDec ? (tableSeason[11] = 'Décembre') : (tableSeason[11] = '');

    return (
      <ListItem avatar style={{width:'90%'}}>
        <Left style={{ paddingTop: 5 }}>
          <Image
            source={{ uri: this.props.img }}
            style={{ width: 24, height: 24, paddingTop: 0 }}
          />
        </Left>
        <Body>
          <Text onPress={() => this.handleOpen()} style={[s.josephine]}>
            {this.props.name}
          </Text>
        </Body>

        {/* 
        // ! Désactivation de la modale pour les fruits et légumes
        <Right style={{margin:0, padding: 0}}>
          <Ionicons 
            onPress={ () => this.handleOpen()} 
            name="ios-arrow-round-forward"         
            style={{padding:0}} 
            color="black" 
            size={15}
          />
        </Right>
        <ModalScreen 
          name = {this.props.name}
          img = {this.props.img}
          seasonAllYear= {seasonAllYear}
          Janvier={tableSeason[0]}
          Fevrier={tableSeason[1]}
          Mars={tableSeason[2]}
          Avril={tableSeason[3]}
          Mai={tableSeason[4]}
          Juin={tableSeason[5]}
          Juillet={tableSeason[6]}
          Aout={tableSeason[7]}
          Septembre={tableSeason[8]}
          Octobre={tableSeason[9]}
          Novembre={tableSeason[10]}
          Decembre={tableSeason[11]}
          modalVisible={this.state.visible}
          openingModalParent={this.handleOpen}
          closingModalParent={this.handleClose}
        /> */}
      </ListItem>
    );
  };
}
