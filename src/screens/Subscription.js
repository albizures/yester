import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, Button } from 'react-native'

export default class Subscription extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  onPressLogin = () => {
    this.props.navigation.navigate('Login')
  }

  onPressCreateAccount = () => {
    this.props.navigation.navigate('CreateAccount')
  }

  render () {
    return (
      <View>
        <Button title='to login' onPress={this.onPressLogin} />
        <Text>Subscription</Text>
        <Button title='to Create Account' onPress={this.onPressCreateAccount} />
        
      </View>
    )
  }
}
