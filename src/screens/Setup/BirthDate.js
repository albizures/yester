import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Image } from 'react-native'

import Container from '../../components/Container'
import { Heading2, Heading4, Description } from '../../components'
import Button from '../../components/Button'
import { getUser } from '../../utils/session'
import colors from '../../utils/colors'
import icons from '../../utils/icons'
import DatePicker from '../../components/DatePicker'
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
      <View style={{flex: 1, height: 110, justifyContent: 'center', paddingHorizontal: 27}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
          <Heading2 keyName='setup.age.greeting' data={{ name }}
            style={[{color: colors.brightTurquoise}]} />
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
          <Heading4 keyName='setup.age.greeting.subtitle'
            style={[{color: colors.white, textAlign: 'center'}]} />
        </View>
      </View>
    )

    const topBar = (
      <TopBar title={topBarTitle} />
    )
    return (
      <Container topBar={topBar}>
        <View style={styles.container}>
          <Image source={icons.ssSonaja}
            style={{width: 60, height: 64.52, marginTop: 32, marginBottom: 20}} />

          <Heading4 keyName='setup.age.question' style={[{textAlign: 'center'}]} />

          <DatePicker title='setup.age.birthdate'
            style={{marginTop: 50, marginBottom: 80}}
            value={birthDate}
            onDateChange={(birthDate) => {
              this.setState({birthDate})
            }}
          />
          <Button title='setup.continue' style={{marginBottom: 20}} onPress={this.onContinue} />
          <Description keyName='setup.age.disclaimer'
            style={[{textAlign: 'center', paddingHorizontal: 17}]} />
        </View>
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
