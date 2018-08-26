import React, { Component } from 'react'
import {
  StyleSheet,
  Text, View, Dimensions,
} from 'react-native'
import PropTypes from 'prop-types'
import colors from '../utils/colors'
import Container from '../components/Container'
import Translate from '../components/Translate'
import Button, {types} from '../components/Button'
import styles from '../styles/common'

class SignUp extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  onPressSubscription = () => {
    this.props.navigation.navigate('SignUp2')
  }

  onPressLogin = () => {
    this.props.navigation.navigate('Login')
  }

  render () {
    return (
      <View style={localStyles.container2}>
        <Container>
          <View style={[localStyles.container]}>

            <Text style={[styles.h1, localStyles.margin]}>
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

            <Button onPress={this.onPressSubscription}
              title='signUp.start' />

            <Text style={[styles.body1, localStyles.margin]}>
              <Translate keyName='signUp.price' />
            </Text>

            <Button onPress={this.onPressLogin}
              title='signUp.logIn'
              type={types.OUTLINED} />

            <View style={[styles.separator, localStyles.margin]} />

            <Text style={[styles.body2, {textAlign: 'left', marginBottom: height * 0.01}]}>
              <Translate keyName='signUp.cancel' />
            </Text>
            <Text style={[styles.body1, {textAlign: 'left'}]}>
              <Translate keyName='signUp.recurring' />
            </Text>

          </View>
        </Container>
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
    flex: 1,
    flexDirection: 'column',
    zIndex: 0,
    height: height * 0.92,
    paddingTop: height * 0.075,
    paddingHorizontal: width * 0.08,
  },
  container2: {
    position: 'absolute',
    backgroundColor: colors.white,
  },
  container3: {
    flex: 1,
    position: 'absolute',
    zIndex: 2,
    marginTop: height * 0.92,
    height: height * 0.08,
    width: width,
    backgroundColor: colors.athensGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  margin: {
    marginVertical: height * 0.03,
  },
})

export default SignUp
