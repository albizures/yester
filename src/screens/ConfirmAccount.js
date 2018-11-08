import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Alert, StyleSheet, Image, KeyboardAvoidingView, Dimensions } from 'react-native'
import { Auth } from 'aws-amplify'
import { Description, Heading2, Heading3, Heading4 } from '../components'
import Container from '../components/Container'
import TopBar from '../components/TopBar'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { logIn } from '../utils/session'
import colors from '../utils/colors'
import icons from '../utils/icons'

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
      navigation.navigate('AppLoading')
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
      console.log('ConfirmAccount', error)
      Alert.alert(error.message || error)
    }
  }

  onPressResend () {
    // Get user's email to send another verification code
    // const user = Auth.resendSignUp({username: email})
  }

  render () {
    const { code } = this.state
    const { navigation } = this.props
    const email = navigation.getParam('email')
    const number = navigation.getParam('number')
    const topBar = (
      <TopBar title='confirm.topbar' onBack={this.onBack} />
    )
    return (
      <Container scroll topBar={topBar}>
        <KeyboardAvoidingView enabled behavior='position' >
          <View style={styles.container}>
            <View style={styles.topFlex}>
              <Image source={icons.feather} style={styles.image} />
              <Heading2 keyName='confirm.title' style={styles.titleText} />
              <Heading4 keyName='confirm.subtitle' style={styles.subtitleText} />
            </View>

            <View style={styles.middleFlex} >
              <Heading4 keyName='confirm.label' />
              <Heading3 text='{contact}' data={{contact: email || number}}
                style={styles.contactText} />
              <Heading4 keyName='confirm.note' style={styles.noteText} />
            </View>

            <View style={styles.bottomFlex}>
              <TextInput title='confirm.inputLabel' keyboardType='numeric'
                value={code} onChangeText={text => this.onChange(text, 'code')} />
              <Button title='confirm.submit' onPress={this.onPress} />
              <Description text='Send verification code again' style={styles.resendText}
                onPress={this.onPressResend} />
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
    flex: 1,
    backgroundColor: colors.athensGray,
    paddingHorizontal: width * 0.08,
    paddingTop: height * 0.12,
    paddingBottom: height * 0.18,
  },
  topFlex: {
    flex: 0.4,
    alignItems: 'center',
    paddingBottom: height * 0.05,
  },
  middleFlex: {
    flex: 0.4,
    alignItems: 'center',
    paddingBottom: height * 0.025,
  },
  bottomFlex: {
    flex: 0.2,
    alignItems: 'center',
  },
  image: {
    width: 79,
    height: 92,
    marginBottom: height * 0.06,
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
    marginBottom: height * 0.05,
  },
  noteText: {
    textAlign: 'center',
  },
  resendText: {
    textAlign: 'center',
    marginTop: 20,
  },
})
