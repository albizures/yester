import React, { Component } from 'react'
import { View, Image, Dimensions, StyleSheet } from 'react-native'
import { Heading2, Heading5, Description, Heading3 } from '../components'
import Container from '../components/Container'
import TopBar from '../components/TopBar'
import Divider from '../components/Divider'
import colors from '../utils/colors'
import icons from '../utils/icons'

export default class Profile extends Component {
  render () {
    const topBar = (
      <TopBar title='profile.title' />
    )
    return (
      <Container topBar={topBar} style={styles.container}>
        <View style={styles.topFlex}>
          <Image source={icons.profileMan} style={styles.image} />
          <Heading2 text='Luis Galvez' style={styles.nameText} />
          <Heading5 text='3 stories' style={{marginBottom: 30}} />
        </View>

        <View style={styles.bottomFlex}>
          <Divider style={{width: 323}} />
          <View style={styles.item}>
            <Description text='Email' />
            <Heading3 text='luis@yester.app' />
          </View>
          <Divider style={{width: 323}} />
          <View style={styles.item}>
            <Description text='Location' />
            <Heading3 text='Guatemala, Guatemala' />
          </View>
          <Divider style={{width: 323}} />
        </View>
      </Container>
    )
  }
}

const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    width,
    height,
  },
  topFlex: {
    flex: 0.40,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: height * 0.06,
  },
  bottomFlex: {
    flex: 0.60,
    alignItems: 'center',
    paddingHorizontal: width * 0.07,
  },
  nameText: {
    marginTop: 17,
    color: colors.governorBay,
  },
  image: {
    width: 100,
    height: 100,
  },
  item: {
    width: 300,
    height: 80,
    alignItems: 'flex-start',
    paddingVertical: 20,
  },
})
