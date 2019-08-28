import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Alert, View } from 'react-native'
import Container from '../components/Container'
import { setupPurchases } from '../utils/purchase'
import http from '../utils/http'
import withUser, { shapeContextUser } from '../components/withUser'
import withAges, { shapeContextAges } from '../components/withAges'
import { strings, translate } from '../components/Translate'
import { getPermissionSubscriptionState, checkNotificationsStatus } from '../utils/notifications'
// import moment from 'moment'
import { isSetupFinished, getToken, setLocale, logOut, isAuthorized } from '../utils/session'
import { identifyAnalytics } from '../utils/analytics'
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

      identifyAnalytics(user)
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

      const authorized = await isAuthorized(user)
      if (!authorized) {
        return navigation.navigate('Subscription')
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
