import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import Container from '../../components/Container'
import { Heading2, Heading4, Body2 } from '../../components'
import Button from '../../components/Button'
import { getUser, saveUserData } from '../../utils/session'
import colors from '../../utils/colors'

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

  onEdit = () => {
    this.props.navigation.navigate('SetupBirthDate')
  }

  render () {
    const {
      name,
      stateName,
    } = this.state
    return (
      <Container style={styles.container}>
        <Heading2 keyName='setup.confirmation.title'
          data={{ state: stateName, name }}
          style={[styles.font, {marginTop: 153}]} />

        <Heading4 keyName='setup.confirmation.subtitle'
          style={[styles.font, {marginTop: 12}]} />

        <Body2 keyName='setup.confirmation.edit'
          style={styles.editInfo} onPress={this.onEdit} />

        <Button title='setup.confirmation.continue'
          onPress={this.onContinue}
          type={Button.OUTLINED} />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 54,
    paddingHorizontal: 40,
    backgroundColor: colors.haiti,
  },
  font: {
    color: colors.white,
    textAlign: 'center',
  },
  editInfo: {
    color: colors.white,
    textAlign: 'center',
    'textDecorationLine': 'underline',
    marginTop: 187,
    marginBottom: 40,
  },
})
