import './base64Polyfill'
import React, { Component } from 'react'
import { StatusBar, View } from 'react-native'
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation'
import Amplify from 'aws-amplify'
import debugFactory from 'debug'
import { translate } from './components/Translate'
import {
  AWS_REGION,
  AWS_IDENTITY_POOL_ID,
  AWS_USER_POOL_ID,
  AWS_USER_CLIENT_POOL_ID,
} from 'react-native-dotenv'

import { UserProvider } from './components/withUser'
import { AgesProvider } from './components/withAges'
import Onboarding from './screens/Onboarding'
import SetupBirthDate from './screens/Setup/BirthDate'
import SetupPlace from './screens/Setup/Place'
import SetupConfirmation from './screens/Setup/Confirmation'
import Login from './screens/Login'
import SignUp from './screens/SignUp'
import CreateAccount from './screens/CreateAccount'
import Subscription from './screens/Subscription'
import ConfirmAccount from './screens/ConfirmAccount'
import FBWebView from './screens/FBWebView'
import Home from './screens/Home'
import ModalCard from './screens/Home/ModalCard'
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
import { setAuthHeader, Storage, getUser, sanitizeUser, setLocale } from './utils/session'

require('moment/locale/es.js')

debugFactory.enable('yester:*')

Amplify.configure({
  storage: Storage,
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
  ModalCard,
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
  MyStory: {
    screen: FeedStack,
    navigationOptions: () => ({
      title: translate('home.bottomBar.myStory'),
      tabBarIcon: tabBarIcon({
        active: require('./assets/feed.png'),
        inactive: require('./assets/feed-disabled.png'),
      }),
    }),
  },
  Profile: {
    screen: Profile,
    navigationOptions: () => ({
      title: translate('home.bottomBar.profile'),
      tabBarIcon: tabBarIcon({
        active: require('./assets/profile.png'),
        inactive: require('./assets/profile-disabled.png'),
      }),
    }),
  },
  Settings: {
    screen: SettingsStack,
    navigationOptions: () => ({
      title: translate('home.bottomBar.settings'),
      tabBarIcon: tabBarIcon({
        active: require('./assets/settings.png'),
        inactive: require('./assets/settings-disabled.png'),
      }),
    }),
  },
}, {
  animationEnabled: true,
  swipeEnabled: true,
  initialRouteName: 'MyStory',
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

const AppStack = createStackNavigator({
  MainTab,
  Writing,
  Reading,
}, {
  headerMode: 'none',
  mode: 'modal',
  initialRouteName: 'MainTab',
})

const AuthStack = createStackNavigator({
  Onboarding,
  Login,
  SignUp,
  CreateAccount,
  Subscription,
  ConfirmAccount,
  FBWebView,
}, {
  headerMode: 'none',
  mode: 'modal',
  initialRouteName: 'Onboarding',
})

const RootStack = createSwitchNavigator({
  App: AppStack,
  Auth: AuthStack,
  AppLoading,
  Setup: SetupStack,
}, {
  initialRouteName: 'AppLoading',
})

export default class App extends Component {
  state = {}
  async componentDidMount () {
    await setAuthHeader()
  }

  updateUser = async () => {
    const user = sanitizeUser(await getUser())
    setLocale(user.locale)
    this.setState({ user })
  }

  updateAges = (ages) => {
    this.setState({
      ages: ages.reduce((agesObj, age) => ({
        ...agesObj,
        [age.id]: age,
      }), {}),
      agesList: ages,
    })
  }

  render () {
    const { user, ages, agesList } = this.state
    const userContextValue = {
      updateUser: this.updateUser,
      user,
    }
    const agesContextValue = {
      updateAges: this.updateAges,
      ages,
      agesList,
    }

    return (
      <AgesProvider value={agesContextValue}>
        <UserProvider value={userContextValue}>
          <View style={{flex: 1}}>
            <StatusBar barStyle='light-content' />
            <RootStack />
          </View>
        </UserProvider>
      </AgesProvider>
    )
  }
}
