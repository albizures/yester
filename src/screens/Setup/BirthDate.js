import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, Button } from 'react-native'
import DatePicker from 'react-native-datepicker'

import Container from '../../components/Container'
import http from '../../utils/http'

export default class BirthDate extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  state = {}

  onPress = () => {
    this.props.navigation.navigate('Home')
  }

  async componentDidMount () {
    try {
      const { data } = await http.get('/v1/countries')
      console.log(data)
    } catch (error) {
      console.log('BirthDate', error)
    }
  }

  render () {
    return (
      <Container>
        <Text style={[{textAlign: 'center', marginTop: 40}]}>READING</Text>
        <Button title='to Home' onPress={this.onPress} />
        <DatePicker
          style={{width: 200}}
          date={this.state.date}
          mode='date'
          placeholder='select date'
          format='YYYY-MM-DD'
          confirmBtnText='Confirm'
          cancelBtnText='Cancel'
          onDateChange={(date) => {
            this.setState({date: date})
          }}
        />
      </Container>
    )
  }
}
