import PropTypes from 'prop-types'
import debugFactory from 'debug'
import React, { Component } from 'react'
import { Text } from 'react-native'

import Container from '../components/Container'
import { isSetupFinished, getToken } from '../utils/session'

const debugError = debugFactory('yester:error:AppLoading')

export default class AppLoading extends Component {
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
    const { navigation } = this.props

    try {
      const userToken = await getToken()
      if (userToken) {
        if (await isSetupFinished()) {
          navigation.navigate('App')
        } else {
          navigation.navigate('Setup')
        }
      } else {
        navigation.navigate('Auth')
      }
    } catch (error) {
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
