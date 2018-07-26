import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, Button } from 'react-native'

import Translate from '../../components/Translate'

export default class Onboarding extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  onPress = () => {
    this.props.navigation.navigate('SignUp')
  }

  onPressTopics = () => {
    this.props.navigation.navigate('Topics')
  }

  render () {
    return (
      <View>
        <Button title='to Sign Up' onPress={this.onPress} />
        <Text>Onboarding</Text>
        <Translate keyName='hello' />
        <Button title='to Topics' onPress={this.onPressTopics} />
      </View>
    )
  }
}
