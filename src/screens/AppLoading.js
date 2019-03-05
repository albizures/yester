import PropTypes from 'prop-types'
import debugFactory from 'debug'
import React, { Component } from 'react'
import { Alert, View } from 'react-native'
import moment from 'moment'

import Container from '../components/Container'
import { isSubscribed, isSetupFinished, getToken, setLocale, removeSuscription } from '../utils/session'
import { setupRCPurchases, setInfoListener } from '../utils/purchase'
import http from '../utils/http'
import withUser, { shapeContextUser } from '../components/withUser'
import withAges, { shapeContextAges } from '../components/withAges'
import { strings } from '../components/Translate'

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
    const { contextAges: { updateAges } } = this.props

    try {
      debugInfo('Fetching ages')
      const { data: ages } = await http.get('/v1/ages')
      updateAges(ages)
    } catch (error) {
      Alert.alert('Error getting the ages')
      debugError('Error getting the ages', error)
    }
  }

  async bootstrap () {
    const {
      navigation,
      contextUser: { updateUser },
    } = this.props

    setLocale(strings.getLanguage())

    try {
      const userToken = await getToken()
      if (!userToken) {
        debugInfo('No token found, sending user to Auth flow')
        return navigation.navigate('Auth')
      }

      await updateUser()
      await this.getAges()
      await setupRCPurchases()
      const hasSuscription = await isSubscribed()

      const purchaserInfo = await new Promise((resolve, reject) => {
        const removeInforListener = setInfoListener((error, purchaserInfo) => {
          removeInforListener()
          if (error) {
            return reject(error)
          }

          resolve(purchaserInfo)
        })
      })

      debugInfo(purchaserInfo)

      const { activeSubscriptions = [], allExpirationDates = {} } = purchaserInfo || {}
      if (activeSubscriptions.length === 0) {
        if (hasSuscription) {
          await removeSuscription()
        }
        return navigation.navigate('Subscription')
      }

      // checking expiration dates
      const subscriptionsAreActive = activeSubscriptions.every((suscriptionName) => {
        const nowDate = moment()
        const expirationDate = moment(allExpirationDates[suscriptionName])

        return expirationDate.isAfter(nowDate)
      })

      if (!subscriptionsAreActive) {
        await removeSuscription()
        return navigation.navigate('Subscription')
      }

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
