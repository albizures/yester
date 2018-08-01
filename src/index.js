import React, { Component } from 'react'
import { StatusBar, View } from 'react-native'
import { createStackNavigator } from 'react-navigation'

import Onboarding from './screens/Onboarding'
import Login from './screens/Login'
import Subscription from './screens/Subscription'
import SignUp from './screens/SignUp'
import CreateAccount from './screens/CreateAccount'
import Topics from './screens/Topics'
import http from './utils/http'

const RootStack = createStackNavigator({
  Onboarding: {
    screen: Onboarding,
  },
  Login: {
    screen: Login,
  },
  Subscription: {
    screen: Subscription,
  },
  SignUp: {
    screen: SignUp,
  },
  CreateAccount: {
    screen: CreateAccount,
  },
  Topics: {
    screen: Topics,
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
