import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableHighlight, Image, ViewPropTypes, StyleSheet } from 'react-native'
import colors from '../utils/colors'
import { Heading3 } from '../components'

export const types = {
  FILLED: 'FILLED',
  OUTLINED: 'OUTLINED',
}

export const sizes = {
  NORMAL: 'NORMAL',
  SMALL: 'SMALL',
}

const states = {
  ENABLED: 'ENABLED',
  DISABLED: 'DISABLED',
}

const Button = (props) => {
  const { title, type, size, icon, disabled } = props
  const typeStyle = typeStyles[disabled ? states.DISABLED : states.ENABLED][type]
  const sizeStyle = sizeStyles[size]

  return (
    <TouchableHighlight
      {...props}
      style={[styles.button, typeStyle.button, sizeStyle.button, props.style]}
    >
      <View style={styles.row}>
        {icon && <Image source={icon} style={[styles.icon, typeStyle.icon]} />}
        <Heading3 keyName={title} style={[styles.text, typeStyle.text]} />
      </View>
    </TouchableHighlight>
  )
}

Object.assign(Button, types, sizes, states)

Button.propTypes = {
  style: ViewPropTypes.style,
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.keys(types)),
  icon: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  size: PropTypes.oneOf(Object.keys(sizes)),
  disabled: PropTypes.bool,
}

Button.defaultProps = {
  type: types.FILLED,
  size: sizes.NORMAL,
  disabled: false,
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 50,
    borderRadius: 24,
    borderWidth: 2,
    justifyContent: 'center',
    shadowColor: colors.brightTurquoise,
    shadowOpacity: 0.22,
    shadowRadius: 15,
    shadowOffset: {
      height: 10,
    },
    elevation: 10,
  },
  text: {
    textAlign: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 9,
  },
})

const typeStyles = {
  [states.ENABLED]: {
    [types.FILLED]: StyleSheet.create({
      button: {
        backgroundColor: colors.governorBay,
        borderColor: colors.governorBay,
      },
      text: {
        color: colors.white,
      },
      icon: {
        tintColor: colors.white,
      },
    }),
    [types.OUTLINED]: StyleSheet.create({
      button: {
        backgroundColor: colors.white,
        borderColor: colors.governorBay,
      },
      text: {
        color: colors.governorBay,
      },
      icon: {
        tintColor: colors.governorBay,
      },
    }),
  },
  [states.DISABLED]: {
    [types.FILLED]: StyleSheet.create({
      button: {
        backgroundColor: colors.mischka,
        borderColor: colors.mischka,
      },
      text: {
        color: colors.white,
      },
      icon: {
        tintColor: colors.white,
      },
    }),
    [types.OUTLINED]: StyleSheet.create({
      button: {
        backgroundColor: colors.white,
        borderColor: colors.mischka,
      },
      text: {
        color: colors.mischka,
      },
      icon: {
        tintColor: colors.mischka,
      },
    }),
  },
}

const sizeStyles = {
  [sizes.NORMAL]: StyleSheet.create({
    button: {
      width: 300,
    },
  }),
  [sizes.SMALL]: StyleSheet.create({
    button: {
      width: 150,
    },
  }),
}

export default Button
