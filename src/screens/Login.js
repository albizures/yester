import { Auth } from 'aws-amplify'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Text, Alert, View, StyleSheet } from 'react-native'

import icons from '../utils/icons'
import colors from '../utils/colors'
import { logIn, saveUserToken, isSetupFinished } from '../utils/session'

import Button from '../components/Button'
import { Title } from '../components/Translate'
import Container from '../components/Container'
import withFBLogin from '../components/withFBLogin'
import TextDivider from '../components/TextDivider'
import TextInput from '../components/TextInput'

class Login extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    onLoginWithFB: PropTypes.func.isRequired,
  }

  state = {
    email: '',
    password: '',
    show: false,
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
      if (await isSetupFinished()) {
        navigation.navigate('App')
      } else {
        navigation.navigate('Setup')
      }
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

  onPressShow = () => {
    this.setState({
      show: !this.state.show,
    })
  }

  render () {
    const { email, password, show } = this.state
    return (

      <Container>
        <View style={styles.view}>
          <Text style={[{textAlign: 'center', marginTop: 40}]}>LOG IN</Text>
          <Button onPress={this.onFBLogin} title='createAccount.continue' icon={icons.fb} />
          <TextDivider>
            <Title keyName='createAccount.or' />
          </TextDivider>
          <TextInput title='signup.email' autoCapitalize='none' keyboardType='email-address'
            value={email} onChangeText={text => this.onChange(text, 'email')} />
          <TextInput title='signup.password' show={this.onPressShow}
            secureTextEntry={!show} value={password} onChangeText={text => this.onChange(text, 'password')} />
          <Button onPress={this.onLogin} title='createAccount.login' type={Button.OUTLINED} />
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  view: {alignItems: 'center'},
})

export default withFBLogin(Login)
