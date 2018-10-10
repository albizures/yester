import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Container from '../../components/Container'
import Translate from '../../components/Translate'
import Button from '../../components/Button'
import { getUser, saveUserData } from '../../utils/session'

export default class Confirmation extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  constructor (props) {
    super(props)
    const { navigation } = this.props
    const birthDate = navigation.getParam('birthDate')
    const country = navigation.getParam('country')
    const state = navigation.getParam('state')
    const countryName = navigation.getParam('countryName')
    const stateName = navigation.getParam('stateName')

    this.state = {
      birthDate,
      country,
      state,
      countryName,
      stateName,
      name: '',
    }
  }

  async componentDidMount () {
    const user = await getUser()

    this.setState({
      name: user.attributes.given_name,
    })
  }

  onContinue = async () => {
    const {
      birthDate,
      country,
      state,
    } = this.state
    await saveUserData({ birthDate, country, state })
    this.props.navigation.navigate('Home')
  }

  render () {
    const {
      name,
      countryName,
    } = this.state
    return (
      <Container>
        <Translate keyName='setup.confirmation.title' data={{ country: countryName, name }} />
        <Translate keyName='setup.confirmation.subtitle' />
        <Translate keyName='setup.confirmation.edit' />
        <Button title='setup.confirmation.continue' onPress={this.onContinue} />
      </Container>
    )
  }
}
