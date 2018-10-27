import React, { Component } from 'react'
import { StatusBar, View } from 'react-native'
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation'
import Amplify from 'aws-amplify'
import debugFactory from 'debug'
import {
  AWS_REGION,
  AWS_IDENTITY_POOL_ID,
  AWS_USER_POOL_ID,
  AWS_USER_CLIENT_POOL_ID,
} from 'react-native-dotenv'

import Onboarding from './screens/Onboarding'
import SetupBirthDate from './screens/Setup/BirthDate'
import SetupPlace from './screens/Setup/Place'
import SetupConfirmation from './screens/Setup/Confirmation'
import Login from './screens/Login'
import SignUp from './screens/SignUp'
import CreateAccount from './screens/CreateAccount'
import Suscription from './screens/Suscription'
import ConfirmAccount from './screens/ConfirmAccount'
import Home from './screens/Home'
import Writing from './screens/Writing'
import Reading from './screens/Reading'
import Profile from './screens/Profile'
import Settings from './screens/Settings'
import Language from './screens/Language'
import Notifications from './screens/Notifications'
import AppLoading from './screens/AppLoading'
import Terms from './screens/Terms'
import About from './screens/About'

import { tabBarIcon } from './components/TabIcon'
import colors from './utils/colors'
import { setAuthHeader } from './utils/session'

debugFactory.enable('yester:*')

Amplify.configure({
  Auth: {
    identityPoolId: AWS_IDENTITY_POOL_ID,
    region: AWS_REGION,
    userPoolId: AWS_USER_POOL_ID,
    userPoolWebClientId: AWS_USER_CLIENT_POOL_ID,
    mandatorySignIn: true,
  },
  API: {
    endpoints: [{
      name: 'main',
      endpoint: 'https://uw3pxmvc70.execute-api.us-east-1.amazonaws.com/dev/',
    }],
  },
})

const SetupStack = createStackNavigator({
  SetupBirthDate,
  SetupPlace,
  SetupConfirmation,
}, {
  headerMode: 'none',
  initialRouteName: 'SetupBirthDate',
})

const FeedStack = createStackNavigator({
  Home,
  Writing,
  Reading,
}, {
  mode: 'modal',
  headerMode: 'none',
  initialRouteName: 'Home',
})

const SettingsStack = createStackNavigator({
  SettingsHome: Settings,
  Language,
  Notifications,
  Terms,
  About,
}, {
  mode: 'modal',
  headerMode: 'none',
  initialRouteName: 'SettingsHome',
})

const MainTab = createBottomTabNavigator({
  Feed: {
    screen: FeedStack,
    navigationOptions: () => ({
      tabBarIcon: tabBarIcon({
        active: require('./assets/feed.png'),
        inactive: require('./assets/feed-disabled.png'),
      }),
    }),
  },
  Profile: {
    screen: Profile,
    navigationOptions: () => ({
      tabBarIcon: tabBarIcon({
        active: require('./assets/profile.png'),
        inactive: require('./assets/profile-disabled.png'),
      }),
    }),
  },
  Settings: {
    screen: SettingsStack,
    navigationOptions: () => ({
      tabBarIcon: tabBarIcon({
        active: require('./assets/settings.png'),
        inactive: require('./assets/settings-disabled.png'),
      }),
    }),
  },
}, {
  animationEnabled: true,
  swipeEnabled: true,
  initialRouteName: 'Feed',
  headerMode: 'none',
  tabBarOptions: {
    activeTintColor: colors.white,
    inactiveTintColor: colors.moonRaker,
    style: {
      backgroundColor: colors.governorBay,
    },
    labelStyle: {
      fontWeight: 'bold',
      marginTop: 0,
    },
  },
})

const AuthStack = createStackNavigator({
  Onboarding,
  Login,
  SignUp,
  CreateAccount,
  Suscription,
  ConfirmAccount,
}, {
  headerMode: 'none',
  mode: 'modal',
  initialRouteName: 'Onboarding',
})

const RootStack = createSwitchNavigator({
  App: MainTab,
  Auth: AuthStack,
  AppLoading,
  Setup: SetupStack,
}, {
  initialRouteName: 'AppLoading',
})

export default class App extends Component {
  async componentDidMount () {
    await setAuthHeader()
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle='light-content' />
        <RootStack />
      </View>
    )
  }
}
