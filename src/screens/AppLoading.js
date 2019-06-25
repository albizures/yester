import PropTypes from 'prop-types'
import debugFactory from 'debug'
import React, { Component } from 'react'
import { Alert, View, Platform } from 'react-native'
import Container from '../components/Container'
import { setupPurchases, getPurchaserInfo, status } from '../utils/purchase'
import http, { instance, original } from '../utils/http'
import withUser, { shapeContextUser } from '../components/withUser'
import withAges, { shapeContextAges } from '../components/withAges'
import { strings, translate } from '../components/Translate'
import OneSignal from 'react-native-onesignal'
import moment from 'moment'
import {
  isSubscribed,
  isSetupFinished,
  getToken,
  setLocale,
  removeSubscription,
  saveUserSubscriptionStatus,
  updateUserAttribute,
} from '../utils/session'

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

  constructor (props) {
    super(props)
    this.bootstrap()
  }

  returnResponse = (response) => {
    return response
  }

  unauthorizedInterceptor = async (error) => {
    const { status } = error.response
    const { navigation } = this.props

    if (status === 401) {
      await removeSubscription()
      navigation.navigate('Subscription')
    }
    return error
  }

  getAges = async () => {
    const {
      contextAges: { updateAges },
    } = this.props

    try {
      debugInfo('Fetching ages')
      const { data: ages } = await http.get('/v1/ages')
      updateAges(ages)
    } catch (error) {
      Alert.alert(translate('loading.error'))
      debugError('Error getting the ages', error)
    }
  }

  async bootstrap () {
    const {
      navigation,
      contextUser: { updateUser, user },
    } = this.props

    const { platform } = user

    setLocale(strings.getLanguage())

    try {
      const userToken = await getToken()
      if (!userToken) {
        debugInfo('No token found, sending user to Auth flow')
        return navigation.navigate('Auth')
      }

      await updateUser()
      if (!platform) {
        updateUserAttribute('custom:platform', Platform.OS)
      }

      await this.getAges()
      await setupPurchases()
      const hasSubscription = await isSubscribed()
      const purchaserInfo = await getPurchaserInfo()

      // const { activeEntitlements = [], allExpirationDates = {} } = purchaserInfo || {}

      const { activeEntitlements = [] } = purchaserInfo || {}
      debugInfo('Active entitlements:', activeEntitlements)
      if (activeEntitlements === 'undefined' || !activeEntitlements.includes('pro')) {
        if (hasSubscription) {
          await removeSubscription()
        }
        OneSignal.sendTags({ subscriptionStatus: 'none' })
        return navigation.navigate('Subscription')
      }
      OneSignal.sendTags({ subscriptionStatus: 'pro' })

      // checking expiration dates
      /*
      const subscriptionsAreActive = activeSubscriptions.every((subscriptionName) => {
        const nowDate = moment()
        const expirationDate = moment(allExpirationDates[subscriptionName])

        return expirationDate.isAfter(nowDate)
      })

      if (!subscriptionsAreActive) {
        await removeSubscription()
        return navigation.navigate('Subscription')
      }
      */
      await saveUserSubscriptionStatus(status.SUBSCRIBED)

      instance.interceptors.request.use(this.returnResponse, this.unauthorizedInterceptor)
      original.interceptors.request.use(this.returnResponse, this.unauthorizedInterceptor)

      if (await isSetupFinished()) {
        const lastScreen = navigation.getParam('lastScreen', 'App')
        navigation.navigate(lastScreen)
      } else {
        navigation.navigate('Setup')
      }
    } catch (error) {
      navigation.navigate('Auth')
      debugError(error)
    }
  }

  render () {
    const { isLoading } = this.state
    return (
      <Container isLoading={isLoading}>
        <View />
      </Container>
    )
  }
}

export default withAges(withUser(AppLoading))
