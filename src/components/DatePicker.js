import React from 'react'
import PropTypes from 'prop-types'
import { ViewPropTypes, StyleSheet } from 'react-native'
import colors from '../utils/colors'
import RNDatePicker from 'react-native-datepicker'
import InputContainer, { types } from '../components/InputContainer'

const DatePicker = (props) => {
  const {title, value} = props

  return (
    <InputContainer title={title} type={types.PICKER} >
      <RNDatePicker {...props}
        date={value}
        mode='date'
        placeholder='YYYY-MM-DD'
        format='YYYY-MM-DD'
        showIcon={false}
        confirmBtnText='Confirm'
        cancelBtnText='Cancel'
        customStyles={customStyles}
        style={{width: 300}}
      />
    </InputContainer>
  )
}

DatePicker.propTypes = {
  style: ViewPropTypes.style,
  title: PropTypes.string.isRequired,
  value: PropTypes.string,
}

DatePicker.defaultProps = {
  editable: true,
}

const customStyles = StyleSheet.create({
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
})

export default DatePicker
