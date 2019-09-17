import './base64Polyfill'
import React, { Component } from 'react'
import { StatusBar, View, Platform } from 'react-native'
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation'
import Amplify, { Hub } from 'aws-amplify'
import SplashScreen from 'react-native-splash-screen'
import {
  AWS_REGION,
  AWS_IDENTITY_POOL_ID,
  AWS_USER_POOL_ID,
  AWS_USER_CLIENT_POOL_ID,
  COGNITO_DOMAIN,
  HOST,
  // REDIRECT_URI,
} from 'react-native-dotenv'
import { UserProvider } from './components/withUser'
import { AgesProvider } from './components/withAges'
import Onboarding from './screens/Onboarding'
import SetupBirthDate from './screens/Setup/BirthDate'
import SetupPlace from './screens/Setup/Place'
import SetupConfirmation from './screens/Setup/Confirmation'
import Login from './screens/Login'
import SignUp from './screens/SignUp'
import ForgotPassword from './screens/ForgotPassword/index'
import RecoverCode from './screens/ForgotPassword/RecoverCode'
import NewPassword from './screens/ForgotPassword/NewPassword'
import CreateAccount from './screens/CreateAccount'
import Subscription from './screens/Subscription'
import ConfirmAccount from './screens/ConfirmAccount'
import Home from './screens/Home'
import Stories from './screens/Home/Stories'
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
import { translate } from './components/Translate'
import colors from './utils/colors'
import icons from './utils/icons'
import { Storage, sanitizeUser, sanitizeStats, isAuthorized } from './utils/session'
import { initNotifications, addEventListener, removeEventListener } from './utils/notifications'
import { setupAnalytics } from './utils/analytics'
import debugFactory from 'debug'

const debugInfo = debugFactory('yester:index:info')

require('moment/locale/es.js')

const oauth = {
  domain: COGNITO_DOMAIN,
  scope: ['email', 'profile', 'openid'],
  // redirectSignIn: REDIRECT_URI,
  // redirectSignOut: REDIRECT_URI,
  responseType: 'token',
}

Amplify.configure({
  storage: Storage,
  Auth: {
    identityPoolId: AWS_IDENTITY_POOL_ID,
    region: AWS_REGION,
    userPoolId: AWS_USER_POOL_ID,
    userPoolWebClientId: AWS_USER_CLIENT_POOL_ID,
    mandatorySignIn: true,
  },
  oauth: oauth,
  API: {
    endpoints: [
      {
        name: 'MainAPI',
        endpoint: HOST,
      },
    ],
  },
})

Hub.listen('auth', (data) => {
  debugInfo(data)
})

const SetupStack = createStackNavigator(
  {
    SetupBirthDate,
    SetupPlace,
    SetupConfirmation,
  },
  {
    headerMode: 'none',
    initialRouteName: 'SetupBirthDate',
  }
)

const FeedStack = createStackNavigator(
  {
    Home,
    ModalCard,
  },
  {
    mode: 'modal',
    headerMode: 'none',
    initialRouteName: 'Home',
  }
)

const StoryStack = createStackNavigator(
  {
    Stories,
  },
  {
    mode: 'modal',
    headerMode: 'none',
    initialRouteName: 'Stories',
  }
)

const SettingsStack = createStackNavigator(
  {
    SettingsHome: Settings,
    Language,
    Notifications,
    Terms,
    About,
  },
  {
    mode: 'modal',
    headerMode: 'none',
    initialRouteName: 'SettingsHome',
  }
)

