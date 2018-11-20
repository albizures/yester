import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import Container from '../../components/Container'
import Stepper from '../../components/Stepper'
import {Heading4} from '../../components'
import Dots from './Dots'
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
    }, {
      cover: icons.onboarding2,
      title: 'onboarding.step2.title',
      title2: 'onboarding.step2.title2',
      description: 'onboarding.step2.description',
      description2: 'onboarding.step2.description2',
    }, {
      cover: icons.onboarding3,
      title: 'onboarding.step3.title',
      title2: 'onboarding.step3.title2',
      description: 'onboarding.step3.description',
      description2: 'onboarding.step3.description2',
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
      <View pointerEvents='box-none' style={styles.container}>
        <View pointerEvents='box-none' style={styles.topFlex}>
          <Dots steps={steps.length} currentStep={currentStep} />
        </View>
        <View pointerEvents='box-none' style={styles.bottomFlex}>
          <View pointerEvents='box-none' style={styles.buttonsView}>
            <Heading4 keyName='onboarding.skip' onPress={this.toCreateAccount} style={{color: colors.white, textDecorationLine: 'underline'}} />
            <Heading4 keyName='onboarding.next' onPress={nextScreen} style={{color: colors.white, textDecorationLine: 'underline'}} />
          </View>
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

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    width,
    height,
    position: 'absolute',
    justifyContent: 'flex-end',
    paddingBottom: height * 0.07,
  },
  topFlex: {
    flex: 8.2,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bottomFlex: {
    flex: 1.8,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  buttonsView: {
    width: width * 0.5,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 15,
  },
})
