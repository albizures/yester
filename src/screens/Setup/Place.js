import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { View, StyleSheet } from 'react-native'
import CustomPicker from '../../components/CustomPicker'

import Translate from '../../components/Translate'
import Container from '../../components/Container'
import Button from '../../components/Button'
import TopBar from '../../components/TopBar'
import http from '../../utils/http'

export default class Place extends Component {
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
      year: moment(birthDate).format('YY'),
      country,
      state,
      name: '',
      countryName,
      stateName,
      countries: [],
      states: [],
    }
  }

  async getStates () {
    const { country } = this.state
    if (country) {
      const { data: states } = await http.get('/v1/states/' + country)
      this.setState({
        states: states.map(({name, iso_code: isoCode}) => ({
          label: name,
          value: isoCode,
        })),
      })
    }
  }

  componentDidUpdate (prevProps, prevState) {
    const { country } = this.state
    if (prevState.country !== country) {
      this.getStates()
    }
  }

  onContinue = () => {
    const { navigation } = this.props
    const { birthDate, country, state, countryName, stateName } = this.state
    console.log(this.state)
    if (country && state) {
      navigation.navigate('SetupConfirmation', {
        birthDate,
        country,
        state,
        countryName,
        stateName,
      })
    }
  }

  async componentDidMount () {
    try {
      const { data: countries } = await http.get('/v1/countries')
      this.getStates()
      this.setState({
        countries: countries.map(({name, iso_code: isoCode}) => ({
          label: name,
          value: isoCode,
        })),
      })
    } catch (error) {
      console.log('BirthDate', error)
    }
  }

  onChangeCountry = (country, index) => {
    const { countries } = this.state
    console.log(country, index, countries.length)
    index = index - 1
    if (countries[index]) {
      this.setState({
        country,
        countryName: countries[index].label,
      })
    }
  }

  onChangeState = (state, index) => {
    const { states } = this.state
    index = index - 1
    if (states[index]) {
      this.setState({
        state,
        stateName: states[index].label,
      })
    }
  }

  render () {
    const { year, countries, states, country, state } = this.state
    const topBarTitle = (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', height: 110}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Translate keyName='setup.place.title' data={{ year }} />
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Translate keyName='setup.place.subtitle' />
        </View>
      </View>
    )

    const topBar = (
      <TopBar title={topBarTitle} />
    )

    return (
      <Container topBar={topBar} >
        <Translate keyName='setup.place.form.title' />
        <View style={styles.view}>
          <CustomPicker
            title='setup.place.form.country'
            items={countries}
            value={country}
            onValueChange={this.onChangeCountry}
            placeholder={{
              label: 'Select a country',
              value: null,
            }}
          />
          <CustomPicker
            title='setup.place.form.state'
            items={states}
            value={state}
            onValueChange={this.onChangeState}
            placeholder={{
              label: 'Select a state',
              value: null,
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
