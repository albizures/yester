import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Alert, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { Auth } from 'aws-amplify'
import {Heading2, Heading3, Heading4} from '../components'
import Container from '../components/Container'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { logIn } from '../utils/session'
import colors from '../utils/colors'

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
      navigation.navigate('Setup')
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

  render () {
    const { code } = this.state
    const { navigation } = this.props
    const email = navigation.getParam('email')
    const number = navigation.getParam('number')
    return (
      <Container style={styles.container}>
        <KeyboardAvoidingView enabled behavior='position' >
          <View style={{alignItems: 'center'}} >
            <Heading2 keyName='confirm.title' style={styles.title} />
            <Heading4 keyName='confirm.subtitle' style={{textAlign: 'center'}} />
            <View style={{alignItems: 'center', marginVertical: 35}}>
              <Heading4 keyName='confirm.label' />
              <Heading3 text='{contact}' data={{contact: email || number}}
                style={{textAlign: 'center'}} />
              <Heading4 keyName='confirm.note' style={{textAlign: 'center', marginTop: 35}} />
            </View>
            <TextInput title='confirm.inputLabel' keyboardType='numeric'
              value={code} onChangeText={text => this.onChange(text, 'code')} />

            <Button title='confirm.submit' style={{marginTop: 10}} onPress={this.onPress} />
          </View>
        </KeyboardAvoidingView>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.athensGray,
    paddingHorizontal: 30,
  },
  title: {
    textAlign: 'center',
    color: colors.governorBay,
    marginTop: 200,
  },
})
