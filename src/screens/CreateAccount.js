import { Auth } from 'aws-amplify'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { StyleSheet, Dimensions, AsyncStorage, Alert, View } from 'react-native'

import icons from '../utils/icons'
import colors from '../utils/colors'
import styles from '../styles/common'

import Button from '../components/Button'
import Divider from '../components/Divider'
import Translate, { Title } from '../components/Translate'
import Container from '../components/Container'
import TextDivier from '../components/TextDivider'
import withFBLogin from '../components/withFBLogin'

const { height, width } = Dimensions.get('window')

class CreateAccount extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    onLoginWithFB: PropTypes.func.isRequired,
  }

  onFBLogin = async () => {
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

  onSignIn = () => {
    this.props.navigation.navigate('SignUp')
  }

  onLogin = () => {
    this.props.navigation.navigate('Login')
  }

  render () {
    return (
      <Container style={localStyles.container}>
        <Translate style={[styles.h1, localStyles.margin, {textAlign: 'center'}]}
          keyName='common.upperTitle' />
        <Title style={[localStyles.margin, {fontWeight: 'bold', textAlign: 'center'}]}
          keyName='createAccount.begin' />

        <Button onPress={this.onFBLogin} title='createAccount.continue' icon={icons.fb} />

        <Translate style={[styles.body1, localStyles.margin]}
          keyName='createAccount.recommendation' />

        <TextDivier>
          <Title keyName='createAccount.or' />
        </TextDivier>
        <Button onPress={this.onSignIn} title='createAccount.create' type={Button.OUTLINED} />
        <View>
          <Divider />
          <Translate style={[styles.body1]} keyName='createAccount.member' />
          <Translate style={[styles.body1]} keyName='createAccount.login' onPress={this.onLogin} />
        </View>
      </Container>
    )
  }
}

const localStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignContent: 'center',
    paddingBottom: height * 0.25,
    paddingHorizontal: width * 0.08,
    backgroundColor: colors.white,
  },
  margin: {
    marginBottom: height * 0.03,
  },
})

export default withFBLogin(CreateAccount)
