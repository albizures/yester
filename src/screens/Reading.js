import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Button } from 'react-native'
import {Heading1, Description} from '../components'
import Container from '../components/Container'
import Divider from '../components/Divider'

import TopBar from '../components/TopBar'
import colors from '../utils/colors'

export default class Reading extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  onPress = () => {
    this.props.navigation.navigate('Home')
  }

  render () {
    const topBar = (
      <TopBar title='reading.topbar' style={{backgroundColor: colors.white}} />
    )
    return (
      <Container topBar={topBar} style={{backgroundColor: colors.athensGray}}>
        <View style={{backgroundColor: colors.athensGray, paddingHorizontal: 29}}>
          <Button title='to Home' onPress={this.onPress} />
          <Heading1 text='Title' style={{color: colors.governorBay}} />
          <Description keyName='writing.by' data={{autor: 'Luis Galvez'}} />
          <Description text='{month} {day}, {year}' data={{month: 'July', day: '6', year: '1987'}} />
          <Divider style={{marginVertical: 30}} />
          <Text maxLength={1000} multiline
            style={{
              height: 400,
              fontFamily: 'Karla-Regular',
              fontSize: 16,
              paddingHorizontal: 15,
              paddingTop: 15,
              textAlignVertical: 'top',
              textAlign: 'justify',
              backgroundColor: colors.white,
              marginTop: 30,
            }}
          />
        </View>
      </Container>
    )
  }
}
