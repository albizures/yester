import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, Button } from 'react-native'

import Container from '../../components/Container'

export default class Confirmation extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  onPress = () => {
    this.props.navigation.navigate('Home')
  }

  render () {
    return (
      <Container>
        <Text style={[{textAlign: 'center', marginTop: 40}]}>READING</Text>
        <Button title='to Home' onPress={this.onPress} />
      </Container>
    )
  }
}
