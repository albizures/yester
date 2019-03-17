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

export default class NewPassword extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  state = {
    password: '',
  }

  onPress = async () => {
    const { navigation } = this.props
    const { password } = this.state

    const code = navigation.getParam('code')
    const email = navigation.getParam('email')

    try {
      await Auth.forgotPasswordSubmit(email, code, password)
      navigation.navigate('AppLoading')
    } catch (error) {
      console.error('NewPassword: ', error)
      Alert.alert(translate('new.password.error'))
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
    const { password } = this.state

    const topBar = (
      <TopBar title='new.password.topbar' onBack={this.onBack} />
    )

    return (
      <Container topBar={topBar}>
        <KeyboardAwareScrollView extraScrollHeight={20}>
          <View style={{ marginHorizontal: 20 }}>
            <View style={styles.topFlex}>
              <Heading2 keyName='new.password.title' style={styles.titleText} />
              <Heading4 keyName='new.password.subtitle' style={styles.subtitleText} />
            </View>
            <View style={styles.bottomFlex}>
              <TextInput
                title='new.password'
                autoCapitalize='none'
                password
                value={password}
                description='new.password.passwordDescription'
                onChangeText={text => this.onChange(text.toLowerCase(), 'password')} />
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
