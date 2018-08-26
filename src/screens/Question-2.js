import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, Button } from 'react-native'

export default class Question2 extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  onPress = () => {
    this.props.navigation.navigate('Reading')
  }

  render () {
    return (
      <View>
        <Text style={[{textAlign: 'center', marginTop: 40}]}>QUESTION-2</Text>
        <Button title='to Reading' onPress={this.onPress} />
      </View>
    )
  }
}
