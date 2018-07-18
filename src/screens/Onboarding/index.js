import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, Button } from 'react-native'

import Translate from '../../components/Translate'
export default class Onboarding extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  onPress = () => {
    this.props.navigation.navigate('StartTrial')
  }

  render () {
    return (
      <View>
        <Button title="to start free trial" onPress={this.onPress} />
        <Text>Onboarding</Text>
        <Translate keyName='hello' />
      </View>
    )
  }
}