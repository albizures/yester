import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, Button } from 'react-native'

import Translate from '../../components/Translate'
export default class Onboarding extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  onPress = () => {
    this.props.navigation.navigate('Subscription')
  }

  render () {
    return (
      <View>
        <Button title='to subscription' onPress={this.onPress} />
        <Text>Onboarding</Text>
        <Translate keyName='hello' />
      </View>
    )
  }
}
