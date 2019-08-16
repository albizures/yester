import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Alert,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
} from 'react-native'
import { Auth } from 'aws-amplify'
import { Body1, Heading2, Heading3, Heading4 } from '../components'
import Container from '../components/Container'
import TopBar from '../components/TopBar'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { logIn, postAPIUser } from '../utils/session'
import colors from '../utils/colors'
import icons from '../utils/icons'
import DeviceInfo from 'react-native-device-info'
import debugFactory from 'debug'

const debugError = debugFactory('yester:ConfirmAccount:error')
const debugInfo = debugFactory('yester:ConfirmAccount:info')

export default class ConfirmAccount extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  constructor () {
    super()
    this.state = {
      code: '',
      email: 'albizures',
    }
  }

  onChange = (value, name) => {
    this.setState({
      [name]: value,
    })
  }

  async postConfirm () {
    const { navigation } = this.props
    const email = navigation.getParam('email')
    const password = navigation.getParam('password')
    try {
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
      })
      return navigation.navigate('AppLoading')
    } catch (error) {
      navigation.navigate('Login')
    }
  }

  onPress = async () => {
    const { navigation } = this.props
    const email = navigation.getParam('email')

    const { code } = this.state
    try {
      await Auth.confirmSignUp(email, code)
      this.postConfirm()
    } catch (error) {
      debugError('ConfirmAccount', error)
      Alert.alert(error.message || error)
    }
  }

  onPressResend () {
    const { navigation } = this.props
    const email = navigation.getParam('email')
    Auth.resendSignUp({ username: email })
  }

  render () {
    const { code } = this.state
    const { navigation } = this.props
    const email = navigation.getParam('email')
    const number = navigation.getParam('number')
    const topBar = <TopBar title='confirm.topbar' onBack={this.onBack} />
    return (
      <Container topBar={topBar}>
        <KeyboardAvoidingView enabled behavior='position'>
          <View style={styles.container}>
            <View style={styles.topFlex}>
              <Image source={icons.feather} style={styles.image} />
              <Heading2 keyName='confirm.title' style={styles.titleText} />
              <Heading4 keyName='confirm.subtitle' style={styles.subtitleText} />
            </View>

            <View style={styles.middleFlex}>
              <Heading4 keyName='confirm.label' />
              <Heading3
                text='{contact}'
                data={{ contact: email || number }}
                style={styles.contactText}
              />
              <Heading4 keyName='confirm.note' style={styles.noteText} />
            </View>

            <View style={styles.bottomFlex}>
              <TextInput
                title='confirm.inputLabel'
                keyboardType='numeric'
                value={code}
                onChangeText={(text) => this.onChange(text, 'code')}
              />
              <Body1
                keyName='confirm.resendCode'
                style={styles.resendText}
                onPress={this.onPressResend}
              />
              <Button title='confirm.submit' onPress={this.onPress} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </Container>
    )
  }
}

const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: colors.athensGray,
    paddingHorizontal: width * 0.08,
    // paddingBottom: height * 0.18,
  },
  topFlex: {
    flex: 0.3,
    alignItems: 'center',
    paddingTop: height * 0.07,
    paddingBottom: height * 0.022,
  },
  middleFlex: {
    flex: 0.2,
    alignItems: 'center',
  },
  bottomFlex: {
    flex: 0.5,
    alignItems: 'center',
  },
  image: {
    width: 79,
    height: 92,
    marginBottom: height * 0.05,
  },
  titleText: {
    textAlign: 'center',
    color: colors.governorBay,
  },
  subtitleText: {
    textAlign: 'center',
  },
  contactText: {
    textAlign: 'center',
    marginBottom: height * 0.045,
  },
  noteText: {
    textAlign: 'center',
  },
  resendText: {
    alignSelf: 'flex-start',
    color: colors.governorBay,
    textAlign: 'left',
    marginTop: 5,
    marginBottom: 35,
    paddingLeft: 7,
  },
})
