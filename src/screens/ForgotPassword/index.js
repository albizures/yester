import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { View, Alert, StyleSheet, Dimensions } from 'react-native'
import { Auth } from 'aws-amplify'

import Container from '../../components/Container'
import Button from '../../components/Button'
import { Heading2, Heading4 } from '../../components'
import TopBar from '../../components/TopBar'
import TextInput from '../../components/TextInput'
import colors from '../../utils/colors'
import { translate } from '../../components/Translate'

export default class ForgotPassword extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  state = {
    email: '',
  }

  onPress = async () => {
    const { navigation } = this.props
    const { email } = this.state

    try {
      await Auth.forgotPassword(email)
      navigation.navigate('RecoverCode', { email })
    } catch (error) {
      console.error('ForgotPassword: ', error)
      Alert.alert(translate('forgot.password.error'))
    }
  }

  onChange = (value, name) => {
    this.setState({
      [name]: value,
    })
  }

  onBack = () => {
    const { navigation } = this.props
    navigation.navigate('Login')
  }

  render () {
    const {
      email,
    } = this.state

    const topBar = (
      <TopBar title='forgot.password.topbar' onBack={this.onBack} />
    )

    return (
      <Container topBar={topBar}>
        <KeyboardAwareScrollView extraScrollHeight={20}>
          <View style={{ marginHorizontal: 20 }}>
            <View style={styles.topFlex}>
              <Heading2 keyName='forgot.password.title' style={styles.titleText} />
              <Heading4 keyName='forgot.password.subtitle' style={styles.subtitleText} />
            </View>
            <View style={styles.bottomFlex}>
              <TextInput title='forgot.password.email' autoCapitalize='none' keyboardType='email-address'
                value={email} onChangeText={text => this.onChange(text.toLowerCase(), 'email')} />
              <Button title='forgot.password.submit' onPress={this.onPress} />
            </View>
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
    marginBottom: 20,
  },
  subtitleText: {
    textAlign: 'center',
  },
})
