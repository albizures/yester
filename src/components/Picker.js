import React from 'react'
import PropTypes from 'prop-types'
import { ViewPropTypes, StyleSheet } from 'react-native'
import colors from '../utils/colors'
import RNPickerSelect from 'react-native-picker-select'
import InputContainer, { types } from '../components/InputContainer'

const Picker = (props) => {
  const { title } = props

  return (
    <InputContainer {...props} title={title} type={types.PICKER}>
      <RNPickerSelect
        {...props}
        style={pickerSelectStyles}
        useNativeAndroidPickerStyle={false}
        placeholderTextColor={colors.mineShaft}
        hideIcon
      />
    </InputContainer>
  )
}

Picker.propTypes = {
  style: ViewPropTypes.style,
  title: PropTypes.string.isRequired,
}

Picker.defaultProps = {
  editable: true,
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: 300,
    height: 50,
    fontSize: 18,
    borderRadius: 25,
    borderWidth: 0,
    backgroundColor: 'white',
    color: colors.mineShaft,
    paddingLeft: 20,
  },
  inputAndroid: {
    width: 300,
    height: 50,
    fontSize: 18,
    borderRadius: 25,
    borderWidth: 0,
    backgroundColor: 'white',
    color: colors.mineShaft,
    paddingLeft: 20,
  },
  viewContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  done: {
    color: '#007AFF',
    fontWeight: 'normal',
    padding: 10,
    fontSize: 16,
  },
})

export default Picker
