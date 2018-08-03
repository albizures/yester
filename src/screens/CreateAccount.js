import React, { Component } from 'react'
import { ScrollView, StyleSheet, TouchableHighlight,
  Text, Dimensions, View,
} from 'react-native'
import PropTypes from 'prop-types'

import Translate from '../components/Translate'
import styles from '../styles/common'

export default class CreateAccount extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  onPressFB = () => {
    this.props.navigation.navigate('Facebook')
  }

  onPressSignIn = () => {
    this.props.navigation.navigate('SignIn')
  }

  render () {
    return (
      <ScrollView style={[localStyles.container]} >
        <Text style={[styles.display2, localStyles.margin, {textAlign: 'center'}]}>
          <Translate keyName='common.upperTitle' />
        </Text>
        <Text style={[styles.title, localStyles.margin, {fontWeight: 'bold', textAlign: 'center'}]}>
          <Translate keyName='createAccount.begin' />
        </Text>
        <TouchableHighlight onPress={this.onPressFB}
          style={[styles.button, styles.filledButton]}>
          <Text style={[styles.buttonText]}>
            <Translate keyName='createAccount.continue' />
          </Text>
        </TouchableHighlight>

        <Text style={[styles.body1, localStyles.margin]}>
          <Translate keyName='createAccount.recommendation' />
        </Text>
        <View style={[localStyles.row]}>
          <View style={[styles.divider, {width: 30}]} />
          <Translate keyName='createAccount.or' />
          <View style={[styles.divider, {width: 30}]} />
        </View>
        <TouchableHighlight onPress={this.onPressSignIn}
          style={[styles.button, styles.outlinedButton, localStyles.margin]}>
          <Text style={[styles.buttonText, styles.notColor]}>
            <Translate keyName='createAccount.create' />
          </Text>
        </TouchableHighlight>
      </ScrollView>
    )
  }
}

let { height, width } = Dimensions.get('window')
const localStyles = StyleSheet.create({
  container: {
    paddingTop: height * 0.075,
    paddingHorizontal: width * 0.08,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignContent: 'center',
  },
  margin: {
    marginBottom: height * 0.03,
  },
  row: {
    flex: 1,
    width: width * 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
})
