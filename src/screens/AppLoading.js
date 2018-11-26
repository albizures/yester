import PropTypes from 'prop-types'
import debugFactory from 'debug'
import React, { Component } from 'react'
import { Text, Alert } from 'react-native'

import Container from '../components/Container'
import { isSubscribed, isSetupFinished, getToken, setLocale } from '../utils/session'
import http from '../utils/http'
import withUser, { shapeContextUser } from '../components/withUser'
import withAges, { shapeContextAges } from '../components/withAges'
import { strings } from '../components/Translate'

const debugError = debugFactory('yester:error:AppLoading')

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
      const { data: ages } = await http.get('/v1/ages')
      updateAges(ages)
    } catch (error) {
      Alert.alert('Error getting the ages')
      debugError(error)
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
        return navigation.navigate('Auth')
      }

      await updateUser()
      await this.getAges()

      if (await isSubscribed()) {
        if (await isSetupFinished()) {
          navigation.navigate('App')
        } else {
          navigation.navigate('Setup')
        }
      } else {
        navigation.navigate('Subscription')
      }
      const lastScreen = navigation.getParam('lastScreen', 'App')
      navigation.navigate(lastScreen)
    } catch (error) {
      navigation.navigate('Auth')
      debugError(error)
    }
  }

  render () {
    const { isLoading } = this.state
    return (
      <Container isLoading={isLoading}>
        <Text>Loading...</Text>
      </Container>
    )
  }
}

export default withAges(withUser(AppLoading))
