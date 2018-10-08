import React from 'react'
import PropTypes from 'prop-types'
import suppplant from 'suppplant'
import { Text, StyleSheet } from 'react-native'
import LocalizedStrings from 'react-native-localization'

import colors from '../utils/colors'

const strings = new LocalizedStrings({
  en: require('../translations/en'),
  es: require('../translations/es'),
})

const Translate = ({ keyName, data, ...props }) => (
  <Text {...props}>{suppplant(strings[keyName], data)}</Text>
)

export const Title = ({ style, ...props }) => (
  <Translate {...props} style={[styles.title].concat(style)} />
)

Title.propTypes = {
  style: Text.propTypes.style,
}

Translate.propTypes = {
  keyName: PropTypes.string.isRequired,
  data: PropTypes.object,
}

const styles = StyleSheet.create({
  title: {
    // fontFamily: 'Karla-Regular',
    color: colors.mineShaft,
    fontSize: 20,
    textAlign: 'left',
  },
})

export default Translate
