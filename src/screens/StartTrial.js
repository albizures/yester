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

class StartTrial extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  onPressSubsciption = () => {
    this.props.navigation.navigate('Subscription')
  }

  onPressLogin = () => {
    this.props.navigation.navigate('Login')
  }

  render () {
    return (
      <View style={localStyles.container2}>
        <ScrollView style={[localStyles.container]}>
          <Text style={[styles.display2, localStyles.margin]}>
            <Translate keyName='common.upperTitle' />
          </Text>
          <Text style={[styles.title, localStyles.margin]}>
            <Translate keyName='startTrial.weKnow' />
            <Text style={{fontWeight: 'bold'}}>
              <Translate keyName='startTrial.weWant' />
            </Text>
          </Text>
          <Text style={[styles.title, localStyles.margin]}>
            <Translate keyName='startTrial.receive' />
          </Text>
          <TouchableHighlight onPress={this.onPressSubsciption}
            style={[styles.button, styles.filledButton]}>
            <Text style={[styles.buttonText]}>
              <Translate keyName='startTrial.start' />
            </Text>
          </TouchableHighlight>

          <Text style={[styles.body1, localStyles.margin]}>
            <Translate keyName='startTrial.price' />
          </Text>

          <TouchableHighlight onPress={this.onPressLogin}
            style={[styles.button, styles.outlinedButton, localStyles.margin]}>
            <Text style={[styles.buttonText, styles.notColor]}>
              <Translate keyName='startTrial.logIn' />
            </Text>
          </TouchableHighlight>

          <View style={[styles.separator, localStyles.margin]} />
          <Text style={[styles.body2, {textAlign: 'left', marginBottom: height * 0.01}]}>
            <Translate keyName='startTrial.cancel' />
          </Text>
          <Text style={[styles.body1, {textAlign: 'left'}]}>
            <Translate keyName='startTrial.recurring' />
          </Text>
        </ScrollView>
        <View style={localStyles.container3}>
          <Text style={[styles.title, {textAlign: 'center'}]}>
            <Translate keyName='startTrial.already' />
            <Text style={[{fontWeight: 'bold', textDecorationLine: 'underline'}]}>
              <Translate keyName='startTrial.restore' />
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

export default StartTrial
