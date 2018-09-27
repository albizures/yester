import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button, View } from 'react-native'

// import Translate from '../../components/Translate'
import Container from '../../components/Container'
import Stepper from '../../components/Stepper'
import Step from './Step'
import Dots from './Dots'

export default class Onboarding extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  state = {
    steps: [{
      cover: require('../../assets/300x300.png'),
      title: 'onboarding.step1.title',
      description: 'onboarding.step1.description',
    }, {
      cover: require('../../assets/300x300.png'),
      title: 'onboarding.step2.title',
      description: 'onboarding.step2.description',
    }, {
      cover: require('../../assets/300x300.png'),
      title: 'onboarding.step3.title',
      description: 'onboarding.step3.description',
    }],
  }

  createStep = (customProp, index) => {
    return (
      <Step key={index} {...customProp} />
    )
  }

  toLogin = () => {
    const { navigation } = this.props
    navigation.navigate('CreateAccount')
  }

  getBottomBar = (options) => {
    const { steps } = this.state
    const { next, currentStep, skip } = options
    const nextScreen = (steps.length - 1 === currentStep)
      ? this.toLogin
      : next

    return (
      <View>
        <Dots steps={steps.length} currentStep={currentStep} />
        {/* TODO use our custom button here */}
        <Button title='Skip' onPress={skip} />
        <Button title='Continue' onPress={nextScreen} />
      </View>
    )
  }

  render () {
    const { steps } = this.state

    return (
      <Container>
        <Stepper bottomBar={this.getBottomBar}>
          {steps.map(this.createStep)}
        </Stepper>
      </Container>
    )
  }
}
