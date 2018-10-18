import { Auth } from 'aws-amplify'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Alert, View, StyleSheet } from 'react-native'

import icons from '../utils/icons'
import colors from '../utils/colors'
import { logIn, saveUserToken, isSetupFinished } from '../utils/session'
import Button from '../components/Button'
import { Heading2, Heading3, Description } from '../components'
import Container from '../components/Container'
import withFBLogin from '../components/withFBLogin'
import TextDivider from '../components/TextDivider'
import TextInput from '../components/TextInput'
import TopBar from '../components/TopBar'

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

  render () {
    const { email, password } = this.state
    const topBar = (
      <TopBar title='createAccount.login' />
    )
    return (
      <Container scroll topBar={topBar}>
        <View style={styles.view}>
          <Button
            title='createAccount.continue'
            style={{marginTop: 36}}
            onPress={this.onFBLogin}
            icon={icons.fb}
          />
          <Description keyName='createAccount.recommendation' style={{textAlign: 'center', marginTop: 20, marginBottom: 30}} />
          <TextDivider style={{marginVertical: 30}} >
            <Heading3 keyName='createAccount.or' />
          </TextDivider>
          <Heading2 keyName='login.loginAccount' style={{color: colors.governorBay, marginTop: 30, marginBottom: 20}} />
          <View style={{height: 178, alignItems: 'center', justifyContent: 'space-between', marginBottom: 20}} >
            <TextInput title='signup.email' autoCapitalize='none' keyboardType='email-address'
              value={email} onChangeText={text => this.onChange(text, 'email')} />
            <TextInput title='signup.password' password
              value={password} onChangeText={text => this.onChange(text, 'password')} />
          </View>

          <View style={{width: 300, height: 30, alignItems: 'flex-start', justifyContent: 'flex-start'}}>
            <Description keyName='login.forgotPassword' style={{fontSize: 14, fontWeight: 'bold', color: colors.governorBay}} />
          </View>
          <Button onPress={this.onLogin} title='createAccount.login' type={Button.OUTLINED} />
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.athensGray,
  },
})

export default withFBLogin(Login)
