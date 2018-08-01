import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, Button } from 'react-native'

import Translate from '../../components/Translate'
import OurButton from '../../components/OurButton'

export default class Onboarding extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  onPress = () => {
    this.props.navigation.navigate('SignUp')
  }

  onPressHome = () => {
    this.props.navigation.navigate('Home')
  }

  render () {
    return (
      <View>
        <Text style={[{textAlign: 'center', marginTop: 40}]}>ON BOARDING</Text>
        <Button title='to Sign Up' onPress={this.onPress} />
        <OurButton title='to Home' onPress={this.onPressHome} />
      </View>
    )
  }
}
