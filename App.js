import React from 'react';
import Navigation from './Components/Navigation';
import { AppLoading, Font } from 'expo';
import Intro from './Components/Screens/IntroScreen';
// importation des données
import store from './configureStore';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import '@expo/vector-icons';
import { Provider } from 'react-redux';
import { AsyncStorage } from 'react-native';
import isEmpty from './isEmpty';
console.disableYellowBox = true;

// Affichage de l'app
export default class App extends React.Component {
  state = {
    loaded: false,
    introDone: false,
  };

  componentWillMount = async () => {
    this._loadAssetsAsync();
    await AsyncStorage.getItem('once').then(value => {
      this.setState({
        introDone: value,
      });
    });
  };

  _loadAssetsAsync = async () => {
    await Font.loadAsync({
      openSans: require('./assets/fonts/OpenSansCondensed-Light.ttf'),
      josephine: require('./assets/fonts/JosefinSans-Regular.ttf'),
    });
    this.setState({ loaded: true });
  };

  _changeState = async () => {
    await AsyncStorage.setItem('once', 'true').then(() => {
      this.setState({
        introDone: true,
      });
    });
    //console.log(this.state.introDone);
  };

  render() {
    let persistor = persistStore(store);

    if (!this.state.introDone) {
      return <Intro _changeState={this._changeState} />;
    } else if (!this.state.loaded && this.state.introDone) {
      return <AppLoading />;
    } else {
      return (
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Navigation />
          </PersistGate>
        </Provider>
      );
    }
  }
}
