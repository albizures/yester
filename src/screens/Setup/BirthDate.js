import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-native-datepicker'

import Container from '../../components/Container'
import Translate from '../../components/Translate'
import Button from '../../components/Button'
import { getUser } from '../../utils/session'

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

    return (
      <Container>
        <Translate keyName='setup.age.greeting' data={{ name }} />
        <Translate keyName='setup.age.greeting.subtitle' />
        <Translate keyName='setup.age.question' />
        <Translate keyName='setup.age.birthdate' />

        <DatePicker
          style={{width: 200}}
          date={birthDate}
          mode='date'
          placeholder='select date'
          format='YYYY-MM-DD'
          confirmBtnText='Confirm'
          cancelBtnText='Cancel'
          onDateChange={(birthDate) => {
            this.setState({birthDate})
          }}
        />
        <Button title='setup.continue' onPress={this.onContinue} />
      </Container>
    )
  }
}
