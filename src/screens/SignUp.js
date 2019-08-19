import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View, Alert, StyleSheet, Dimensions, Platform } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Auth } from 'aws-amplify'
import Container from '../components/Container'
import Button from '../components/Button'
import { Heading2, Heading4 } from '../components'
import TopBar from '../components/TopBar'
import TextInput from '../components/TextInput'
import colors from '../utils/colors'
import { strings, translate } from '../components/Translate'
import { logIn, postAPIUser } from '../utils/session'
import DeviceInfo from 'react-native-device-info'
import debugFactory from 'debug'

const debugError = debugFactory('yester:SignUp:error')
const debugInfo = debugFactory('yester:SignUp:info')

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
    const { navigation } = this.props
    const { firstName, lastName, email, password } = this.state

    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          given_name: firstName,
          family_name: lastName,
          locale: strings.getLanguage(),
        },
      })
      await logIn(email, password)

      // TODO Find the best way to allow manual name update.
      const currentUser = await Auth.currentAuthenticatedUser()
      await postAPIUser({
        email: currentUser.attributes.email,
        given_name: currentUser.attributes['given_name'],
        family_name: currentUser.attributes['family_name'],
        locale: currentUser.attributes['locale'],
        platform: Platform.OS,
        build: DeviceInfo.getBuildNumber(),
        version: DeviceInfo.getVersion(),
        email_verified: false,
      })

      return navigation.navigate('ConfirmAccount', { email, signUpVerify: true })
    } catch (error) {
      debugError(error)
      if (error.code === 'UsernameExistsException') {
        Alert.alert(translate('signup.usernameExistsException'))
      } else Alert.alert(translate('signup.error'))
    }
  }

  onChange = (value, name) => {
    this.setState({
      [name]: value,
    })
  }

  onBack = () => {
    const { navigation } = this.props
    navigation.navigate('CreateAccount')
  }

  render () {
    const { firstName, lastName, email, password } = this.state

    const topBar = <TopBar title='signup.topbar' onBack={this.onBack} />
    return (
      <Container scroll topBar={topBar}>
        <KeyboardAwareScrollView extraScrollHeight={470} enableOnAndroid>
          <View style={styles.topFlex}>
            <Heading2 keyName='signup.title' style={styles.titleText} />
            <Heading4 keyName='signup.subtitle' style={styles.subtitleText} />
          </View>

          <View style={styles.bottomFlex}>
            <TextInput
              title='signup.firstName'
              value={firstName}
              onChangeText={(text) => this.onChange(text, 'firstName')}
            />
            <TextInput
              title='signup.lastName'
              value={lastName}
              onChangeText={(text) => this.onChange(text, 'lastName')}
            />
            <TextInput
              title='signup.email'
              autoCapitalize='none'
              keyboardType='email-address'
              value={email}
              onChangeText={(text) => this.onChange(text.toLowerCase(), 'email')}
              description='signup.emailDescription'
            />
            {/*
            <TextInput
              title='signup.confirmEmail'
              autoCapitalize='none'
              keyboardType='email-address'
              value={email}
              onChangeText={(text) => this.onChange(text.toLowerCase(), 'confirmEmail')}
            />
            */}
            <TextInput
              title='signup.password'
              password
              value={password}
              onChangeText={(text) => this.onChange(text, 'password')}
              description='signup.passwordDescription'
            />
            {/*
            <TextInput
              title='signup.confirmPassword'
              password
              value={password}
              onChangeText={(text) => this.onChange(text, 'confirmPassword')}
            />
            */}
            <Button title='signup.submit' onPress={this.onPress} />
          </View>
        </KeyboardAwareScrollView>
      </Container>
    )
  }
}

const { height } = Dimensions.get('window')
const styles = StyleSheet.create({
  topFlex: {
    justifyContent: 'flex-start',
    paddingTop: height * 0.045,
    marginBottom: height * 0.045,
  },
  bottomFlex: {
    alignItems: 'center',
  },
  titleText: {
    textAlign: 'center',
    color: colors.governorBay,
  },
  subtitleText: {
    textAlign: 'center',
  },
})
