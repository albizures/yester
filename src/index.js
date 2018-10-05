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
import SetupBirthDate from './screens/Setup/BirthDate'
import SetupPlace from './screens/Setup/Place'
import SetupConfirmation from './screens/Setup/Confirmation'
import Login from './screens/Login'
import SignUp from './screens/SignUp'
import CreateAccount from './screens/CreateAccount'
import Suscription from './screens/Suscription'
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

import { tabBarIcon } from './components/TabIcon'
import Terms from './screens/Terms'
import http from './utils/http'
import colors from './utils/colors'

Amplify.configure({
  Auth: {
    identityPoolId: AWS_IDENTITY_POOL_ID,
    region: AWS_REGION,
    userPoolId: AWS_USER_POOL_ID,
    userPoolWebClientId: AWS_USER_CLIENT_POOL_ID,
  },
})

const SetupStack = createStackNavigator({
  SetupBirthDate,
  SetupPlace,
  SetupConfirmation,
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
  Feed: {
    screen: FeedStack,
    navigationOptions: () => ({
      tabBarIcon: tabBarIcon({
        active: require('./assets/feed-disabled.png'),
        inactive: require('./assets/feed.png'),
      }),
    }),
  },
  Profile: {
    screen: Profile,
    navigationOptions: () => ({
      tabBarIcon: tabBarIcon({
        active: require('./assets/profile-disabled.png'),
        inactive: require('./assets/profile.png'),
      }),
    }),
  },
  Settings: {
    screen: SettingsStack,
    navigationOptions: () => ({
      tabBarIcon: tabBarIcon({
        active: require('./assets/settings-disabled.png'),
        inactive: require('./assets/settings.png'),
      }),
    }),
  },
}, {
  animationEnabled: true,
  swipeEnabled: true,
  initialRouteName: 'Feed',
  headerMode: 'none',
  tabBarOptions: {
    activeTintColor: colors.moonRaker,
    inactiveTintColor: colors.royalBlue,
    style: {
      backgroundColor: colors.governorBay,
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
  SetupStack,
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
