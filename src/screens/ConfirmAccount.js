import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Alert, StyleSheet, Text } from 'react-native'
import { Auth } from 'aws-amplify'
import Translate from '../components/Translate'
import Container from '../components/Container'
import Button from '../components/Button'
import TextInput from '../components/TextInput'

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
        <View style={styles.view}>
          <Translate keyName='confirm.title' />
          <Translate keyName='confirm.subtitle' />
          <View>
            <Translate keyName='confirm.label' />
            <Text>{email || number}</Text>
          </View>
          <TextInput title='confirm.inputLabel' keyboardType='numeric'
            value={code} onChangeText={text => this.onChange(text, 'code')} />

          <Button title='confirm.submit' onPress={this.onPress} />
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  view: {alignItems: 'center'},
})
