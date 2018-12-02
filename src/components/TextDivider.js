import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import colors from '../utils/colors'

const TextDivider = ({ children }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.divider, styles.section]} />
      <View styles={styles.section}>
        {children}
      </View>
      <View style={[styles.divider, styles.section]} />
    </View>
  )
}

TextDivider.propTypes = {
  children: PropTypes.node.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    flex: 1,
  },
  divider: {
    marginHorizontal: 11,
    height: 1,
    borderWidth: 0,
    backgroundColor: colors.mischka,
    borderColor: colors.mischka,
  },
})

export default TextDivider
