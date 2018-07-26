import React, { Component } from 'react'
import { StatusBar, View } from 'react-native'
import { createStackNavigator } from 'react-navigation'

import Onboarding from './screens/Onboarding'
import Login from './screens/Login'
import Subscription from './screens/Subscription'
import SignUp from './screens/SignUp'
import Topics from './screens/Topics'

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

export default class App extends Component {
  render () {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle='light-content' />
        <RootStack />
      </View>
    )
  }
}
