import React, { Component } from 'react'
import { StatusBar, View } from 'react-native'
import { createStackNavigator, createSwitchNavigator } from 'react-navigation'
import Amplify, { Auth } from 'aws-amplify'
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
import Facebook from './screens/Facebook'
import http from './utils/http'

Amplify.configure({
  Auth: {
    identityPoolId: AWS_IDENTITY_POOL_ID,
    region: AWS_REGION,
    userPoolId: AWS_USER_POOL_ID,
    userPoolWebClientId: AWS_USER_CLIENT_POOL_ID,
  },
  API: {
    endpoints: [
      {
        name: 'dev',
        endpoint: 'https://uw3pxmvc70.execute-api.us-east-1.amazonaws.com/dev/',
        custom_header: async () => {
          const currentSession = await Auth.currentSession()
          console.log('currentSession', currentSession)
          return {
            Authorization: currentSession.idToken.jwtToken,
          }
        },
      },
    ],
  },
})

const AppStack = createStackNavigator({
  Onboarding: {
    screen: Onboarding,
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
  initialRouteName: 'Home',
})

const AuthStack = createStackNavigator({
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
  ConfirmAccount: {
    screen: ConfirmAccount,
  },
}, {
  initialRouteName: 'Onboarding',
})

const RootStack = createSwitchNavigator({
  App: AppStack,
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
