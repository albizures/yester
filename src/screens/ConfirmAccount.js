import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Alert, StyleSheet, Image, KeyboardAvoidingView } from 'react-native'
import { Auth } from 'aws-amplify'
import {Heading2, Heading3, Heading4} from '../components'
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
    const topBar = (
      <TopBar title='confirm.topbar' onBack={this.onBack} />
    )
    return (
      <Container scroll topBar={topBar}>
        <KeyboardAvoidingView enabled behavior='position' >
          <View style={styles.container}>
            <Image source={icons.ssPluma} style={styles.image} />
            <View style={{alignItems: 'center'}} >
              <Heading2 keyName='confirm.title' style={styles.title} />
              <Heading4 keyName='confirm.subtitle' style={{textAlign: 'center'}} />
              <View style={styles.body}>
                <Heading4 keyName='confirm.label' />
                <Heading3 text='{contact}' data={{contact: email || number}}
                  style={{textAlign: 'center'}} />
                <Heading4 keyName='confirm.note' style={{textAlign: 'center', marginTop: 35}} />
              </View>
              <TextInput title='confirm.inputLabel' keyboardType='numeric'
                value={code} onChangeText={text => this.onChange(text, 'code')} />

              <Button title='confirm.submit' style={{marginTop: 10}} onPress={this.onPress} />
            </View>
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
  image: {
    width: 79,
    height: 92,
    marginTop: 90,
    marginBottom: 40,
  },
  title: {
    textAlign: 'center',
    color: colors.governorBay,
  },
  body: {
    alignItems: 'center',
    marginTop: 35,
    marginBottom: 50,
  },
})
