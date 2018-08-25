import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, Button } from 'react-native'

export default class SignUp2 extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  onPressCreateAccount = () => {
    this.props.navigation.navigate('CreateAccount')
  }

  render () {
    return (
      <View>
        <Text style={[{textAlign: 'center', marginTop: 40}]}>SignUp-2</Text>
        <Button title='to Create Account' onPress={this.onPressCreateAccount} />
      </View>
    )
  }
}
