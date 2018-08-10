import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, Button } from 'react-native'

export default class Home2 extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  onPress = () => {
    this.props.navigation.navigate('Home3')
  }

  render () {
    return (
      <View>
        <Text style={[{textAlign: 'center', marginTop: 40}]}>HOME-2</Text>
        <Button title='to Home-3' onPress={this.onPress} />
      </View>
    )
  }
}
