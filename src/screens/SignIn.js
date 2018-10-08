import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, Button } from 'react-native'
// import colors from '../utils/colors'
import CustomTextInput from '../components/CustomTextInput'

export default class SignIn extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  onPress = () => {
    this.props.navigation.navigate('Home')
  }

  render () {
    return (
      <View style={{alignItems: 'center'}}>
        <Text style={[{textAlign: 'center', marginTop: 40}]}>SIGN IN</Text>
        <Button title='to Home' onPress={this.onPress} />
        <CustomTextInput title='signin.firstName' />
      </View>
    )
  }
}
