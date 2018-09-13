import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { AsyncStorage, Text } from 'react-native'

import Container from '../components/Container'

export default class Terms extends Component {
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
    const userToken = await AsyncStorage.getItem('userToken')
    this.props.navigation.navigate(userToken ? 'App' : 'Auth')
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
