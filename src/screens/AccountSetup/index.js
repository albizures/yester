import React, { Component } from 'react'
import { Button, StyleSheet, View } from 'react-native'

import Container from '../../components/Container'
import Stepper from '../../components/Stepper'

import AgeSetup from './AgeSetup'
import DoneSetup from './DoneSetup'
import PlaceSetup from './PlaceSetup'

import colors from '../../utils/colors'

export default class AccountSetup extends Component {
  stepper = React.createRef()
  state = {}

  componentDidMount () {
    // to force a render
    this.setState({})
  }

  render () {
    const { current: stepper } = this.stepper

    return (
      <Container>
        <Stepper ref={this.stepper} scrollEnabled={false}>
          {[
            () => <AgeSetup name='test' />,
            () => <DoneSetup name='test' />,
            () => <PlaceSetup name='test' />,
          ]}
        </Stepper>
        <View style={styles.footer}>
          {stepper && <Button style={styles.button} title={'Continue'} onPress={stepper.next} />}
        </View>
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
