import React from 'react';
import { Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { connect } from 'react-redux';
// Imports of my nav components
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
// Imports of my screens components
import HomeScreen from './Screens/HomeScreen';
import AccountScreen from './Screens/AccountScreen';
import HistoScreen from './Screens/HistoScreen';
import ResultScreenFromInput from './Screens/ResultScreenFromInput';
import ChoicesScreen from './Screens/ChoicesScreen';
import LogoScreen from './Screens/LogoScreen';
import ConfirmationScreen from './Screens/ConfirmationScreen';
import SearchScreen from './Screens/SearchScreen';
//import UserScreen from './Screens/UserScreen';
import InformationScreen from './Screens/InformationScreen';
import FoodDetailsScreen from './Screens/FoodDetailsScreen';
import IntroScreen from './Screens/IntroScreen';

// Creation of my Bottom Navigation (the navigation with a visible tab bar)
const MainNavigator = createBottomTabNavigator(
  {
    AccountScreen: AccountScreen,
    SearchScreen: SearchScreen,
    HistoScreen: HistoScreen,
  },
  {
    componentDidMount() {
      // Or set a specific startFrame and endFrame with:
      this.animation.play(0, 100);
    },
    
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        if (navigation.state.routeName == 'SearchScreen') {
          return (
            <Icon
              raised
              reverse
              name="ios-search"
              size={hp('4%')}
              type="ionicon"
              color="#3C8874"
              containerStyle={{ marginTop: hp('-3%') }}
              onClick={this.forceUpdateHandler}
            />
          );
        } else {
          var iconName;
          var outline = focused ? '' : '';
          if (navigation.state.routeName == 'UserScreen') {
            Platform.os === 'ios' ? (iconName = 'ios-contact') : (iconName = 'md-contact');
          } else if (navigation.state.routeName == 'AccountScreen') {
            Platform.OS === 'ios' ? (iconName = 'ios-home') : (iconName = 'md-home');
          } else if (navigation.state.routeName == 'HistoScreen') {
            Platform.OS === 'ios' ? (iconName = 'ios-basket') : (iconName = 'md-basket');
          }
          return <Ionicons name={iconName + outline} size={25} color={tintColor} />;
        }
      },
    }),
    // This part is to handle the style of the bottom tab bar
    tabBarOptions: {
      activeTintColor: '#3C8874',
      inactiveTintColor: 'gray',
      showLabel: false,
    },
  },
);

// Here, I can create the global navigation which both contains my three first page (without the bottom tab) as well as the whole MainNavigator component
var StackNavigator = createStackNavigator({
  // pages de ma navigation sans bottom
  // HomeScreen: HomeScreen,
  HomeScreen: {
    screen: HomeScreen,
    headerMode: 'none',
    navigationOptions: {
      headerStyle: {
        height: 0,
        marginTop: -50,
      },
    },
  },
  IntroScreen: {
    screen: IntroScreen,
    headerMode: 'modal',
  },
  SearchScreen: {
    screen: SearchScreen,
    headerMode: 'modal',
    header: null,
    navigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#3C8874',
        paddingBottom: 15,
        height: 75,
        fontFamily: 'josephine',
      },
      headerTitle: <LogoScreen />,
    },
  },
  FoodDetailsScreen: {
    screen: FoodDetailsScreen,
    headerMode: 'modal',
    header: null,
    navigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#3C8874',
        paddingBottom: 15,
        height: 75,
        fontFamily: 'josephine',
      },
      headerTitle: <LogoScreen />,
    },
  },
  // CameraChildScreen: {
  //   screen: CameraChildScreen,
  //   headerMode: 'none',
  //   header: null,
  //   navigationOptions: {
  //     header: null,
  //   },
  // },
  ChoicesScreen: {
    screen: ChoicesScreen,
    headerMode: 'modal',
    header: null,
    navigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#3C8874',
        paddingBottom: 15,
        height: 75,
        fontFamily: 'josephine',
      },
      headerBackTitle: 'Retour',
      headerTitle: <LogoScreen />,
    },
  },
  ConfirmationScreen: {
    screen: ConfirmationScreen,
    headerMode: 'modal',
    header: null,
    navigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#3C8874',
        paddingBottom: 15,
        height: 75,
        fontFamily: 'josephine',
      },
      headerBackTitle: 'Retour',
      headerTitle: <LogoScreen />,
    },
  },
  // ResultScreenFromCamera: {
  //   screen: ResultScreenFromCamera,
  //   headerMode: 'modal',
  //   header: null,
  //   navigationOptions: {
  //     headerTintColor: '#fff',
  //     headerStyle: {
  //       backgroundColor: '#3C8874',
  //       paddingBottom: 15,
  //       height: 75,
  //       fontFamily: 'josephine',
  //     },
  //     headerTitle: <LogoScreen />,
  //   },
  // },
  ResultScreenFromInput: {
    screen: ResultScreenFromInput,
    headerMode: 'modal',
    header: null,
    navigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#3C8874',
        paddingBottom: 15,
        height: 75,
        fontFamily: 'josephine',
      },
      headerTitle: <LogoScreen />,
    },
  },
  // MainNavigator must my put inside the stack navigator
  MainNavigator: {
    screen: MainNavigator,
    headerMode: 'modal',
    header: 'null',
    navigationOptions: {
      headerLeft: <InformationScreen />,
      //headerRight: <UserScreen />,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#3C8874',
        paddingBottom: 15,
        height: 60,
        fontFamily: 'josephine',
      },
      headerTitle: <LogoScreen />,
    },
  },
});

mapStateToProps = state => {
  return { dataSaved: state.foodSaved, userSaved: state.userSaved };
};

connect(
  mapStateToProps,
  null,
)(AccountScreen);

export default (Navigation = createAppContainer(StackNavigator));
