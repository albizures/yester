import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View, Alert, StyleSheet, Dimensions } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Auth } from 'aws-amplify'
import Container from '../components/Container'
import Button from '../components/Button'
import { Heading2, Heading4 } from '../components'
import TopBar from '../components/TopBar'
import TextInput from '../components/TextInput'
import colors from '../utils/colors'
import { strings, translate } from '../components/Translate'

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
      const user = await Auth.signUp({
        username: email,
        password,
        attributes: {
          given_name: firstName,
          family_name: lastName,
          locale: strings.getLanguage(),
        },
      })

      return navigation.navigate('ConfirmAccount', { user, email, password })
    } catch (error) {
      console.log('Create Account: ', error)
      Alert.alert(translate('signup.error'))
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
        <KeyboardAwareScrollView extraScrollHeight={140} enableOnAndroid>
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
            <TextInput
              title='signup.password'
              password
              value={password}
              onChangeText={(text) => this.onChange(text, 'password')}
              description='signup.passwordDescription'
            />
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
    flex: 0.25,
    justifyContent: 'flex-start',
    paddingTop: height * 0.045,
    paddingBottom: height * 0.045,
  },
  bottomFlex: {
    flex: 0.75,
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
