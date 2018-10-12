import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View, Alert } from 'react-native'
import { Auth } from 'aws-amplify'

import Container from '../components/Container'
import Button from '../components/Button'
import Translate from '../components/Translate'
import TopBar from '../components/TopBar'
import TextInput from '../components/TextInput'

export default class SignUp extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    show: false,
  }

  onPressShow = () => {
    this.setState({
      show: !this.state.show,
    })
  }

  onPress = async () => {
    const {
      firstName,
      lastName,
      email,
      password,
    } = this.state

    try {
      const user = await Auth.signUp({
        username: email,
        password,
        attributes: {
          given_name: firstName,
          family_name: lastName,
        },
      })

      this.props.navigation.navigate('ConfirmAccount', { user, email })
    } catch (error) {
      console.log('Login', error)
      Alert.alert(error.message)
    }
  }

  onChange = (value, name) => {
    this.setState({
      [name]: value,
    })
  }

  render () {
    const {
      firstName,
      lastName,
      email,
      password,
      show,
    } = this.state

    const topBar = (
      <TopBar title='signup.topbar' />
    )
    return (
      <Container scroll topBar={topBar}>
        <Translate keyName='signup.title' style={[{textAlign: 'center', marginTop: 40}]} />
        <Translate keyName='signup.subtitle' style={[{textAlign: 'center', marginTop: 40}]} />
        <View style={{alignItems: 'center'}}>
          <TextInput title='signup.firstName'
            value={firstName} onChangeText={text => this.onChange(text, 'firstName')} />
          <TextInput title='signup.lastName'
            value={lastName} onChangeText={text => this.onChange(text, 'lastName')} />
          <TextInput title='signup.email' autoCapitalize='none' keyboardType='email-address'
            value={email} onChangeText={text => this.onChange(text, 'email')} />
          <TextInput title='signup.password' show={this.onPressShow}
            secureTextEntry={!show} value={password} onChangeText={text => this.onChange(text, 'password')} />
          <Button title='signup.submit' onPress={this.onPress} />
        </View>
      </Container>
    )
  }
}
