import React, { Component } from 'react'
import { StatusBar, View } from 'react-native'
import { createStackNavigator } from 'react-navigation'

import Onboarding from './screens/Onboarding'
import LogIn from './screens/Login'
import SignUp from './screens/SignUp'
import SignUp2 from './screens/SignUp-2'
import CreateAccount from './screens/CreateAccount'
import Setup from './screens/Setup'
import Setup1 from './screens/Setup-1'
import Setup2 from './screens/Setup-2'
import SignIn from './screens/SignIn'
import ConfirmEmail from './screens/ConfirmEmail'
import Home from './screens/Home'
import Home2 from './screens/Home-2'
import Home3 from './screens/Home-3'
import Question from './screens/Question'
import Question2 from './screens/Question-2'
import Writing from './screens/Writing'
import Reading from './screens/Reading'
import Profile from './screens/Profile'
import Settings from './screens/Settings'
import Language from './screens/Language'
import Notifications from './screens/Notifications'
import Terms from './screens/Terms'
import Facebook from './screens/Facebook'
import http from './utils/http'

const RootStack = createStackNavigator({
  Onboarding: {
    screen: Onboarding,
  },
  LogIn: {
    screen: LogIn,
  },
  SignUp: {
    screen: SignUp,
  },
  SignUp2: {
    screen: SignUp2,
  },
  CreateAccount: {
    screen: CreateAccount,
  },
  Setup: {
    screen: Setup,
  },
  Setup1: {
    screen: Setup1,
  },
  Setup2: {
    screen: Setup2,
  },
  SignIn: {
    screen: SignIn,
  },
  ConfirmEmail: {
    screen: ConfirmEmail,
  },
  Home: {
    screen: Home,
  },
  Home2: {
    screen: Home2,
  },
  Home3: {
    screen: Home3,
  },
  Question: {
    screen: Question,
  },
  Question2: {
    screen: Question2,
  },
  Writing: {
    screen: Writing,
  },
  Reading: {
    screen: Reading,
  },
  Profile: {
    screen: Profile,
  },
  Settings: {
    screen: Settings,
  },
  Language: {
    screen: Language,
  },
  Notifications: {
    screen: Notifications,
  },
  Terms: {
    screen: Terms,
  },
  Facebook: {
    screen: Facebook,
  },
}, {
  navigationOptions: {
    gesturesEnabled: false,
  },
  initialRouteName: 'Onboarding',
  mode: 'modal',
  headerMode: 'none',
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
