import React, { Component } from 'react'
import { StatusBar, View, AsyncStorage } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import Onboarding from './screens/Onboarding'
import Login from './screens/Login'
import Subscription from './screens/Subscription'

const RootStack = createStackNavigator({
  Onboarding: {
    screen: Onboarding
  },
  Login: {
    screen: Login
  },
  Subscription: {
    screen: Subscription
  }
}, {
  navigationOptions: {
    gesturesEnabled: false
  },
  initialRouteName: 'Onboarding',
  mode: 'modal',
  headerMode: 'none'
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