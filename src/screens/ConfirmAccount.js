import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Alert,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import { Auth } from 'aws-amplify'
import { Body1, Heading2, Heading3, Heading4, Description } from '../components'
import Container from '../components/Container'
import TopBar from '../components/TopBar'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { updateUserAttribute } from '../utils/session'
import colors from '../utils/colors'
import icons from '../utils/icons'
import debugFactory from 'debug'

const debugError = debugFactory('yester:ConfirmAccount:error')
const debugInfo = debugFactory('yester:ConfirmAccount:info')

export default class ConfirmAccount extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  constructor () {
    super()
    Auth.verifyCurrentUserAttribute('email')
    this.state = {
      code: '',
    }
  }

  componentDidMount () {
    const { navigation } = this.props
    const email = navigation.getParam('email')
    const number = navigation.getParam('number')
    const signUpVerify = navigation.getParam('signUpVerify')

    this.setState({
      code: '',
      email,
      number,
      signUpVerify,
    })
  }

  onChange = (value, name) => {
    this.setState({
      [name]: value,
    })
  }

  onPressContinue = async () => {
    const { navigation } = this.props
    const { code } = this.state

    try {
      await Auth.verifyCurrentUserAttributeSubmit('email', code)
      await updateUserAttribute('email_verified', true)
      return navigation.navigate('AppLoading')
    } catch (error) {
      debugError('ConfirmAccount', error)
      Alert.alert(error.message || error)
    }
  }

  onPressSkip = async () => {
    const { navigation } = this.props
    return navigation.navigate('AppLoading')
  }

  onPressResend () {
    Auth.verifyCurrentUserAttribute('email')
  }

  render () {
    const { code, email, number, signUpVerify } = this.state

    const skipElement = (
      <TouchableOpacity>
        <Description keyName='confirm.skip' style={styles.skipLabel} onPress={this.onPressSkip} />
      </TouchableOpacity>
    )

    const topBar = <TopBar title='confirm.topbar' onBack={this.onBack} />
    return (
      <Container topBar={topBar}>
        <KeyboardAvoidingView enabled behavior='position'>
          <View style={styles.container}>
            <View style={styles.topFlex}>
              <Image source={icons.feather} style={styles.image} />
              <Heading2 keyName='confirm.title' style={styles.titleText} />
              <Heading4 keyName='confirm.subtitle' style={styles.subtitleText} />
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
              <TouchableOpacity>
                <Body1
                  keyName='confirm.resendCode'
                  style={styles.resendText}
                  onPress={this.onPressResend}
                />
              </TouchableOpacity>
              <Button title='confirm.submit' onPress={this.onPressContinue} />
              {signUpVerify ? skipElement : null}
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
  },
  topFlex: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: height * 0.04,
    // marginBottom: height * 0.04,
  },
  bottomFlex: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    width: 79,
    height: 92,
    marginBottom: height * 0.03,
  },
  titleText: {
    textAlign: 'center',
    color: colors.governorBay,
  },
  subtitleText: {
    textAlign: 'center',
    marginBottom: height * 0.04,
  },
  contactText: {
    textAlign: 'center',
    marginBottom: height * 0.04,
  },
  noteText: {
    textAlign: 'center',
  },
  resendText: {
    alignSelf: 'flex-start',
    color: colors.governorBay,
    textAlign: 'left',
    marginTop: height * -0.01,
    marginBottom: height * 0.03,
    paddingLeft: 8,
  },
  skipLabel: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginTop: height * 0.04,
  },
})
