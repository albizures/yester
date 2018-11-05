import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import colors from '../utils/colors'
import { Description, Body1 } from '../components'
import icons from '../utils/icons'

const states = {
  ENABLED: 'ENABLED',
  DISABLED: 'DISABLED',
}

export const validations = {
  NONE: 'NONE',
  GOOD: 'GOOD',
  WAIT: 'WAIT',
  BAD: 'BAD',
}

export const types = {
  INPUT: 'INPUT',
  PASSWORD: 'PASSWORD',
  PICKER: 'PICKER',
}

const InputContainer = (props) => {
  const { title, editable, description, validation, style,
    validationMessage, show, children, type, buttonText } = props
  const stateStyle = stateStyles[editable ? states.ENABLED : states.DISABLED]
  const validationStyle = validationStyles[validation]

  let descriptionLabel
  if (description) {
    descriptionLabel = (
      <View style={[styles.labelContainer, {justifyContent: 'flex-end'}]}>
        <Description keyName={description} />
      </View>
    )
  }

  let validationLabel
  if (validation !== validations.NONE) {
    validationLabel = (
      <Description
        keyName={validationMessage}
        style={[styles.validation, validationStyle.validation]}
      />
    )
  }

  let showIcon
  if (type === types.PASSWORD) {
    showIcon = (
      <TouchableOpacity onPress={show}>
        <View style={styles.showTextView}>
          <Body1 keyName={buttonText}
            style={{color: colors.royalBlue}} />
        </View>
      </TouchableOpacity>
    )
  }
  if (type === types.PICKER) {
    showIcon = (
      <View style={styles.showIconView}>
        <Image
          source={icons.chevronDown}
          style={{ width: 15, height: 8, marginRight: 20 }} />
      </View>
    )
  }

  return (
    <View style={[style, {marginBottom: 30}]} >
      <View style={[styles.labelContainer]}>
        <Description keyName={title}
          style={[styles.title, stateStyle.title, validationStyle.title]} />
      </View>
      <View style={[styles.input, stateStyle.input, validationStyle.input]}>
        {children}
        {showIcon}
      </View>
      <View style={[{justifyContent: 'flex-end'}]}>{/* styles.labelContainer, */}
        {validationLabel}
      </View>
      {descriptionLabel}
    </View>
  )
}

InputContainer.propTypes = {
  title: PropTypes.string.isRequired,
  editable: PropTypes.bool,
  description: PropTypes.string,
  validation: PropTypes.oneOf(Object.keys(validations)),
  type: PropTypes.oneOf(Object.keys(types)),
  validationMessage: PropTypes.string,
  show: PropTypes.func,
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
}

InputContainer.defaultProps = {
  editable: true,
  validation: validations.NONE,
}

const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    width: 300,
    height: 50,
    borderRadius: 25,
    shadowColor: colors.shadow,
    shadowOpacity: 0.22,
    shadowRadius: 15,
    shadowOffset: {
      height: 10,
    },
    elevation: 10,
  },
  title: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  labelContainer: {
    minHeight: 24,
  },
  validation: {
  },
  showTextView: {
    flex: 1,
    width: 100,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 16,
  },
  showIconView: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
})

const stateStyles = {
  [states.ENABLED]: StyleSheet.create({
    input: {
      backgroundColor: colors.white,
      borderColor: colors.white,
      borderWidth: 0.5,
    },
    title: {
      color: colors.governorBay,
    },
    validation: {
    },
  }),
  [states.DISABLED]: StyleSheet.create({
    input: {
      backgroundColor: colors.mischka,
      borderColor: colors.mischka,
      borderWidth: 0.5,
    },
    title: {
      color: colors.mischka,
    },
    validation: {
    },
  }),
}

const validationStyles = {
  [validations.NONE]: StyleSheet.create({
    input: {
    },
    title: {
    },
    validation: {
    },
  }),
  [validations.GOOD]: StyleSheet.create({
    input: {
      backgroundColor: colors.white,
      borderColor: colors.apple,
      borderWidth: 2,
    },
    title: {
      color: colors.apple,
    },
    validation: {
      color: colors.apple,
    },
  }),
  [validations.WAIT]: StyleSheet.create({
    input: {
      backgroundColor: colors.white,
      borderColor: colors.selectiveYellow,
      borderWidth: 2,
    },
    title: {
      color: colors.selectiveYellow,
    },
    validation: {
      color: colors.selectiveYellow,
    },
  }),
  [validations.BAD]: StyleSheet.create({
    input: {
      backgroundColor: colors.white,
      borderColor: colors.bittersweet,
      borderWidth: 2,
    },
    title: {
      color: colors.bittersweet,
    },
    validation: {
      color: colors.bittersweet,
    },
  }),
}

export default InputContainer
