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

const createStyledTranslation = (styled) => ({ style, ...props }) => (
  <Translate {...props} style={[styles.text].concat(styled).concat(style)} />
)

Translate.propTypes = {
  keyName: PropTypes.string.isRequired,
  data: PropTypes.object,
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Karla-Regular',
    color: colors.mineShaft,
    textAlign: 'left',
  },
  heading1: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  heading2: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  heading3: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  heading4: {
    fontSize: 18,
  },
  heading5: {
    fontSize: 16,
  },
  title: {
    fontSize: 20,
  },
  description: {
    fontSize: 12,
  },
})

export default Translate
export const Heading1 = createStyledTranslation(styles.heading1)
export const Heading2 = createStyledTranslation(styles.heading2)
export const Heading3 = createStyledTranslation(styles.heading3)
export const Heading4 = createStyledTranslation(styles.heading4)
export const Heading5 = createStyledTranslation(styles.heading5)
export const Title = createStyledTranslation(styles.title)
export const Description = createStyledTranslation(styles.description)
