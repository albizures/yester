import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { View, StyleSheet, Image, Dimensions } from 'react-native'
import Picker from '../../components/Picker'
import colors from '../../utils/colors'
import icons from '../../utils/icons'
import { Heading2, Heading4, Description } from '../../components'
import Container from '../../components/Container'
import Button from '../../components/Button'
import TopBar from '../../components/TopBar'
import http from '../../utils/http'
import { extractSetupParams } from '../../utils'

export default class Place extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  constructor (props) {
    super(props)
    const { navigation } = props
    const params = extractSetupParams(navigation)
    this.state = {
      ...params,
      year: moment(params.birthDate).format('YY').substring(0, 1) + '0',
      countries: [],
      states: [],
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

  componentDidUpdate (prevProps, prevState) {
    const { country } = this.state
    if (prevState.country !== country) {
      this.getStates()
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

  onContinue = () => {
    const { navigation } = this.props
    const { birthDate, country, state, countryName, stateName, name, gender } = this.state

    if (country && state) {
      navigation.navigate('SetupConfirmation', {
        birthDate,
        country,
        state,
        countryName,
        stateName,
        name,
        gender,
      })
    }
  }

  onChangeCountry = (country, index) => {
    const { countries } = this.state
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
      <View style={{height: 110}}>
        <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'flex-end'}}>
          <Heading2 keyName='setup.place.title' data={{ year }}
            style={[{color: colors.brightTurquoise}]} />
        </View>
        <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'flex-start'}}>
          <Heading4 keyName='setup.place.subtitle'
            style={[{color: colors.white, textAlign: 'center'}]} />
        </View>
      </View>
    )

    const topBar = (
      <TopBar title={topBarTitle} />
    )

    return (
      <Container topBar={topBar} >
        <View style={styles.container}>
          <Image source={icons.glove}
            style={{width: 78, height: 98.88, marginTop: 13, marginBottom: 5}} />
          <Heading4 keyName='setup.place.form.title'
            style={[{textAlign: 'center'}]}
          />
          <Picker
            title='setup.place.form.country'
            items={countries}
            value={country}
            onValueChange={this.onChangeCountry}
            placeholder={{
              label: 'Select a country',
              value: null,
            }}
            style={{marginTop: 14}}
          />
          <Picker
            title='setup.place.form.state'
            items={states}
            value={state}
            onValueChange={this.onChangeState}
            placeholder={{
              label: 'Select a state',
              value: null,
            }}
          />
          <Button title='setup.continue'
            style={{marginTop: 51, marginBottom: 20}}
            onPress={this.onContinue} />
          <Description keyName='setup.age.disclaimer'
            style={[{textAlign: 'center', paddingHorizontal: 17}]} />
        </View>
      </Container>
    )
  }
}

const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.athensGray,
    paddingBottom: 22,
    paddingHorizontal: 31,
  },
})
