import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

// import Trasnlate from '../../components/Translate'

export default class Done extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
  }
  render () {
    const { name } = this.props
    return (
      <View>
        <Text>place {name}</Text>
      </View>
    )
  }
}
