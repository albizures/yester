import { Auth } from 'aws-amplify'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Alert, View, StyleSheet, Dimensions, Platform } from 'react-native'
import icons from '../utils/icons'
import colors from '../utils/colors'
import { logIn, postAPIUser } from '../utils/session'
import Button from '../components/Button'
import { Heading2, Heading3, Description } from '../components'
import Container from '../components/Container'
import withFBLogin from '../components/withFBLogin'
import TextDivider from '../components/TextDivider'
import TextInput from '../components/TextInput'
import TopBar from '../components/TopBar'
import { translate } from '../components/Translate'
import { screen } from '../utils/analytics'
import DeviceInfo from 'react-native-device-info'
import debugFactory from 'debug'

const debugInfo = debugFactory('yester:Login:info')
const debugError = debugFactory('yester:Login:error')

class Login extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    onLoginWithFB: PropTypes.func.isRequired,
  }

  state = {
    email: '',
    password: '',
  }

  componentDidMount () {
    screen('Login', {})
  }

  onFBNativeLogin = async () => {
    const { onLoginWithFB, navigation } = this.props

    try {
      const { token, expires, profile } = await onLoginWithFB()
      debugInfo('Profile: ', profile, expires)
      await Auth.federatedSignIn('facebook', { token, expires_at: expires }, profile)

      const currentUser = await Auth.currentAuthenticatedUser()
      await postAPIUser({
        email: currentUser.email,
        given_name: profile['first_name'],
        family_name: profile['last_name'],
        platform: Platform.OS,
        build: DeviceInfo.getBuildNumber(),
        version: DeviceInfo.getVersion(),
        email_verified: true,
      })

      return navigation.navigate('AppLoading')
    } catch (error) {
      debugError('NativeFB Login', error)
      Alert.alert(translate('login.error.facebook'))
    }
  }

  onFBWebView = async () => {
    this.props.navigation.navigate('FBWebView')
  }

  onLogin = async () => {
    const { navigation } = this.props
    const { email, password } = this.state
    try {
      await logIn(email, password)

      // When isn't federatedSignIn, the user comes from CognitoUP
      // so it has got to use 'attributes' in order to get email.
      const currentUser = await Auth.currentAuthenticatedUser()
      await postAPIUser({
        email: currentUser.attributes.email,
        platform: Platform.OS,
        build: DeviceInfo.getBuildNumber(),
        version: DeviceInfo.getVersion(),
      })

      return navigation.navigate('AppLoading')
    } catch (error) {
      debugError('Login', error)
      if (error.code === 'NotAuthorizedException') {
        Alert.alert(translate('login.error.notAuthorized'))
      } else if (error.code === 'UserNotFoundException') {
        Alert.alert(translate('login.error.userNotFound'))
      } else {
        Alert.alert(translate('login.error'))
      }
    }
  }

  onChange = (value, name) => {
    this.setState({
      [name]: value,
    })
  }

  onForgotPassword = () => {
    const { navigation } = this.props
    navigation.navigate('ForgotPassword')
  }

  onBack = () => {
    const { navigation } = this.props
    navigation.navigate('CreateAccount')
  }

  render () {
    const { email, password } = this.state
    const topBar = <TopBar title='createAccount.login' onBack={this.onBack} />
    return (
      <Container topBar={topBar}>
        <KeyboardAwareScrollView extraScrollHeight={170} enableOnAndroid>
          <View style={styles.view}>
            <View style={styles.topFlex}>
              <Button
                title='createAccount.continue'
                icon={icons.fb}
                onPress={this.onFBNativeLogin}
              />
              <Description
                keyName='createAccount.recommendation'
                style={styles.recommendationText}
              />
              <TextDivider>
                <Heading3 keyName='createAccount.or' />
              </TextDivider>
              <Heading2 keyName='login.loginAccount' style={styles.loginAccountText} />
            </View>

            <View style={styles.bottomFlex}>
              <TextInput
                title='signup.email'
                autoCapitalize='none'
                keyboardType='email-address'
                value={email}
                onChangeText={(text) => this.onChange(text, 'email')}
              />
              <TextInput
                title='signup.password'
                password
                value={password}
                onChangeText={(text) => this.onChange(text, 'password')}
              />
              <Description
                keyName='login.forgotPassword'
                onPress={this.onForgotPassword}
                style={styles.forgotPasswordText}
              />
              <Button onPress={this.onLogin} title='createAccount.login' type={Button.OUTLINED} />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Container>
    )
  }
}

const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
  view: {
    width,
    height: height - 60,
    backgroundColor: colors.athensGray,
    paddingHorizontal: width * 0.07,
    paddingTop: height * 0.05,
    paddingBottom: height * 0.1,
  },
  topFlex: {
    flex: 4,
    alignItems: 'center',
    paddingBottom: height * 0.05,
  },
  bottomFlex: {
    flex: 6,
    alignItems: 'center',
  },
  recommendationText: {
    alignSelf: 'center',
    marginTop: height * 0.03,
    marginBottom: height * 0.045,
  },
  loginAccountText: {
    color: colors.governorBay,
    marginTop: height * 0.03,
  },
  forgotPasswordText: {
    fontWeight: 'bold',
    color: colors.governorBay,
    alignSelf: 'flex-start',
    paddingLeft: 10,
    marginBottom: height * 0.06,
  },
})

export default withFBLogin(Login)
