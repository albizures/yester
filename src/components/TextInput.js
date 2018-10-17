import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ViewPropTypes, TextInput as RNTextInput } from 'react-native'
import colors from '../utils/colors'
import InputContainer, { types } from '../components/InputContainer'

export default class TextInput extends Component {
  state = {
    show: false,
  }

  onPressShow = () => {
    this.setState({
      show: !this.state.show,
    })
  }

  render () {
    const {title, editable, value, password} = this.props
    const { show } = this.state

    let config = {type: types.INPUT, secure: false}
    if (password) {
      config = {type: types.PASSWORD, secure: !show}
    }

    return (
      <InputContainer {...this.props} title={title} show={this.onPressShow} type={config.type} >
        <RNTextInput
          {...this.props}
          secureTextEntry={config.secure}
          value={value}
          paddingHorizontal={20}
          height={50}
          width={245}
          color={(editable) ? colors.mineShaft : colors.white}
        />
      </InputContainer>
    )
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    style: ViewPropTypes.style,
    editable: PropTypes.bool,
    value: PropTypes.string,
    password: PropTypes.bool,
  }

  static defaultProps = {
    editable: true,
    password: false,
  }
}
