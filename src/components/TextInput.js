import React from 'react'
import PropTypes from 'prop-types'
import { ViewPropTypes, TextInput as RNTextInput } from 'react-native'
import colors from '../utils/colors'
import InputContainer, { types } from '../components/InputContainer'

const TextInput = (props) => {
  const {title, editable, value, show} = props

  return (
    <InputContainer title={title} show={show} type={types.INPUT} >
      <RNTextInput {...props}
        value={value}
        paddingHorizontal={20}
        height={50}
        width={245}
        color={(editable) ? colors.mineShaft : colors.white}
      />
    </InputContainer>
  )
}

TextInput.propTypes = {
  title: PropTypes.string.isRequired,
  style: ViewPropTypes.style,
  editable: PropTypes.bool,
  value: PropTypes.string,
}

TextInput.defaultProps = {
  editable: true,
}

export default TextInput
