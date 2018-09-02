import Amplify, { Auth } from 'aws-amplify'
// import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Text, View, Button, Alert, AsyncStorage } from 'react-native'
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import {
  AWS_REGION,
  AWS_IDENTITY_POOL_ID,
  AWS_USER_POOL_ID,
  AWS_USER_CLIENT_POOL_ID,
} from 'react-native-dotenv'

import { getCurrentProfile } from '../utils/fbHelper'

const permissions = ['email', 'public_profile']

Amplify.configure({
  Auth: {
    identityPoolId: AWS_IDENTITY_POOL_ID,
    region: AWS_REGION,
    userPoolId: AWS_USER_POOL_ID,
    userPoolWebClientId: AWS_USER_CLIENT_POOL_ID,
  },
})

export default class Login extends Component {
  // static propTypes = {
  //   navigation: PropTypes.object.isRequired,
  // }

  onPress = async () => {
    try {
      const { isCancelled } = await LoginManager.logInWithReadPermissions(permissions)
      if (isCancelled) {
        throw new Error('Login cancelled')
      }
      const { accessToken: token, expirationTime: expires } = await AccessToken.getCurrentAccessToken()
      const profile = await getCurrentProfile()
      const { sessionToken } = await Auth.federatedSignIn('facebook', {token, expires_at: expires}, profile)
      AsyncStorage.setItem('token', sessionToken)
    } catch (error) {
      console.log('Login', error)
      Alert.alert(error.message)
    }
  }

  render () {
    return (
      <View>
        <Text style={[{textAlign: 'center', marginTop: 40}]}>LOG IN</Text>
        <Button title='Login with Facebook' onPress={this.onPress} />
      </View>
    )
  }
}
