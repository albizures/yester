import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'
import LocalizedStrings from 'react-native-localization'

const strings = new LocalizedStrings({
  en: require('../translations/en'),
  es: require('../translations/es'),
})

const Translate = (props) => (
  <Text {...props}>{strings[props.keyName]}</Text>
)

Translate.propTypes = {
  keyName: PropTypes.string.isRequired,
}

export default Translate
