import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import Trasnlate from '../../components/Translate'

export default class Done extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    place: PropTypes.string.isRequired,
  }
  render () {
    const { name, place } = this.props
    return (
      <View>
        <Trasnlate keyName='setup.done.title' data={{ name, place }} />
        <Trasnlate keyName='setup.done.subtitle' />
      </View>
    )
  }
}
