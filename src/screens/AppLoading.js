import React, { Component } from 'react'
import { Alert, View } from 'react-native'
import Container from '../components/Container'
import { strings, translate } from '../components/Translate'
import withUser, { shapeContextUser } from '../components/withUser'
import withAges, { shapeContextAges } from '../components/withAges'
import http from '../utils/http'
import { setupPurchases } from '../utils/purchases'
import { identifyAnalytics } from '../utils/analytics'
import {
  logOut,
  getToken,
  setAppLocale,
  isSetupFinished,
  subscriptionStatus,
  updateUserAttribute,
} from '../utils/session'
import {
  setNotificationsStatus,
  sendUserNotificationsTags,
  getPermissionSubscriptionState,
} from '../utils/notifications'
import _ from 'lodash'
import PropTypes from 'prop-types'
import debugFactory from 'debug'

const debugError = debugFactory('yester:AppLoading:error')
const debugInfo = debugFactory('yester:AppLoading:info')

class AppLoading extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    contextUser: PropTypes.shape(shapeContextUser).isRequired,
    contextAges: PropTypes.shape(shapeContextAges).isRequired,
  }

  state = {
    isLoading: true,
  }

  constructor(props) {
    super(props)
    this.bootstrap()
  }

  getAges = async () => {
    const {
      contextAges: { updateAges },
    } = this.props

    try {
      debugInfo('API call get ages')
      const { data: ages } = await http.getAPI('/v2/ages')
      updateAges(ages)
    } catch (error) {
      Alert.alert(translate('loading.error'))
      debugError('Error getting the ages', error)
      updateAges([]);
    }
  }

  async bootstrap() {
    const {
      navigation,
      contextUser: { updateUser, updateStats, updateAuthorization },
    } = this.props

    try {
      await this.saveUserLocale()
      const userToken = await getToken()
      if (!userToken) {
        debugInfo('No token found, sending user to Auth flow')
        return navigation.navigate('Auth')
      }
      // Set user and stats in context
      await updateUser()
      await updateStats()
      await this.saveUserLocale()
      const { user } = this.props.contextUser

      if (!user.email) throw new Error('User has no email')

      identifyAnalytics(user)
      await setupPurchases(user)
      // await identifyPurchaser(user)

      getPermissionSubscriptionState((notifStatus) => {
        debugInfo('notifStatus: ', notifStatus)
        // If notifications are set to true in the cloud but hasn't been prompted in current device
        if (user.notifications !== false && !notifStatus.hasPrompted) {
          setNotificationsStatus(user)
        }
      })

      const { finished, params } = await isSetupFinished(user)
      if (!finished) {
        return navigation.navigate('SetupBirthDate', params)
      }

      sendUserNotificationsTags(user)

      await updateAuthorization()
      const { currentStatus } = this.props.contextUser
      if (currentStatus === subscriptionStatus.ODD_REQUIRE) {
        return navigation.navigate('Subscription', { currentStatus })
      }

      await this.getAges()
      const lastScreen = navigation.getParam('lastScreen', 'App')
      navigation.navigate(lastScreen)
    } catch (error) {
      logOut()
      navigation.navigate('Auth')
      debugError('bootstrap: ', error)
    }
  }

  saveUserLocale = async () => {
    console.log('getInterfaceLanguage:', strings.getInterfaceLanguage())
    console.log('getLanguage', strings.getLanguage())
    let locale = strings.getLanguage() || 'en'
    const {
      contextUser: { user, updateUser },
    } = this.props

    if (_.isEmpty(user)) {
      setAppLocale(locale)
      return
    }

    if (_.isEmpty(user.locale)) {
      await updateUserAttribute('locale', locale)
      await updateUser()
    } else {
      locale = user.locale
    }

    setAppLocale(locale)
  }

  render() {
    const { isLoading } = this.state
    return (
      <Container isLoading={isLoading}>
        <View />
      </Container>
    )
  }
}

export default withAges(withUser(AppLoading))
