import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import Trasnlate from '../../components/Translate'

export default class Done extends Component {
  static propTypes = {
    year: PropTypes.number.isRequired,
  }
  render () {
    const { year } = this.props
    return (
      <View>
        <Trasnlate keyName='setup.place.title' data={{ year }} />
        <Trasnlate keyName='setup.place.subtitle' />
        <Trasnlate keyName='setup.place.form.title' />
      </View>
    )
  }
}
