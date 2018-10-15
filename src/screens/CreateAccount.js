import { Auth } from 'aws-amplify'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View, Text, StyleSheet, AsyncStorage, Alert } from 'react-native'

import icons from '../utils/icons'
import colors from '../utils/colors'

import Button from '../components/Button'
import Divider from '../components/Divider'
import { Title, Description, Heading1, Heading3, Heading4 } from '../components/Translate'
import Container from '../components/Container'
import TextDivider from '../components/TextDivider'
import withFBLogin from '../components/withFBLogin'

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
      <Container>
        <View style={styles.container}>
          <Heading1 keyName='common.upperTitle' style={{textAlign: 'center', marginTop: 96}} />

          <Title keyName='createAccount.begin' style={[{fontWeight: 'bold', textAlign: 'center', marginTop: 54, marginBottom: 60}]} />

          <Button title='createAccount.continue' onPress={this.onFBLogin} icon={icons.fb} />

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
})

export default withFBLogin(CreateAccount)
