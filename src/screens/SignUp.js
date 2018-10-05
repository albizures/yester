import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View, TextInput, StyleSheet, Alert } from 'react-native'
import { Auth } from 'aws-amplify'

import colors from '../utils/colors'
import Container from '../components/Container'
import Button from '../components/Button'
import Translate from '../components/Translate'

export default class SignUp extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
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
    } = this.state
    return (
      <Container scroll>
        <Translate keyName='signin.title' style={[{textAlign: 'center', marginTop: 40}]} />
        <Translate keyName='signin.subtitle' style={[{textAlign: 'center', marginTop: 40}]} />
        <View style={styles.input}>
          <TextInput value={firstName} onChangeText={text => this.onChange(text, 'firstName')} />
        </View>
        <View style={styles.input}>
          <TextInput value={lastName} onChangeText={text => this.onChange(text, 'lastName')} />
        </View>
        <View style={styles.input}>
          <TextInput value={email} onChangeText={text => this.onChange(text, 'email')} />
        </View>
        <View style={styles.input}>
          <TextInput secureTextEntry value={password} onChangeText={text => this.onChange(text, 'password')} />
        </View>
        <Button title='signin.submit' onPress={this.onPress} />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    borderColor: colors.black,
    borderStyle: 'solid',
    borderWidth: 1,
    marginBottom: 10,
  },
})
