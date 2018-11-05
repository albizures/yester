import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, Share } from 'react-native'
import { Heading1, Description, Title } from '../components'
import Container from '../components/Container'
import Divider from '../components/Divider'

import TopBar from '../components/TopBar'
import colors from '../utils/colors'
import http from '../utils/http'

export default class Reading extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  state = {
    isLoading: false,
    title: '',
    content: '',
  }

  async componentDidMount () {
    const { navigation } = this.props
    const storyId = navigation.getParam('storyId')

    this.setState({ isLoading: true })

    try {
      const { data: story } = await http.get(`/v1/stories/${storyId}`)
      this.setState(story)
    } catch (error) {
      console.log(error)
      console.log(error.message)
      console.log(error.response)
    }

    this.setState({ isLoading: false })
  }

  onBack = () => {
    this.props.navigation.goBack()
  }

  onShare = () => {
    const { title, content } = this.state
    const message = `${title}: ${content}`.substr(0, 250)
    Share.share({
      title: 'test lwlw',
      message: `${message}...`,
    })
  }

  render () {
    const { isLoading, title, content } = this.state

    const action = (
      <Title
        keyName='reading.share'
        style={{ textDecorationLine: 'underline', color: colors.governorBay }}
        onPress={this.onShare} />
    )

    const topBar = (
      <TopBar
        transparent
        onBack={this.onBack}
        title='reading.topbar'
        action={action} />
    )
    return (
      <Container isLoading={isLoading} topBar={topBar}>
        <View style={styles.container}>
          <Heading1 text={title} style={{color: colors.governorBay}} />
          <Description keyName='writing.by' data={{autor: 'Luis Galvez'}} />
          <Description text='{month} {day}, {year}' data={{month: 'July', day: '6', year: '1987'}} />
          <Divider style={{marginVertical: 40, marginHorizontal: 0}} />
          <Text maxLength={1000} multiline style={styles.content}>
            {content}
          </Text>
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 29,
  },
  content: {
    height: 400,
    fontFamily: 'Karla-Regular',
    fontSize: 18,
    textAlignVertical: 'top',
    textAlign: 'justify',
    backgroundColor: 'transparent',
  },
})
