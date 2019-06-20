import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';
import LottieView from 'lottie-react-native';
import { Ionicons } from '@expo/vector-icons';
let s = require('./cssGlobal');

class ChoicesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fruitName: '',
      noFruit: false,
    };
  }

  componentDidMount = () => {
    this.animation.play(0, 100);
  };

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

  componentDidUpdate = prevProps => {
    const { dataFromCamera } = this.props;

    if (dataFromCamera !== prevProps.dataFromCamera) {
      let fruitAll = [];

      if (dataFromCamera[0] != undefined) {
        fruitAll.push(
          <TouchableOpacity
            style={[s.buttonChoice, s.josephine]}
            key="0"
            onPress={() => {
              this.props.handleConfirmation(0), this.props.navigation.navigate('ChoicesScreen');
            }}
            underlayColor="#fff"
          >
            <Text style={[s.buttonT, s.josephine]}>{dataFromCamera[0].article.nameFR}</Text>
          </TouchableOpacity>,
        );
        if (dataFromCamera[1] != undefined) {
          fruitAll.push(
            <TouchableOpacity
              style={[s.buttonChoice, s.josephine]}
              key="1"
              onPress={() => {
                this.props.handleConfirmation(1), this.props.navigation.navigate('ChoicesScreen');
              }}
              underlayColor="#fff"
            >
              <Text style={[s.buttonT, s.josephine]}>{dataFromCamera[1].article.nameFR}</Text>
            </TouchableOpacity>,
          );
        }
        if (dataFromCamera[2] != undefined) {
          fruitAll.push(
            <TouchableOpacity
              style={[s.buttonT, s.josephine]}
              key="2"
              onPress={() => {
                this.props.handleConfirmation(2), this.props.navigation.navigate('ChoicesScreen');
              }}
              underlayColor="#fff"
            >
              <Text style={[s.buttonT, s.josephine]}>{dataFromCamera[2].article.nameFR}</Text>
            </TouchableOpacity>,
          );
        }
        if (dataFromCamera[3] != undefined) {
          fruitAll.push(
            <TouchableOpacity
              style={[s.buttonT, s.josephine]}
              key="3"
              onPress={() => {
                this.props.handleConfirmation(3), this.props.navigation.navigate('ChoicesScreen');
              }}
              underlayColor="#fff"
            >
              <Text style={[s.buttonT, s.josephine]}>{dataFromCamera[3].article.nameFR}</Text>
            </TouchableOpacity>,
          );
        }
        if (dataFromCamera[4] != undefined) {
          fruitAll.push(
            <TouchableOpacity
              style={[s.buttonT, s.josephine]}
              key="4"
              onPress={() => {
                this.props.handleConfirmation(4), this.props.navigation.navigate('ChoicesScreen');
              }}
              underlayColor="#fff"
            >
              <Text style={[s.buttonT, s.josephine]}>{dataFromCamera[4].article.nameFR}</Text>
            </TouchableOpacity>,
          );
        }
        if (dataFromCamera[5] != undefined) {
          fruitAll.push(
            <TouchableOpacity
              style={[s.buttonT, s.josephine]}
              key="5"
              onPress={() => {
                this.props.handleConfirmation(5), this.props.navigation.navigate('ChoicesScreen');
              }}
              underlayColor="#fff"
            >
              <Text style={[s.buttonT, s.josephine]}>{dataFromCamera[5].article.nameFR}</Text>
            </TouchableOpacity>,
          );
        }

        this.setState({
          fruitName: fruitAll,
        });
      } else {
        this.setState({
          noFruit: true,
        });
      }
    }
  };

  render = () => {
    let fruitRender;
    let firstMessage = <Text>S'agit-il bien de l'aliment suivant?</Text>;
    let secondMessage = <Text />;

    if (this.state.fruitName == '') {
      firstMessage = (
        <Text style={{ justifyContent: 'center', alignItems: 'center' }}>
          En recherche de votre aliment ...
        </Text>
      );
      if (this.state.noFruit) {
        fruitRender = <Text> </Text>;
        firstMessage = (
          <Text style={{ justifyContent: 'center', alignItems: 'center' }}>
            {"Désolé on n'a rien identifié ... \nReprenez une photo"}
          </Text>
        );
        secondMessage = <Text />;
      } else {
        fruitRender = (
          <LottieView
            style={{ position: 'absolute', top: 50, left: '50%', marginLeft: -100, width: 200 }}
            ref={animation => {
              this.animation = animation;
            }}
            progress={this.state.progress}
            source={require('../../assets/loading.json')}
          />
        );
      }
    } else {
      fruitRender = this.state.fruitName;
      secondMessage = <Text>... ou reprenez une photo en cliquant sur Back</Text>;
    }

    return (
      <ScrollView contentContainerStyle={s.contentContainerConfirmation}>
        <View style={[s.view, s.josephine, s.mb]}>
          <View style={s.viewResponse}>
            <Text style={[s.titleConfirmation, s.josephine]}>{firstMessage}</Text>
          </View>
          {fruitRender}
        </View>
        <Text style={[s.titleConfirmation, s.josephine, s.secondMessage]}>{secondMessage}</Text>
      </ScrollView>
    );
  };
}

// My new container component
mapStateToProps = state => {
  return { dataFromCamera: state.data.dataFromCamera };
};

// My new container component
mapDispatchToProps = dispatch => {
  return {
    handleConfirmation: function(food) {
      dispatch({
        type: 'foodConfirmation',
        food: food,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChoicesScreen);
