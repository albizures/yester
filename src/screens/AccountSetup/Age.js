import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'

import Trasnlate from '../../components/Translate'

export default class AgeSetup extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
  }
  render () {
    const { name } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Trasnlate style={styles.text} keyName='setup.age.greeting' data={{ name }} />
          <Trasnlate style={styles.text} keyName='setup.age.greeting.subtitle' data={{ name }} />
        </View>
        <Trasnlate style={styles.text} keyName='setup.age.question' data={{ name }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
  top: {
    marginHorizontal: 50,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    margin: 10,
  },
})
