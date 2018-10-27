import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import Container from '../../components/Container'
import Stepper from '../../components/Stepper'
import {Heading4} from '../../components'
import Step from './Step'
import colors from '../../utils/colors'
import icons from '../../utils/icons'

export default class Onboarding extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  state = {
    steps: [{
      cover: icons.onboarding1,
      title: 'onboarding.step1.title',
      title2: 'onboarding.step1.title2',
      description: 'onboarding.step1.description',
      description2: 'onboarding.step1.description2',
      style: {marginHorizontal: 80},
    }, {
      cover: icons.onboarding2,
      title: 'onboarding.step2.title',
      title2: 'onboarding.step2.title2',
      description: 'onboarding.step2.description',
      description2: 'onboarding.step2.description2',
      style: {marginHorizontal: 80},
    }, {
      cover: icons.onboarding3,
      title: 'onboarding.step3.title',
      title2: 'onboarding.step3.title2',
      description: 'onboarding.step3.description',
      description2: 'onboarding.step3.description2',
      style: {marginHorizontal: 35},
    }],
  }

  createStep = (customProp, index) => {
    return (
      <Step key={index} {...customProp} />
    )
  }

  toCreateAccount = () => {
    const { navigation } = this.props
    navigation.navigate('CreateAccount')
  }

  getBottomBar = (options) => {
    const { steps } = this.state
    const { next, currentStep } = options
    const nextScreen = (steps.length - 1 === currentStep)
      ? this.toCreateAccount
      : next

    return (
      <View style={styles.view}>
        <View style={styles.row}>
          <Heading4 text='Skip' onPress={this.toCreateAccount} style={{color: colors.white, textDecorationLine: 'underline'}} />
          <Heading4 text='Continue' onPress={nextScreen} style={{color: colors.white, textDecorationLine: 'underline'}} />
        </View>
      </View>
    )
  }

  render () {
    const { steps } = this.state

    return (
      <Container style={{backgroundColor: colors.haiti}}>
        <Stepper bottomBar={this.getBottomBar}>
          {steps.map(this.createStep)}
        </Stepper>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: '8%',
  },
  row: {
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'space-evenly',
  },
})
