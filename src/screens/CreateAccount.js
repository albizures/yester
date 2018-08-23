import React, { Component } from 'react'
import { StyleSheet, TouchableHighlight, Dimensions, View } from 'react-native'
import PropTypes from 'prop-types'

import Translate from '../components/Translate'
import Container from '../components/Container'
import styles from '../styles/common'
import colors from '../utils/colors'

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
      <Container>
        <View style={[localStyles.container]}>
          <Translate style={[styles.display2, localStyles.margin, {textAlign: 'center'}]}
            keyName='common.upperTitle' />
          <Translate style={[styles.title, localStyles.margin, {fontWeight: 'bold', textAlign: 'center'}]}
            keyName='createAccount.begin' />

          <TouchableHighlight onPress={this.onPressFB}
            style={[styles.button, styles.filledButton]}>
            <Translate style={[styles.buttonText]}
              keyName='createAccount.continue' />
          </TouchableHighlight>

          <Translate style={[styles.body1, localStyles.margin]}
            keyName='createAccount.recommendation' />

          <View style={localStyles.row}>
            <View style={[styles.divider, {width: 30}]} />
            <Translate style={[styles.title]} keyName='createAccount.or' />
            <View style={[styles.divider, {width: 30}]} />
          </View>

          <TouchableHighlight onPress={this.onPressSignIn}
            style={[styles.button, styles.outlinedButton, localStyles.margin]}>
            <Translate style={[styles.buttonText, styles.notColor]}
              keyName='createAccount.create' />
          </TouchableHighlight>

        </View>
      </Container>
    )
  }
}

let { height, width } = Dimensions.get('window')
const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    paddingTop: height * 0.075,
    paddingBottom: height * 0.25,
    paddingHorizontal: width * 0.08,
    backgroundColor: colors.white,
  },
  margin: {
    marginBottom: height * 0.03,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    width: width * 0.3,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.white,
  },
})
