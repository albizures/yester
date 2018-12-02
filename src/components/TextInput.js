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
    const { title, editable, value, password } = this.props
    const { show } = this.state

    let config = { type: types.INPUT, secure: false, buttonText: '', width: 300 }
    if (password) {
      config = { type: types.PASSWORD, secure: !show, buttonText: !show ? 'textInput.show' : 'textInput.hide', width: 200 }
    }

    return (
      <InputContainer {...this.props} title={title} show={this.onPressShow} type={config.type} buttonText={config.buttonText} >
        <RNTextInput
          {...this.props}
          secureTextEntry={config.secure}
          value={value}
          paddingHorizontal={20}
          height={50}
          width={config.width}
          color={(editable) ? colors.mineShaft : colors.white}
          style={{ width: config.width }}
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
