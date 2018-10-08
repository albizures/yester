import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, Button } from 'react-native'

import Container from '../components/Container'
import TopBar from '../components/TopBar'

export default class Profile extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  onPress = () => {
    this.props.navigation.navigate('Home')
  }

  render () {
    const topBar = (
      <TopBar title='profile.title' />
    )
    return (
      <Container topBar={topBar}>
        <Text style={[{textAlign: 'center', marginTop: 40}]}>PROFILE</Text>
        <Button title='to Home' onPress={this.onPress} />
      </Container>
    )
  }
}
