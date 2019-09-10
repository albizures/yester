import React from 'react'
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import { getCurrentProfile } from '../utils/fbHelper'
import debugFactory from 'debug'

const debugError = debugFactory('yester:withFBLogin:error')

const permissions = ['email', 'public_profile']

export default (Component) => {
  const onLoginWithFB = async () => {
    const { isCancelled } = await LoginManager.logInWithPermissions(permissions)
    if (isCancelled) {
      debugError('Login cancelled')
      throw new Error('Login cancelled')
    }
    const {
      accessToken: token,
      expirationTime: expires,
    } = await AccessToken.getCurrentAccessToken()
    const profile = await getCurrentProfile()
    return {
      profile,
      token,
      expires,
    }
  }

  const withFBLogin = (props) => {
    return <Component {...props} onLoginWithFB={onLoginWithFB} />
  }

  return withFBLogin
}
