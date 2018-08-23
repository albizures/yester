import React, { Component } from 'react'
import { Button } from 'react-native'
// import PropTypes from 'prop-types'

// import Translate from '../../components/Translate'
import Container from '../../components/Container'
import Stepper from '../../components/Stepper'
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

  createStep = (customProp) => (stepperProps) => {
    const { steps } = this.state
    const { skip, next, index } = stepperProps
    const props = {
      ...stepperProps,
      ...customProp,
    }

    return (
      <Step {...props} >
        <Dots steps={steps.length} currentStep={index} />
        {/* TODO use our custom button here */}
        <Button title='Skip' onPress={skip} />
        <Button title='Continue' onPress={next} />
      </Step>
    )
  }

  render () {
    const { steps } = this.state

    console.log(require('../../assets/300x300.png'))
    return (
      <Container>
        <Stepper>
          {steps.map(this.createStep)}
        </Stepper>
      </Container>
    )
  }
}
