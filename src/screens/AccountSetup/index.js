import React, { Component } from 'react'
import { Button, StyleSheet, View } from 'react-native'

import Container from '../../components/Container'
import Stepper from '../../components/Stepper'

import Age from './Age'
import Done from './Done'
import Place from './Place'

import colors from '../../utils/colors'

export default class AccountSetup extends Component {
  stepper = React.createRef()
  state = {}

  getBottomBar = (options) => {
    const { next } = options

    return (
      <View style={styles.footer}>
        <Button style={styles.button} title='Continue' onPress={next} />
      </View>
    )
  }

  render () {
    return (
      <Container>
        <Stepper ref={this.stepper} scrollEnabled={false} bottomBar={this.getBottomBar}>
          {[
            <Age key={0} name='John' />,
            <Place key={1} year={60} />,
            <Done key={2} name='John' place={'Roseville - California'} />,
          ]}
        </Stepper>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    height: 30,
    backgroundColor: '#f00',
  },
  footer: {
    height: 50,
    width: '100%',
    padding: 10,
    backgroundColor: colors.gray,
  },
})
