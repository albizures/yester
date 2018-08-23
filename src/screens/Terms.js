import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, Button } from 'react-native'

export default class Terms extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  onPress = () => {
    this.props.navigation.navigate('Home')
  }

  render () {
    return (
      <View>
        <Text style={[{textAlign: 'center', marginTop: 40}]}>TERMS AND CONDITIONS</Text>
        <Button title='to Home' onPress={this.onPress} />
      </View>
    )
  }
}