import PropTypes from 'prop-types'
import debugFactory from 'debug'
import React, { Component } from 'react'
import { Text } from 'react-native'

import Container from '../components/Container'
import { isSetupFinished, getToken } from '../utils/session'
import withUser from '../components/withUser'
import { setLocale } from '../utils/http'
import { strings } from '../components/Translate'

const debugError = debugFactory('yester:error:AppLoading')

class AppLoading extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  state = {
    isLoading: true,
  }

  constructor (props) {
    super(props)
    this.bootstrap()
  }

  async bootstrap () {
    const { navigation, updateUser } = this.props

    setLocale(strings.getLanguage())
    try {
      const userToken = await getToken()
      if (!userToken) {
        return navigation.navigate('Auth')
      }

      await updateUser()
      if (!(await isSetupFinished())) {
        return navigation.navigate('Setup')
      }

      navigation.navigate('App')
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

export default withUser(AppLoading)
