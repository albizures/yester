import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Image, Dimensions } from 'react-native'

import Container from '../../components/Container'
import { Heading2, Heading4, Description } from '../../components'
import Button from '../../components/Button'
import { getUser } from '../../utils/session'
import colors from '../../utils/colors'
import icons from '../../utils/icons'
import DatePicker from '../../components/DatePicker'
import Picker from '../../components/Picker'
import TopBar from '../../components/TopBar'
import { extractSetupParams } from '../../utils'

export default class BirthDate extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  constructor (props) {
    super(props)
    const { navigation } = this.props
    this.state = {
      ...extractSetupParams(navigation),
      name: '',
      genders: [{ value: 'female', label: 'Female' }, { value: 'male', label: 'Male' }],
    }
  }

  onDidFocus = () => {
    const { navigation } = this.props
    this.setState(extractSetupParams(navigation))
  }

  async componentDidMount () {
    const { navigation } = this.props
    navigation.addListener('didFocus', this.onDidFocus)
    const user = await getUser()
    this.setState({
      name: user.attributes.given_name,
    })
  }

  onContinue = () => {
    const { navigation } = this.props
    const { birthDate, country, state, countryName, stateName, name, gender } = this.state
    if (birthDate) {
      navigation.navigate('SetupPlace', {
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

  onChangeGender = (gender, index) => {
    const { genders } = this.state
    index = index - 1
    if (genders[index]) {
      this.setState({
        gender,
        genderName: genders[index].label,
      })
    }
  }

  render () {
    const { name, birthDate, genders, gender } = this.state
    const topBarTitle = (
      <View style={{ height: 110, paddingHorizontal: 30 }}>
        <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'flex-end' }}>
          <Heading2 keyName='setup.age.greeting' data={{ name }}
            style={[{ color: colors.brightTurquoise }]} />
        </View>
        <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'flex-start' }}>
          <Heading4 keyName='setup.age.greeting.subtitle'
            style={[{ color: colors.white, textAlign: 'center' }]} />
        </View>
      </View>
    )

    const topBar = (
      <TopBar title={topBarTitle} />
    )
    return (
      <Container topBar={topBar}>
        <View style={styles.container}>
          <View style={styles.topFlex}>
            <Image source={icons.childhood}
              style={styles.image} />
            <Heading4 keyName='setup.age.question' style={styles.questionText} />
          </View>

          <View style={styles.bottomFlex}>
            <DatePicker title='setup.age.birthdate'
              value={birthDate}
              onDateChange={(birthDate) => {
                this.setState({ birthDate })
              }}
            />
            <Picker
              title='setup.age.form.gender'
              items={genders}
              value={gender}
              onValueChange={this.onChangeGender}
              placeholder={{
                label: 'Select a gender',
                value: null,
              }}
            />
            <Button title='setup.continue' style={styles.button} onPress={this.onContinue} />
            <Description keyName='setup.age.disclaimer'
              style={styles.disclaimerText} />
          </View>

        </View>
      </Container>
    )
  }
}

const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.athensGray,
    paddingBottom: height * 0.03,
    paddingHorizontal: width * 0.08,
  },
  topFlex: {
    flex: 0.25,
    alignItems: 'center',
    paddingTop: height * 0.045,
    paddingBottom: height * 0.03,
  },
  bottomFlex: {
    flex: 0.75,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    width: 60,
    height: 64.52,
    marginBottom: height * 0.03,
  },
  button: {
    marginTop: height * 0.03,
    marginBottom: height * 0.03,
  },
  questionText: {
    textAlign: 'center',
  },
  disclaimerText: {
    textAlign: 'center',
    paddingHorizontal: 17,
  },
})
