import React, { Component } from 'react'
import { StatusBar, View } from 'react-native'
import { createStackNavigator } from 'react-navigation'

import Onboarding from './screens/Onboarding'
import AccountSetup from './screens/AccountSetup'
import Login from './screens/Login'
import SignUp from './screens/SignUp'
import CreateAccount from './screens/CreateAccount'
import Setup from './screens/Setup'
import SignIn from './screens/SignIn'
import ConfirmEmail from './screens/ConfirmEmail'
import Home from './screens/Home'
import Question from './screens/Question'
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
  AccountSetup: {
    screen: AccountSetup,
  },
  Login: {
    screen: Login,
  },
  SignUp: {
    screen: SignUp,
  },
  CreateAccount: {
    screen: CreateAccount,
  },
  Setup: {
    screen: Setup,
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
  Question: {
    screen: Question,
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
  initialRouteName: 'AccountSetup',
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
