import React, { Component } from 'react'
import { View } from 'react-native'
// import PropTypes from 'prop-types'

// import Translate from '../../components/Translate'
import Container from '../../components/Container'
import Stepper from '../../components/Stepper'
import Button from '../../components/Button'
import Step from './Step'
import Dots from './Dots'

export default class Onboarding extends Component {
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

  getBottomBar = (options) => {
    const { steps } = this.state
    const { next, currentStep, skip } = options

    return (
      <View>
        <Dots steps={steps.length} currentStep={currentStep} />
        {/* TODO use our custom button here */}
        <Button title='onboarding.next' onPress={skip} />
        <Button title='onboarding.skip' onPress={next} />
      </View>
    )
  }

  render () {
    const { steps } = this.state

    console.log(require('../../assets/300x300.png'))
    return (
      <Container>
        <Stepper bottomBar={this.getBottomBar}>
          {steps.map(this.createStep)}
        </Stepper>
      </Container>
    )
  }
}
