import React from 'react';
import {View, Modal, Image, TouchableHighlight} from 'react-native';
import {Text, Icon} from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
var s = require('./cssGlobal');

export default class ModalScreen extends React.Component {

  constructor (props){
    super(props);
  }

  render(){

    let seasonAllYear = <Text></Text>

    this.props.seasonAllYear?
    (seasonAllYear = <Text style={[s.josephine, s.modaltextTitle]}>L'aliment est toujours de saison!</Text>)
    : seasonAllYear = null;

    let seasonDetails = <View></View>
    this.props.seasonAllYear?
    seasonDetails = null 
    :
    seasonDetails = <View style={{marginLeft: hp('8%'), marginRight: hp('8%')}}>
    <Text style={[s.josephine, s.modaltextTitle]}> 
      Les mois de saison sont :            
    </Text>
    <Text style={[s.josephine]}>
      {this.props.Janvier}  
    </Text>
    <Text style={[s.josephine]}>
      {this.props.Fevrier}  
    </Text>
    <Text style={[s.josephine]}>
      {this.props.Mars}  
    </Text>
    <Text style={[s.josephine]}>
      {this.props.Avril}  
    </Text>
    <Text style={[s.josephine]}>
      {this.props.Mai}  
    </Text>
    <Text style={[s.josephine]}>
      {this.props.Juin}  
    </Text>
    <Text style={[s.josephine]}>
      {this.props.Juillet}  
    </Text>
    <Text style={[s.josephine]}>
      {this.props.Aout}  
    </Text>
    <Text style={[s.josephine]}>
      {this.props.Septembre}  
    </Text>
    <Text style={[s.josephine]}>
      {this.props.Octobre}  
    </Text>
    <Text style={[s.josephine]}>
      {this.props.Novembre}  
    </Text>
    <Text style={[s.josephine]}>
      {this.props.Decembre}  
    </Text>
    </View> 
    
  
    return(
        <Modal 
        animationType="fade" 
        transparent={false} 
        visible={this.props.modalVisible}
      >     
        <View style= {{flex:1}}>
          <View style= {{flex:0.4,backgroundColor:'#3C8874', alignItems:"center", justifyContent: "center"}}>
            <Image 
              source={{uri: this.props.img}} 
              style={{width: "75%", height: "75%", resizeMode:'contain',  padding: '10%', margin: '10%'}} 
            />                   
          </View>          
          <View style= {{flex:0.6, resizeMode: 'contain'}}>
            <Text style={[s.josephine, s.modaltextTitle]}> 
              {this.props.name}
            </Text>
              {seasonAllYear}
              {seasonDetails}        
          </View>
      </View>
      <TouchableHighlight 
        style={{position:'absolute', top:50, right:20}}
        onPress={() => this.props.closingModalParent()} 
      >
        <Icon
          name='ios-close-circle'
          size={46}
          type='ionicon'
          color='#F2FFFF'
        />
      </TouchableHighlight>
    </Modal>
    )
  }
}





