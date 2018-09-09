import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import colors from '../utils/colors'

const TextDivider = ({children}) => {
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
  },
  section: {
    flex: 1,
  },
  divider: {
    height: 1,
    borderWidth: 1,
    backgroundColor: colors.mischka,
    borderColor: colors.mischka,
  },
})

export default TextDivider
