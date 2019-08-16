import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Alert, View } from 'react-native'
import Container from '../components/Container'
import { setupPurchases, getPurchaserInfo, status } from '../utils/purchase'
import http, { instance, original } from '../utils/http'
import withUser, { shapeContextUser } from '../components/withUser'
import withAges, { shapeContextAges } from '../components/withAges'
import { strings, translate } from '../components/Translate'
import {
  sendTags,
  getPermissionSubscriptionState,
  checkNotificationsStatus,
} from '../utils/notifications'
// import moment from 'moment'
import {
  isSubscribed,
  isSetupFinished,
  getToken,
  setLocale,
  removeSubscription,
  saveUserSubscriptionStatus,
  logOut,
} from '../utils/session'
import { identify } from '../utils/analytics'
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
      debugInfo('API call get ages')
      const { data: ages } = await http.getAPI('/v2/ages')
      updateAges(ages)
    } catch (error) {
      Alert.alert(translate('loading.error'))
      debugError('Error getting the ages', error)
    }
  }

  async bootstrap () {
    const {
      navigation,
      contextUser: { updateUser },
    } = this.props

    try {
      setLocale(strings.getLanguage())
      const userToken = await getToken()
      if (!userToken) {
        debugInfo('No token found, sending user to Auth flow')
        return navigation.navigate('Auth')
      }
      // Set user in context
      await updateUser()
      const { user } = this.props.contextUser
      if (!user.email) throw new Error('User has no email')

      identify(user)
      await setupPurchases(user)

      getPermissionSubscriptionState((status) => {
        debugInfo('Status: ', status)
        // If notifications are set to true in the cloud but hasn't been prompted in current device
        if (!status.hasPrompted && user.notifications) {
          checkNotificationsStatus(user)
        }
      })

      const { finished, params } = await isSetupFinished(user)
      if (!finished) {
        return navigation.navigate('SetupBirthDate', params)
      }

      const hasSubscription = await isSubscribed(user)
      const purchaserInfo = await getPurchaserInfo()

      // const { activeEntitlements = [], allExpirationDates = {} } = purchaserInfo || {}

      const { activeEntitlements = [] } = purchaserInfo || {}
      debugInfo('Active entitlements: ', activeEntitlements)
      if (activeEntitlements === 'undefined' || !activeEntitlements.includes('pro')) {
        if (hasSubscription) {
          await removeSubscription()
        }
        sendTags({ subscriptionStatus: 'none' })
        return navigation.navigate('Subscription')
      }
      sendTags({ subscriptionStatus: 'pro' })

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

      await this.getAges()
      const lastScreen = navigation.getParam('lastScreen', 'App')
      navigation.navigate(lastScreen)
    } catch (error) {
      logOut()
      navigation.navigate('Auth')
      debugError('bootstrap: ', error)
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
