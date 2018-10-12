import React from 'react'
import PropTypes from 'prop-types'
import { ViewPropTypes, StyleSheet } from 'react-native'
import colors from '../utils/colors'
import RNPickerSelect from 'react-native-picker-select'
import InputContainer, { types } from '../components/InputContainer'

const Picker = (props) => {
  const {title} = props

  return (
    <InputContainer title={title} type={types.PICKER} >
      <RNPickerSelect
        {...props}
        style={{...pickerSelectStyles}}
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
    fontSize: 18,
    borderWidth: 0,
    backgroundColor: 'white',
    color: 'black',
  },
  viewContainer: {
    height: 50,
    width: 300,
    borderWidth: 0,
    alignSelf: 'center',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 20,
  },
})

export default Picker
