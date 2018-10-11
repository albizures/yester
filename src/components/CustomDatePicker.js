import React from 'react'
import PropTypes from 'prop-types'
import { View, ViewPropTypes, StyleSheet, Image, TouchableOpacity } from 'react-native'
import colors from '../utils/colors'
import Translate from '../components/Translate'
import icons from '../utils/icons'
import DatePicker from 'react-native-datepicker'

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

const CustomDatePicker = (props) => {
  const {title, editable, description, value, validation,
    validationMessage, show} = props
  const stateStyle = stateStyles[editable ? states.ENABLED : states.DISABLED]
  const validationStyle = validationStyles[validation]

  var descriptionLabel
  if (description != null) {
    descriptionLabel = <Translate keyName={description}
      style={styles.description} />
  }

  var validationLabel
  if (validation !== validations.NONE) {
    validationLabel = <Translate keyName={validationMessage}
      style={[styles.validation, validationStyle.validation]} />
  }

  var showButton
  var onPress = () => {}
  if (show != null) {
    onPress = show
    showButton = <TouchableOpacity onPress={onPress}>
      <View style={[{flex: 1, width: 55, justifyContent: 'center'}]}>
        <Translate keyName='signup.showPassword' style={[{fontFamily: 'Karla-Regular',
          color: colors.royalBlue,
          fontSize: 14,
          fontWeight: 'bold',
          textAlign: 'left',
        }]} />
      </View>
    </TouchableOpacity>
  }

  return (
    <View style={[{marginVertical: 10}]} >
      <View style={[styles.labelContainer]}>
        <Translate keyName={title}
          style={[styles.tile, stateStyle.title, validationStyle.title]} />
      </View>
      <View style={[styles.input, stateStyle.input, validationStyle.input]}>
        <DatePicker {...props}
          date={value}
          mode='date'
          placeholder='YYYY-MM-DD'
          format='YYYY-MM-DD'
          showIcon={false}
          confirmBtnText='Confirm'
          cancelBtnText='Cancel'
          customStyles={{
            dateTouchBody: {
              flexDirection: 'row',
              height: 50,
              width: 300,
              alignItems: 'center',
              justifyContent: 'center',
            },
            dateIcon: {
              width: 32,
              height: 32,
              marginLeft: 5,
              marginRight: 5,
            },
            dateInput: {
              flex: 1,
              height: 50,
              width: 300,
              borderWidth: 0,
              borderColor: '#fff',
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingLeft: 20,
            },
            dateText: {
              fontSize: 18,
              color: colors.mineShaft,
            },
            placeholderText: {
              fontSize: 18,
              color: colors.mineShaft,
            },
          }}
        />
        {showButton}
        {// <Image source={icons.fb} style={{ width: 20, height: 20, marginRight: 9 }} />
        }
      </View>
      <View style={[{justifyContent: 'flex-end'}]}>{/* styles.labelContainer, */}
        {validationLabel}
      </View>
      <View style={[{justifyContent: 'flex-end'}]}>{/* styles.labelContainer, */}
        {descriptionLabel}
      </View>
    </View>
  )
}

CustomDatePicker.propTypes = {
  style: ViewPropTypes.style,
  title: PropTypes.string.isRequired,
  editable: PropTypes.bool,
  description: PropTypes.string,
  value: PropTypes.string,
  validation: PropTypes.oneOf(Object.keys(validations)),
  validationMessage: PropTypes.string,
}

CustomDatePicker.defaultProps = {
  editable: true,
  validation: validations.NONE,
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    flexDirection: 'row',
    width: 300,
    maxHeight: 50,
    borderRadius: 25,
    shadowColor: colors.mischka,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 15,
    shadowOpacity: 1.0,
    elevation: 10,
  },
  title: {
    position: 'absolute',
    left: 0,
    top: 0,
    fontSize: 12,
  },
  description: {
    fontSize: 12,
    color: colors.mineShaft,
  },
  labelContainer: {
    minHeight: 24,
  },
  validation: {
  },
})

const stateStyles = {
  [states.ENABLED]: {
    input: {
      backgroundColor: colors.white,
      borderColor: colors.white,
      borderWidth: 0.5,
    },
    title: {
      color: colors.governorBay,
    },
    description: {
    },
    validation: {
    },
  },
  [states.DISABLED]: {
    input: {
      backgroundColor: colors.mischka,
      borderColor: colors.mischka,
      borderWidth: 0.5,
    },
    title: {
      color: colors.mischka,
    },
    description: {
    },
    validation: {
    },
  },
}

const validationStyles = {
  [validations.NONE]: {
    input: {
    },
    title: {
    },
    description: {
    },
    validation: {
    },
  },
  [validations.GOOD]: {
    input: {
      backgroundColor: colors.white,
      borderColor: colors.apple,
      borderWidth: 2,
    },
    title: {
      color: colors.apple,
    },
    description: {
    },
    validation: {
      color: colors.apple,
    },
  },
  [validations.WAIT]: {
    input: {
      backgroundColor: colors.white,
      borderColor: colors.selectiveYellow,
      borderWidth: 2,
    },
    title: {
      color: colors.selectiveYellow,
    },
    description: {
    },
    validation: {
      color: colors.selectiveYellow,
    },
  },
  [validations.BAD]: {
    input: {
      backgroundColor: colors.white,
      borderColor: colors.bittersweet,
      borderWidth: 2,
    },
    title: {
      color: colors.bittersweet,
    },
    description: {
    },
    validation: {
      color: colors.bittersweet,
    },
  },
}

export default CustomDatePicker
