import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Button, TextInput } from 'react-native'
import {Heading2, Description} from '../components'
import Container from '../components/Container'
import TopBar from '../components/TopBar'
import colors from '../utils/colors'

export default class Writing extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  onPress = () => {
    this.props.navigation.navigate('Reading')
  }

  render () {
    const topBar = (
      <TopBar title='writing.topbar' />
    )
    return (
      <Container topBar={topBar} style={{backgroundColor: colors.athensGray}}>
        <View style={{backgroundColor: colors.athensGray, paddingHorizontal: 29}}>
          <Button title='to Reading' onPress={this.onPress} />
          <Heading2 text='Title' />
          <Description keyName='writing.by' data={{autor: 'Luis Galvez'}} />
          <TextInput maxLength={1000} multiline
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
