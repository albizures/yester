import { Auth } from 'aws-amplify'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import icons from '../utils/icons'
import colors from '../utils/colors'
import Button from '../components/Button'
import Divider from '../components/Divider'
import { Heading2, Description, Heading3, Heading4 } from '../components'
import Container from '../components/Container'
import TextDivider from '../components/TextDivider'
import withFBLogin from '../components/withFBLogin'
import { translate } from '../components/Translate'
import { View, Text, StyleSheet, Alert, Image, Dimensions, StatusBar, Platform } from 'react-native'
import { screen, track } from '../utils/analytics'
import { postAPIUser } from '../utils/session'
import DeviceInfo from 'react-native-device-info'
import debugFactory from 'debug'

const debugInfo = debugFactory('yester:CreateAccount:info')
const debugError = debugFactory('yester:CreateAccount:error')

class CreateAccount extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    onLoginWithFB: PropTypes.func.isRequired,
  }

  state = {
    fbWebViewVisible: false,
    isLoading: false,
  }

  componentDidMount () {
    screen('CreateAccount', {})
  }

  onFBNativeLogin = async () => {
    const { onLoginWithFB, navigation } = this.props

    try {
      const { token, expires, profile } = await onLoginWithFB()
      debugInfo('Profile: ', profile, expires)
      await Auth.federatedSignIn('facebook', { token, expires_at: expires }, profile)
      // AsyncStorage.setItem('userToken', credentials.sessionToken)

      const currentUser = await Auth.currentAuthenticatedUser()
      await postAPIUser({
        email: currentUser.email,
        given_name: profile['first_name'],
        family_name: profile['last_name'],
        platform: Platform.OS,
        build: DeviceInfo.getBuildNumber(),
        version: DeviceInfo.getVersion(),
      })

      return navigation.navigate('AppLoading')
    } catch (error) {
      debugError('FB Create Account:', JSON.stringify(error))
      Alert.alert(translate('signup.error.facebook'))
    }
  }

  onFBWebView = async () => {
    track('To FBWebView', {})
    this.props.navigation.navigate('FBWebView')
  }

  onSignIn = () => {
    this.props.navigation.navigate('SignUp')
  }

  onLogin = () => {
    this.props.navigation.navigate('Login')
  }

  render () {
    const { isLoading } = this.state
    return (
      <Container isLoading={isLoading}>
        <View style={styles.container}>
          <StatusBar barStyle='dark-content' />

          <View style={styles.topFlex}>
            <Image source={icons.yester} style={styles.image} />
            <Heading2 keyName='createAccount.start' style={styles.accentColor} />
            <Heading4 keyName='createAccount.begin' />
          </View>

          <View style={styles.middleFlex}>
            <Button title='createAccount.continue' onPress={this.onFBNativeLogin} icon={icons.fb} />
            <Description keyName='createAccount.recommendation' style={styles.recommendationText} />
            <TextDivider>
              <Heading3 keyName='createAccount.or' />
            </TextDivider>
            <Button title='createAccount.create' onPress={this.onSignIn} type={Button.OUTLINED} />
          </View>

          <View style={styles.bottomFlex}>
            <Divider style={styles.divider} />
            <Text>
              <Heading4 keyName='createAccount.member' />
              <Heading3
                keyName='createAccount.login'
                style={styles.accentColor}
                onPress={this.onLogin}
              />
            </Text>
          </View>
        </View>
      </Container>
    )
  }
}

const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.athensGray,
    paddingHorizontal: width * 0.07,
    paddingTop: height * 0.1,
    paddingBottom: height * 0.04,
  },
  image: {
    width: 225,
    height: 60,
    marginBottom: height * 0.1,
  },
  topFlex: {
    flex: 4.0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: height * 0.08,
  },
  middleFlex: {
    flex: 4.5,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: height * 0.08,
  },
  bottomFlex: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  recommendationText: {
    marginTop: 20,
  },
  divider: {
    width: 300,
    marginBottom: 15,
  },
  accentColor: {
    color: colors.governorBay,
  },
})

export default withFBLogin(CreateAccount)
