import React from 'react'
import PropTypes from 'prop-types'
import suppplant from 'suppplant'
import { Text } from 'react-native'
import LocalizedStrings from 'react-native-localization'

const strings = new LocalizedStrings({
  en: require('../translations/en'),
  es: require('../translations/es'),
})

const Translate = ({ keyName, data, ...props }) => (
  <Text {...props}>{suppplant(strings[keyName], data)}</Text>
)

Translate.propTypes = {
  keyName: PropTypes.string.isRequired,
  data: PropTypes.object,
}

export default Translate
