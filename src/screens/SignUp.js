import React, { Component } from 'react'
import {
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  Text, View, Dimensions,
} from 'react-native'
import PropTypes from 'prop-types'

import Translate from '../components/Translate'
import styles from '../styles/common'

class SignUp extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  onPressSubscription = () => {
    this.props.navigation.navigate('SignUp2')
  }

  onPressLogin = () => {
    this.props.navigation.navigate('LogIn')
  }

  render () {
    return (
      <View style={localStyles.container2}>
        <ScrollView style={[localStyles.container]}>
          <Text style={[styles.display2, localStyles.margin]}>
            <Translate keyName='common.upperTitle' />
          </Text>
          <Text style={[styles.title, localStyles.margin]}>
            <Translate keyName='signUp.weKnow' />
            <Text style={{fontWeight: 'bold'}}>
              <Translate keyName='signUp.weWant' />
            </Text>
          </Text>
          <Text style={[styles.title, localStyles.margin]}>
            <Translate keyName='signUp.receive' />
          </Text>
          <TouchableHighlight onPress={this.onPressSubscription}
            style={[styles.button, styles.filledButton]}>
            <Text style={[styles.buttonText]}>
              <Translate keyName='signUp.start' />
            </Text>
          </TouchableHighlight>

          <Text style={[styles.body1, localStyles.margin]}>
            <Translate keyName='signUp.price' />
          </Text>

          <TouchableHighlight onPress={this.onPressLogin}
            style={[styles.button, styles.outlinedButton, localStyles.margin]}>
            <Text style={[styles.buttonText, styles.notColor]}>
              <Translate keyName='signUp.logIn' />
            </Text>
          </TouchableHighlight>

          <View style={[styles.separator, localStyles.margin]} />
          <Text style={[styles.body2, {textAlign: 'left', marginBottom: height * 0.01}]}>
            <Translate keyName='signUp.cancel' />
          </Text>
          <Text style={[styles.body1, {textAlign: 'left'}]}>
            <Translate keyName='signUp.recurring' />
          </Text>
        </ScrollView>
        <View style={localStyles.container3}>
          <Text style={[styles.title, {textAlign: 'center'}]}>
            <Translate keyName='signUp.already' />
            <Text style={[{fontWeight: 'bold', textDecorationLine: 'underline'}]}>
              <Translate keyName='signUp.restore' />
            </Text>
          </Text>
        </View>
      </View>
    )
  }
}

let { height, width } = Dimensions.get('window')
const localStyles = StyleSheet.create({
  container: {
    height: height * 0.92,
    paddingTop: height * 0.075,
    paddingHorizontal: width * 0.08,
    flex: 1,
    flexDirection: 'column',
    zIndex: 0,
  },
  container2: {
    position: 'absolute',
    backgroundColor: '#fff',
  },
  container3: {
    position: 'absolute',
    marginTop: height * 0.92,
    height: height * 0.08,
    width: width,
    zIndex: 2,
    backgroundColor: '#BDE0FC',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  margin: {
    marginBottom: height * 0.03,
  },
})

export default SignUp
