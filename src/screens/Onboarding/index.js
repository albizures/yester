import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button, View } from 'react-native'
import Container from '../../components/Container'
import Stepper from '../../components/Stepper'
// import Button from '../../components/Button'
import Step from './Step'
import Dots from './Dots'
import colors from '../../utils/colors'

export default class Onboarding extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  state = {
    steps: [{
      cover: require('../../assets/300x300.png'),
      title: 'onboarding.step1.title',
      title2: 'onboarding.step1.title2',
      description: 'onboarding.step1.description',
    }, {
      cover: require('../../assets/300x300.png'),
      title: 'onboarding.step2.title',
      title2: 'onboarding.step2.title2',
      description: 'onboarding.step2.description',
    }, {
      cover: require('../../assets/300x300.png'),
      title: 'onboarding.step3.title',
      title2: 'onboarding.step3.title2',
      description: 'onboarding.step3.description',
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
      <View>
        <Dots steps={steps.length} currentStep={currentStep} />
        {/* TODO use our custom button here */}
        <Button title='Skip' onPress={this.toCreateAccount} />
        <Button title='Continue' onPress={nextScreen} />
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
