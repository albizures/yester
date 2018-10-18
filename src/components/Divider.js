import React from 'react'
import { StyleSheet, View, ViewPropTypes } from 'react-native'
import colors from '../utils/colors'

const Divider = ({style}) => {
  return (
    <View style={[styles.container, style]} />
  )
}

Divider.propTypes = {
  style: ViewPropTypes.style,
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 22,
    height: 1,
    borderWidth: 0,
    borderColor: colors.mischka,
    backgroundColor: colors.mischka,
  },
})

export default Divider
