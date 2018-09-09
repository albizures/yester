import { Auth } from 'aws-amplify'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Text, Alert, AsyncStorage } from 'react-native'

import withFBLogin from '../components/withFBLogin'
import Button from '../components/Button'
import Translate from '../components/Translate'
import TextDivier from '../components/TextDivider'
import Container from '../components/Container'

class MainLogin extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    onLoginWithFB: PropTypes.func.isRequired,
  }

  onPressSignIn = () => {
  }

  onPress = async () => {
    const { onLoginWithFB, navigation } = this.props

    try {
      const { token, expires, profile } = onLoginWithFB()
      const { sessionToken } = await Auth.federatedSignIn('facebook', {token, expires_at: expires}, profile)
      AsyncStorage.setItem('userToken', sessionToken)
      navigation.navigate('App')
    } catch (error) {
      console.log('Login', error)
      Alert.alert(error.message)
    }
  }

  render () {
    return (
      <Container>
        <Text style={[{textAlign: 'center', marginTop: 40}]}>LOG IN</Text>
        <Button title='createAccount.continue' onPress={this.onPress} />
        <Translate keyName='common.upperTitle' />
        <Translate keyName='createAccount.begin' />
        <Button onPress={this.onPress} title='createAccount.continue' />
        <Translate keyName='createAccount.recommendation' />
        <TextDivier>
          <Translate keyName='createAccount.or' />
        </TextDivier>
        <Button onPress={this.onPressSignIn} title='createAccount.create' />
      </Container>
    )
  }
}

export default withFBLogin(MainLogin)
