import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import Container from '../../components/Container'
import Translate from '../../components/Translate'
import Button from '../../components/Button'
import styles from '../../styles/common'
import { getUser, saveUserData } from '../../utils/session'
import colors from '../../utils/colors';


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
        <View style={localStyles.view}>
          <Translate keyName='setup.confirmation.title' data={{ country: countryName, name }}
            style={[styles.h2, {color: colors.white, textAlign: 'center'}]} />
          <Translate keyName='setup.confirmation.subtitle'
            style={[styles.h4, {color: colors.white, textAlign: 'center'}]} />
          <Translate keyName='setup.confirmation.edit'
            style={[{color: colors.white, textAlign: 'center'}]} />
          <Button title='setup.confirmation.continue' onPress={this.onContinue} />
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
    paddingBottom: 30,
    paddingHorizontal: 31,
    backgroundColor: colors.haiti,
  },
})
