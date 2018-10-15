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

const fontColor = colors.mineShaft

const Translate = ({ keyName, data, ...props }) => (
  <Text {...props}>{suppplant(strings[keyName], data)}</Text>
)

export const Heading1 = ({ style, ...props }) => (
  <Translate {...props} style={[styles.heading1].concat(style)} />
)

export const Heading2 = ({ style, ...props }) => (
  <Translate {...props} style={[styles.heading2].concat(style)} />
)

export const Heading3 = ({ style, ...props }) => (
  <Translate {...props} style={[styles.heading3].concat(style)} />
)

export const Heading4 = ({ style, ...props }) => (
  <Translate {...props} style={[styles.heading4].concat(style)} />
)

export const Heading5 = ({ style, ...props }) => (
  <Translate {...props} style={[styles.heading5].concat(style)} />
)

export const Title = ({ style, ...props }) => (
  <Translate {...props} style={[styles.title].concat(style)} />
)

export const Description = ({ style, ...props }) => (
  <Translate {...props} style={[styles.description].concat(style)} />
)

Title.propTypes = {
  style: Text.propTypes.style,
}

Translate.propTypes = {
  keyName: PropTypes.string.isRequired,
  data: PropTypes.object,
}

const styles = StyleSheet.create({
  heading1: {
    fontFamily: 'Karla-Regular',
    color: fontColor,
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  heading2: {
    fontFamily: 'Karla-Regular',
    color: fontColor,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  heading3: {
    fontFamily: 'Karla-Regular',
    color: fontColor,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  heading4: {
    fontFamily: 'Karla-Regular',
    color: fontColor,
    fontSize: 18,
    textAlign: 'left',
  },
  heading5: {
    fontFamily: 'Karla-Regular',
    color: fontColor,
    fontSize: 16,
    textAlign: 'left',
  },
  title: {
    fontFamily: 'Karla-Regular',
    color: fontColor,
    fontSize: 20,
    textAlign: 'left',
  },
  description: {
    fontFamily: 'Karla-Regular',
    color: fontColor,
    fontSize: 12,
    textAlign: 'left',
  },
})

export default Translate