const MainTab = createBottomTabNavigator(
  {
    Feed: {
      screen: FeedStack,
      navigationOptions: () => ({
        title: translate('home.bottomBar.feed'),
        tabBarIcon: tabBarIcon({
          active: icons.bottombarWriteActive,
          inactive: icons.bottombarWriteInactive,
          iconSize: {
            width: 29,
            height: 19,
          },
        }),
      }),
    },
    MyStory: {
      screen: StoryStack,
      navigationOptions: () => ({
        title: translate('home.bottomBar.myStory'),
        tabBarIcon: tabBarIcon({
          active: icons.bottombarReadActive,
          inactive: icons.bottombarReadInactive,
          iconSize: {
            width: 21,
            height: 18,
          },
        }),
      }),
    },
    Profile: {
      screen: Profile,
      navigationOptions: () => ({
        title: translate('home.bottomBar.profile'),
        tabBarIcon: tabBarIcon({
          active: icons.bottombarProfileActive,
          inactive: icons.bottombarProfileInactive,
          iconSize: {
            width: 21,
            height: 20,
          },
        }),
      }),
    },
    Settings: {
      screen: SettingsStack,
      navigationOptions: () => ({
        title: translate('home.bottomBar.settings'),
        tabBarIcon: tabBarIcon({
          active: icons.bottombarSettingsActive,
          inactive: icons.bottombarSettingsInactive,
          iconSize: {
            width: 23,
            height: 22,
          },
        }),
      }),
    },
  },
  {
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
  }
)

const AppStack = createStackNavigator(
  {
    MainTab,
    Writing,
    Reading,
  },
  {
    headerMode: 'none',
    mode: 'modal',
    initialRouteName: 'MainTab',
  }
)

const AuthStack = createStackNavigator(
  {
    Onboarding,
    Login,
    SignUp,
    ForgotPassword,
    NewPassword,
    RecoverCode,
    CreateAccount,
    Subscription,
    ConfirmAccount,
  },
  {
    headerMode: 'none',
    mode: 'modal',
    initialRouteName: 'Onboarding',
  }
)

const RootStack = createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthStack,
    AppLoading,
    Setup: SetupStack,
  },
  {
    initialRouteName: 'AppLoading',
  }
)

export default class App extends Component {
  state = {}
  async componentDidMount() {
    SplashScreen.hide()
    debugFactory.disable()
    // debugFactory.enable('yester:*')
    //debugFactory.enable('yester:Place*, yester:Picker*')
    // debugFactory.enable('yester:Writing*')

    initNotifications()
    addEventListener('received', this.onReceived)
    addEventListener('opened', this.onOpened)
    addEventListener('ids', this.onIds)

    setupAnalytics()
  }

  componentWillUnmount() {
    removeEventListener('received', this.onReceived)
    removeEventListener('opened', this.onOpened)
    removeEventListener('ids', this.onIds)
  }

  onReceived(notification) {
    debugInfo('Notification received: ', notification)
  }

  onOpened(openResult) {
    debugInfo('Message: ', openResult.notification.payload.body)
    debugInfo('Data: ', openResult.notification.payload.additionalData)
    debugInfo('isActive: ', openResult.notification.isAppInFocus)
    debugInfo('openResult: ', openResult)
  }

  onIds(device) {
    debugInfo('Listener ids device: ', device)
  }

  updateUser = async () => {
    debugInfo('Updating context user')
    const user = await sanitizeUser()
    this.setState({ user })
  }

  updateStats = async () => {
    debugInfo('Updating context stats')
    const stats = await sanitizeStats()
    this.setState({ stats })
  }

  updateAuthorization = async () => {
    debugInfo('Updating context currentStatus')
    const { user, stats } = this.state
    const currentStatus = await isAuthorized(user, stats)
    this.setState({ currentStatus })
    return currentStatus
  }

  updateAges = (ages) => {
    // debugInfo('Updating ages', ages)
    this.setState({
      ages: ages.reduce(
        (agesObj, age) => ({
          ...agesObj,
          [age.id]: age,
        }),
        {}
      ),
      agesList: ages,
    })
  }

  render() {
    const { user, stats, currentStatus, ages, agesList } = this.state
    const userContextValue = {
      updateUser: this.updateUser,
      updateStats: this.updateStats,
      updateAuthorization: this.updateAuthorization,
      user,
      stats,
      currentStatus,
    }
    const agesContextValue = {
      updateAges: this.updateAges,
      ages,
      agesList,
    }

    const statusBarStyle = Platform.OS === 'ios' ? 'light-content' : 'dark-content'

    return (
      <AgesProvider value={agesContextValue}>
        <UserProvider value={userContextValue}>
          <View style={{ flex: 1 }}>
            <StatusBar barStyle={statusBarStyle} />
            <RootStack />
          </View>
        </UserProvider>
      </AgesProvider>
    )
  }
}
