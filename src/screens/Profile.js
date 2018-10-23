import React, { Component } from 'react'
import { View } from 'react-native'
import {Heading2, Heading5, Description, Heading3} from '../components'
import Container from '../components/Container'
import TopBar from '../components/TopBar'
import Divider from '../components/Divider'
import colors from '../utils/colors'

export default class Profile extends Component {
  render () {
    const topBar = (
      <TopBar title='profile.title' />
    )
    return (
      <Container topBar={topBar} style={{alignItems: 'center'}}>
        <Heading2 text='Luis Galvez' style={{marginTop: 153, color: colors.governorBay}} />
        <Heading5 text='3 stories' style={{marginBottom: 30}} />
        <View style={{paddingHorizontal: 26}}>
          <Divider style={{width: 323, marginLeft: 0}} />
          <View style={{paddingVertical: 20}}>
            <Description text='Email' />
            <Heading3 text='luis@yester.app' />
          </View>
          <Divider style={{width: 323, marginLeft: 0}} />
          <View style={{paddingVertical: 20}}>
            <Description text='Location' />
            <Heading3 text='Guatemala, Guatemala' />
          </View>
          <Divider style={{width: 323, marginLeft: 0}} />
        </View>
      </Container>
    )
  }
}
