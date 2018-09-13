import { Auth } from 'aws-amplify'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Text, Alert, View, TextInput, StyleSheet } from 'react-native'

import icons from '../utils/icons'
import colors from '../utils/colors'
import { logIn, saveUserToken } from '../utils/session'

import Button from '../components/Button'
import { Title } from '../components/Translate'
import Container from '../components/Container'
import withFBLogin from '../components/withFBLogin'
import TextDivider from '../components/TextDivider'

class Login extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    onLoginWithFB: PropTypes.func.isRequired,
  }

  state = {
    email: '',
    password: '',
  }

  onFBLogin = async () => {
    const { onLoginWithFB, navigation } = this.props

    try {
      const { token, expires, profile } = onLoginWithFB()
      await Auth.federatedSignIn('facebook', {token, expires_at: expires}, profile)
      await saveUserToken()
      navigation.navigate('App')
    } catch (error) {
      console.log('Login', error)
      Alert.alert(error.message)
    }
  }

  onLogin = async () => {
    const { navigation } = this.props
    const { email, password } = this.state
    try {
      await logIn(email, password)
      navigation.navigate('App')
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
    const { email, password } = this.state
    return (
      <Container>
        <Text style={[{textAlign: 'center', marginTop: 40}]}>LOG IN</Text>
        <Button onPress={this.onFBLogin} title='createAccount.continue' icon={icons.fb} />
        <TextDivider>
          <Title keyName='createAccount.or' />
        </TextDivider>
        <View style={styles.input}>
          <TextInput value={email} onChangeText={text => this.onChange(text, 'email')} />
        </View>
        <View style={styles.input}>
          <TextInput secureTextEntry value={password} onChangeText={text => this.onChange(text, 'password')} />
        </View>
        <Button onPress={this.onLogin} title='createAccount.login' type={Button.OUTLINED} />
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

export default withFBLogin(Login)
