
import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'

import colors from '../../utils/colors'

const Dot = ({ active }) => {
  return <View style={[styles.dot, { backgroundColor: active ? colors.black : colors.gray }]} />
}

Dot.propTypes = {
  active: PropTypes.bool,
}

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
})

export default Dot
