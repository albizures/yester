import React from 'react'
import suppplant from 'suppplant'
import { Text, StyleSheet } from 'react-native'
import Translate from './Translate'
import colors from '../utils/colors'

const createStyledText = (defaultStyles) => ({ keyName, data, text, style, ...props }) => {
  if (text !== undefined) {
    return (
      <Text {...props}
        style={defaultStyles.concat(style)} >
        {suppplant(text, data)}
      </Text>
    )
  }

  if (keyName !== undefined) {
    return (
      <Translate {...props}
        style={defaultStyles.concat(style)}
        keyName={keyName}
        data={data} />
    )
  }

  return null
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
  body1: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  body2: {
    fontSize: 14,
  },
  description: {
    fontSize: 14,
  },
})

export const Heading1 = createStyledText([styles.text, styles.heading1])
export const Heading2 = createStyledText([styles.text, styles.heading2])
export const Heading3 = createStyledText([styles.text, styles.heading3])
export const Heading4 = createStyledText([styles.text, styles.heading4])
export const Heading5 = createStyledText([styles.text, styles.heading5])
export const Title = createStyledText([styles.text, styles.title])
export const Body1 = createStyledText([styles.text, styles.body1])
export const Body2 = createStyledText([styles.text, styles.body2])
export const Description = createStyledText([styles.text, styles.description])
