import { Auth } from 'aws-amplify'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View, Text, StyleSheet, AsyncStorage, Alert, Image, Modal, WebView } from 'react-native'
import { FACEBOOK_URL_LOGIN } from 'react-native-dotenv'

import icons from '../utils/icons'
import colors from '../utils/colors'
import { loginWithFBWebView } from '../utils/session'

import Button from '../components/Button'
import Divider from '../components/Divider'
import { Heading2, Description, Heading3, Heading4 } from '../components'
import Container from '../components/Container'
import TextDivider from '../components/TextDivider'
import withFBLogin from '../components/withFBLogin'

class CreateAccount extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    onLoginWithFB: PropTypes.func.isRequired,
  }

  state = {
    fbWebViewVisible: false,
    isLoading: false,
  }

  onFBNativeLogin = async () => {
    const { onLoginWithFB, navigation } = this.props

    try {
      const { token, expires, profile } = await onLoginWithFB()
      const { sessionToken } = await Auth.federatedSignIn('facebook', {token, expires_at: expires}, profile)
      AsyncStorage.setItem('userToken', sessionToken)
      navigation.navigate('App')
    } catch (error) {
      console.log('Login', error)
      Alert.alert(error.message)
    }
  }

  onFBWebView = async () => {
    this.setState({ fbWebViewVisible: true })
  }

  onFBWebViewStateChange = async (event) => {
    console.log('onFBWebViewStateChange', event.url)
    if (event.url.includes('https://www.yester.app/#access_token=')) {
      this.setState({ fbWebViewVisible: false, isLoading: true })
      try {
        await loginWithFBWebView(event.url)
      } catch (error) {
        console.log('onFBWebViewStateChange', error)
        Alert.alert('Error')
      }
      this.props.navigation.navigate('AppLoading')
    }
  }

  onSignIn = () => {
    this.props.navigation.navigate('SignUp')
  }

  onLogin = () => {
    this.props.navigation.navigate('Login')
  }

  render () {
    const { fbWebViewVisible, isLoading } = this.state
    return (
      <Container isLoading={isLoading}>
        <Modal
          animationType='fade'
          transparent
          visible={fbWebViewVisible} >
          { fbWebViewVisible && (
            <View style={styles.fbWebViewContainer}>
              <WebView
                style={{ flex: 1 }}
                source={{uri: FACEBOOK_URL_LOGIN}}
                onNavigationStateChange={this.onFBWebViewStateChange} />
            </View>
          )}
        </Modal>
        <View style={styles.container}>
          <Image source={icons.ssYester}
            style={{width: 225, height: 60, marginTop: 96}} />
          <View style={[{alignItems: 'center', marginTop: 54, marginBottom: 60}]} >
            <Heading2 keyName='createAccount.start' style={[{color: colors.governorBay, textAlign: 'center'}]} />
            <Heading4 keyName='createAccount.begin' style={[{textAlign: 'center'}]} />
          </View>

          <Button title='createAccount.continue' onPress={this.onFBWebView} icon={icons.fb} />

          <Description keyName='createAccount.recommendation' style={{textAlign: 'center', marginTop: 20}} />

          <TextDivider style={{marginVertical: 30}} >
            <Heading3 keyName='createAccount.or' />
          </TextDivider>

          <Button
            title='createAccount.create'
            style={{marginBottom: 78}}
            onPress={this.onSignIn}
            type={Button.OUTLINED}
          />

          <View style={{marginBottom: 15}}>
            <Divider style={{width: 300, marginBottom: 15}} />
            <Text>
              <Heading4 keyName='createAccount.member' style={{textAlign: 'center'}} />
              <Heading3 keyName='createAccount.login' style={{color: colors.governorBay, textAlign: 'center'}} onPress={this.onLogin} />
            </Text>
          </View>
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
    backgroundColor: colors.athensGray,
  },
  fbWebViewContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
})

export default withFBLogin(CreateAccount)
