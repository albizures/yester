import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Alert, TextInput, StyleSheet, Text } from 'react-native'
import { Auth } from 'aws-amplify'

import colors from '../utils/colors'
import Translate from '../components/Translate'
import Container from '../components/Container'
import Button from '../components/Button'

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

  onPress = async () => {
    const { navigation } = this.props
    const email = navigation.getParam('email')
    const { code } = this.state
    try {
      await Auth.confirmSignUp(email, code)
    } catch (error) {
      console.log('ConfirmAccount', error)
      Alert.alert(error.message || error)
    }
  }

  render () {
    const { email, number, code } = this.state
    return (
      <Container>
        <Translate keyName='confirm.title' />
        <Translate keyName='confirm.subtitle' />
        <View>
          <Translate keyName='confirm.label' />
          <Text>{email || number}</Text>
        </View>
        <View style={styles.input}>
          <TextInput style={styles.borderColor} value={code} onChangeText={text => this.onChange(text, 'code')} />
        </View>
        <Button title='confirm.submit' onPress={this.onPress} />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    borderColor: colors.black,
    borderStyle: 'solid',
    borderWidth: 1,
    marginBottom: 10,
  },
})
