import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, Button } from 'react-native'

import Container from '../../components/Container'
import http from '../../utils/http'

export default class Reading extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  onPress = () => {
    this.props.navigation.navigate('Home')
  }

  async componentDidMount () {
    const { data } = await http.get('/v1/countries')
    console.log(data)
  }

  render () {
    return (
      <Container>
        <Text style={[{textAlign: 'center', marginTop: 40}]}>READING</Text>
        <Button title='to Home' onPress={this.onPress} />
      </Container>
    )
  }
}
