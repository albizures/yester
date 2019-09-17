import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { View, StyleSheet, Image, Alert, KeyboardAvoidingView } from 'react-native'
import Picker from '../../components/Picker'
import colors from '../../utils/colors'
import icons from '../../utils/icons'
import { Heading2, Heading4, Description } from '../../components'
import Container from '../../components/Container'
import Button from '../../components/Button'
import TopBar from '../../components/TopBar'
import http from '../../utils/http'
import { extractSetupParams } from '../../utils'
import { translate } from '../../components/Translate'
import { screen } from '../../utils/analytics'
import debugFactory from 'debug'

const debugError = debugFactory('yester:Place:error')
const debugInfo = debugFactory('yester:Place:info')

export default class Place extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  scroll = React.createRef()

  constructor(props) {
    super(props)
    const { navigation } = props
    const params = extractSetupParams(navigation)
    this.state = {
      ...params,
      year:
        moment(params.birthDate)
          .format('YY')
          .substring(0, 1) + '0',
      countries: [],
      states: [],
      conditionalCountries: {
        [true]: {
          placeholder: 'setup.place.form.country.placeholder.loading',
          disabled: true,
        },
        [false]: {
          placeholder: 'setup.place.form.country.placeholder',
          disabled: false,
        },
      },
      conditionalStates: {
        [true]: {
          placeholder: 'setup.place.form.state.placeholder.loading',
          disabled: true,
        },
        [false]: {
          placeholder: 'setup.place.form.state.placeholder',
          disabled: false,
        },
      },
    }
  }

  async componentDidMount() {
    try {
      screen('Place', {})
      const { data: countries } = await http.getAPI('/v2/countries')
      const bottomListCountries = countries.filter(
        (country) => !['US'].includes(country['iso_code'])
      )
      const topListCountries = countries.filter((country) =>
        ['US', 'GB'].includes(country['iso_code'])
      )
      const sortedList = topListCountries.concat(bottomListCountries)
      this.getStates()
      this.setState({
        countries: sortedList.map(({ name, iso_code: isoCode }) => ({
          label: name,
          value: isoCode,
        })),
      })
    } catch (error) {
      debugError(error)
      Alert.alert(translate('setup.error'))
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { country } = this.state
    if (prevState.country !== country) {
      this.getStates()
    }
  }

  async getStates() {
    const { country } = this.state
    if (country) {
      const { data: states } = await http.getAPI('/v2/states/' + encodeURIComponent(country))
      this.setState({
        states: states.map(({ name, iso_code: isoCode }) => ({
          label: name,
          value: isoCode,
        })),
      })
    }
  }

  onContinue = () => {
    const { navigation } = this.props
    const {
      birthDate,
      country,
      state,
      countryName,
      stateName,
      givenName,
      gender,
      updateSetup,
    } = this.state

    if (country && state) {
      navigation.navigate('SetupConfirmation', {
        birthDate,
        country,
        state,
        countryName,
        stateName,
        givenName,
        gender,
        birthPlace: stateName + ', ' + countryName,
        updateSetup,
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

  onOpenModal = () => {
    this.setState({
      marginBottom: 100,
    })
    setTimeout(() => {
      this.scroll.current.scrollToEnd({ animated: true })
    }, 100)
  }

  onCloseModal = () => {
    this.setState({
      marginBottom: 0,
    })

    setTimeout(() => {
      this.scroll.current.scrollTo({ y: 0, animated: true })
    }, 100)
  }

  render() {
    const {
      year,
      countries,
      states,
      country,
      state,
      marginBottom,
      conditionalCountries,
      conditionalStates,
    } = this.state
    const countriesAreEmpty = countries.length === 0
    const loadingCountries = conditionalCountries[countriesAreEmpty]
    const statesAreEmpty = states.length === 0
    const loadingStates = conditionalStates[statesAreEmpty]

    const topBarTitle = (
      <View style={{ height: 110, paddingHorizontal: 30 }}>
        <View
          style={{
            flex: 0.5,
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Heading2
            keyName='setup.place.title'
            data={{ year }}
            style={[{ color: colors.brightTurquoise }]}
          />
        </View>
        <View
          style={{
            flex: 0.5,
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Heading4
            keyName='setup.place.subtitle'
            style={[{ color: colors.white, textAlign: 'center' }]}
          />
        </View>
      </View>
    )

    const topBar = <TopBar title={topBarTitle} />

    return (
      <Container topBar={topBar} scroll scrollRef={this.scroll}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={100}
          contentContainerStyle={{
            flex: 1,
            height: '100%',
            width: '100%',
            marginBottom,
          }}
          behavior='position'
          enabled
        >
          <View style={styles.container}>
            <Image
              source={icons.balloon}
              style={{
                width: 78,
                height: 98.88,
                marginTop: 13,
                marginBottom: 5,
              }}
            />
            <Heading4 keyName='setup.place.form.title' style={[{ textAlign: 'center' }]} />
            <Picker
              title='setup.place.form.country'
              items={countries}
              value={country}
              onOpen={this.onOpenModal}
              onClose={this.onCloseModal}
              onValueChange={this.onChangeCountry}
              placeholder={{
                label: translate(loadingCountries.placeholder),
                value: null,
              }}
              disabled={loadingCountries.disabled}
              style={{ marginTop: 14 }}
            />
            <Picker
              title='setup.place.form.state'
              items={states}
              value={state}
              onOpen={this.onOpenModal}
              onClose={this.onCloseModal}
              onValueChange={this.onChangeState}
              placeholder={{
                label: translate(loadingStates.placeholder),
                value: null,
              }}
              disabled={loadingStates.disabled}
            />
            <Button
              title='setup.continue'
              style={{ marginTop: 51, marginBottom: 20 }}
              onPress={this.onContinue}
            />
            <Description
              keyName='setup.age.disclaimer'
              style={[{ textAlign: 'center', paddingHorizontal: 17 }]}
            />
          </View>
        </KeyboardAvoidingView>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.athensGray,
    paddingBottom: 22,
    paddingHorizontal: 31,
  },
})
