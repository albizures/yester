import React from 'react'
import PropTypes from 'prop-types'
import suppplant from 'suppplant'
import { Text } from 'react-native'
import LocalizedStrings from 'react-native-localization'

export const strings = new LocalizedStrings({
  en: require('../translations/en'),
  es: require('../translations/es'),
})

export const translate = (keyName, data) => {
  const text = strings[keyName]
  if (!text) {
    throw new Error(`'${keyName}' doesn't exist`)
  }

  return suppplant(strings[keyName], data)
}

const Translate = ({ keyName, data, ...props }) => (
  <Text {...props}>{suppplant(strings[keyName], data)}</Text>
)

Translate.propTypes = {
  keyName: PropTypes.string.isRequired,
  data: PropTypes.object,
}

export default Translate
