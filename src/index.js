import React, { Component } from 'react'
import { StatusBar, View } from 'react-native'
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation'
import Amplify from 'aws-amplify'
import {
  AWS_REGION,
  AWS_IDENTITY_POOL_ID,
  AWS_USER_POOL_ID,
  AWS_USER_CLIENT_POOL_ID,
} from 'react-native-dotenv'

import Onboarding from './screens/Onboarding'
import AccountSetup from './screens/AccountSetup'
import Login from './screens/Login'
import SignUp from './screens/SignUp'
import CreateAccount from './screens/CreateAccount'
import Setup from './screens/Setup'
import SignIn from './screens/SignIn'
import ConfirmAccount from './screens/ConfirmAccount'
import Home from './screens/Home'
import Question from './screens/Question'
import Writing from './screens/Writing'
import Reading from './screens/Reading'
import Profile from './screens/Profile'
import Settings from './screens/Settings'
import Language from './screens/Language'
import Notifications from './screens/Notifications'
import AppLoading from './screens/AppLoading'

import Terms from './screens/Terms'
import http from './utils/http'

Amplify.configure({
  Auth: {
    identityPoolId: AWS_IDENTITY_POOL_ID,
    region: AWS_REGION,
    userPoolId: AWS_USER_POOL_ID,
    userPoolWebClientId: AWS_USER_CLIENT_POOL_ID,
  },
})

const FeedStack = createStackNavigator({
  Home,
  Writing,
  Reading,
  Question,
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
}, {
  mode: 'modal',
  headerMode: 'none',
  initialRouteName: 'SettingsHome',
})

const MainTab = createBottomTabNavigator({
  Feed: FeedStack,
  Profile,
  Settings: SettingsStack,
}, {
  animationEnabled: true,
  swipeEnabled: true,
  initialRouteName: 'Feed',
  headerMode: 'none',
})

const AuthStack = createStackNavigator({
  Onboarding,
  AccountSetup,
  Login,
  SignUp,
  CreateAccount,
  Setup,
  SignIn,
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
}, {
  initialRouteName: 'AppLoading',
})

const testUrl = 'https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22'

export default class App extends Component {
  async componentDidMount () {
    const { data } = await http.get(testUrl)
    console.log(data)
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
