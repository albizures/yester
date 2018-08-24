import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableHighlight, Image, ViewPropTypes } from 'react-native'
import colors from '../utils/colors'
import Translate from '../components/Translate'

const Button = (props) => {
  var specificButton = styles.filledButton
  var specificText = styles.filledButtonText
  var specificIcon = styles.filledButtonIcon
  var icon

  if (props.type !== 'filled') {
    specificButton = styles.outlinedButton
    specificText = styles.outlinedButtonText
    specificIcon = styles.outlinedButtonIcon
  }
  if (props.icon !== 0) {
    specificText.paddingLeft = 9
    icon = <Image source={props.icon} style={[styles.icon, specificIcon]} />
  }
  if (props.size === 'small') {
    specificButton.width = 150
  }

  return (
    <TouchableHighlight {...props} elevation={10}
      style={[props.style, styles.button, specificButton]}>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        {icon}
        <Translate style={[styles.text, specificText]} keyName={props.title} />
      </View>
    </TouchableHighlight>
  )
}

Button.propTypes = {
  style: ViewPropTypes.style,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  icon: PropTypes.number.isRequired,
  size: PropTypes.string.isRequired,
}

const styles = {
  button: {
    height: 50,
    width: 300,
    borderRadius: 24,
    borderWidth: 2,
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  filledButton: {
    backgroundColor: colors.governorBay,
    borderColor: colors.governorBay,
  },
  outlinedButton: {
    backgroundColor: colors.white,
    borderColor: colors.governorBay,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  filledButtonText: {
    color: colors.white,
  },
  outlinedButtonText: {
    color: colors.governorBay,
  },
  icon: {width: 20, height: 20},
  filledButtonIcon: {
    tintColor: colors.white,
  },
  outlinedButtonIcon: {
    tintColor: colors.governorBay,
  },
}

export default Button
