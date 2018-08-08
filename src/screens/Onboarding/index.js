import React, { Component } from 'react'
<<<<<<< HEAD
import PropTypes from 'prop-types'
import { Text, View, Button } from 'react-native'
import OurButton from '../../components/OurButton'
=======
import { Button } from 'react-native'
// import PropTypes from 'prop-types'

// import Translate from '../../components/Translate'
import Container from '../../components/Container'
import Stepper from '../../components/Stepper'
import Step from './Step'
import Dots from './Dots'
>>>>>>> 86f0f9298ef50446041eb3837047130d7f3ac093

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

<<<<<<< HEAD
  onPress = () => {
    this.props.navigation.navigate('SignUp')
  }

  onPressHome = () => {
    this.props.navigation.navigate('Home')
=======
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
>>>>>>> 86f0f9298ef50446041eb3837047130d7f3ac093
  }

  render () {
    const { steps } = this.state

    console.log(require('../../assets/300x300.png'))
    return (
<<<<<<< HEAD
      <View>
        <Text style={[{textAlign: 'center', marginTop: 40}]}>ON BOARDING</Text>
        <Button title='to Sign Up' onPress={this.onPress} />
        <OurButton title='to Home' onPress={this.onPressHome} />
      </View>
=======
      <Container>
        <Stepper>
          {steps.map(this.createStep)}
        </Stepper>
      </Container>
>>>>>>> 86f0f9298ef50446041eb3837047130d7f3ac093
    )
  }
}
