import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, Button } from 'react-native'

export default class Subscription extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  onPress = () => {
    this.props.navigation.navigate('Login')
  }

  render () {
    return (
      <View>
        <Button title="to login" onPress={this.onPress} />
        <Text>Subscription</Text>
      </View>
    )
  }
}