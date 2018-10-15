import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, Button } from 'react-native'

import Container from '../components/Container'
import TopBar from '../components/TopBar'
import { logOut } from '../utils/session'

export default class Settings extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  onPress = () => {
    this.props.navigation.navigate('Home')
  }

  onLogOut = async () => {
    const { navigation } = this.props
    await logOut()
    navigation.navigate('Auth')
  }

  render () {
    const topBar = (
      <TopBar title='settings.title' />
    )
    return (
      <Container topBar={topBar}>
        <Text style={[{textAlign: 'center', marginTop: 40}]}>SETTINGS</Text>
        <Button title='Log Out' onPress={this.onLogOut} />
      </Container>
    )
  }
}
