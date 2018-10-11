import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-native-datepicker'
import { View, StyleSheet } from 'react-native'

import Container from '../../components/Container'
import Translate from '../../components/Translate'
import Button from '../../components/Button'
import { getUser } from '../../utils/session'
import colors from '../../utils/colors'
import CustomDatePicker from '../../components/CustomDatePicker'

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
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', height: 110}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Translate keyName='setup.age.greeting' style={{color: 'white'}} data={{ name }} />
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Translate keyName='setup.age.greeting.subtitle' style={{color: 'white', textAlign: 'center'}} />
        </View>
      </View>
    )

    const topBar = (
      <TopBar title={topBarTitle} />
    )
    return (
      <Container topBar={topBar}>
        <View style={styles.view}>
          <Translate keyName='setup.age.question' />
          <CustomDatePicker title='setup.age.birthdate'
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

const styles = StyleSheet.create({
  view: {alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
})
