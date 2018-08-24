import React, { Component } from 'react'
import { StyleSheet, Dimensions, View } from 'react-native'
import PropTypes from 'prop-types'

import Translate from '../components/Translate'
import Container from '../components/Container'
import Button from '../components/Button'
import styles from '../styles/common'
import colors from '../utils/colors'
import icons from '../utils/icons'

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
          <Translate style={[styles.h1, localStyles.margin, {textAlign: 'center'}]}
            keyName='common.upperTitle' />
          <Translate style={[styles.title, localStyles.margin, {fontWeight: 'bold', textAlign: 'center'}]}
            keyName='createAccount.begin' />

          <Button onPress={this.onPressFB}
            title={'createAccount.continue'} type={'filled'} size='normal' icon={icons.fb} />

          <Translate style={[styles.body1, localStyles.margin]}
            keyName='createAccount.recommendation' />

          <View style={localStyles.row}>
            <View style={[styles.divider, {width: 30}]} />
            <Translate style={[styles.title]} keyName='createAccount.or' />
            <View style={[styles.divider, {width: 30}]} />
          </View>

          <Button onPress={this.onPressSignIn}
            title={'createAccount.create'} type={'outlined'} size='normal' icon={0} />

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
