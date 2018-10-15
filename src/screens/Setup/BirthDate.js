import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'

import Container from '../../components/Container'
import Translate from '../../components/Translate'
import Button from '../../components/Button'
import { getUser } from '../../utils/session'
import colors from '../../utils/colors'
import DatePicker from '../../components/DatePicker'
import styles from '../../styles/common'

import TopBar from '../../components/TopBar'

export default class BirthDate extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  constructor (props) {
    super(props)
    const { navigation } = this.props
    const birthDate = navigation.getParam('birthDate')
    const country = navigation.getParam('country')
    const state = navigation.getParam('state')

    this.state = {
      birthDate,
      country,
      state,
      name: '',
    }
  }

  async componentDidMount () {
    const user = await getUser()

    this.setState({
      name: user.attributes.given_name,
    })
  }

  onContinue = () => {
    const { navigation } = this.props
    const { birthDate, country, state } = this.state
    if (birthDate) {
      navigation.navigate('SetupPlace', {
        birthDate,
        country,
        state,
      })
    }
  }

  render () {
    const { name, birthDate } = this.state
    const topBarTitle = (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', height: 110, paddingHorizontal: 27}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Translate keyName='setup.age.greeting' data={{ name }}
            style={[styles.h2, {color: colors.brightTurquoise}]} />
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Translate keyName='setup.age.greeting.subtitle'
            style={[styles.h4, {color: colors.white, textAlign: 'center'}]} />
        </View>
      </View>
    )

    const topBar = (
      <TopBar title={topBarTitle} />
    )
    return (
      <Container topBar={topBar}>
        <View style={localStyles.view}>

          <View style={{height: 98}} />
          <Translate keyName='setup.age.question'
            style={[styles.h4, {textAlign: 'center'}]} />
          <DatePicker title='setup.age.birthdate'
            value={birthDate}
            onDateChange={(birthDate) => {
              this.setState({birthDate})
            }}
          />
          <Button title='setup.continue' onPress={this.onContinue} />
        </View>
      </Container>
    )
  }
}

const localStyles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.athensGray,
    paddingBottom: 30,
    paddingHorizontal: 31,
  },
})
