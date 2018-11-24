import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, Share } from 'react-native'

import { Heading1, Description, Title, Heading2 } from '../components'
import Container from '../components/Container'
import TopBar from '../components/TopBar'
import withUser, { shapeContextUser } from '../components/withUser'
import withAges, { shapeContextAges } from '../components/withAges'

import colors from '../utils/colors'
import http from '../utils/http'
import moment from 'moment'

class Reading extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    contextUser: PropTypes.shape(shapeContextUser).isRequired,
    contextAges: PropTypes.shape(shapeContextAges).isRequired,
  }

  state = {
    isLoading: false,
    title: '',
    content: '',
    created: '',
  }

  async componentDidMount () {
    const { navigation } = this.props
    const storyId = navigation.getParam('storyId')

    this.setState({ isLoading: true })

    try {
      const { data: {
        content,
        question_id: questionId,
        age_id: ageId,
        title,
        created,
      } } = await http.get(`/v1/stories/${storyId}`)
      this.setState({
        content,
        questionId,
        ageId,
        title,
        created: moment(created).format('LL'),
      })
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

  getTitleComponent () {
    const { title } = this.state
    if (title.length > 65) {
      return Heading2
    }

    return Heading1
  }

  render () {
    const { isLoading, title, content, ageId, created } = this.state
    const { name: author } = this.props.contextUser.user
    const { ages } = this.props.contextAges
    const age = (ages[ageId] || {}).name || ''

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
        action={action} />
    )

    const TitleComponent = this.getTitleComponent()

    return (
      <Container scroll isLoading={isLoading} topBar={topBar}>
        <View style={styles.container}>
          {/* TODO: add logo */}
          <Description text={age.toUpperCase()} />
          <TitleComponent text={title} style={{color: colors.governorBay, marginTop: 40}} />
          {/* TODO: make smaller this font */}
          <Description keyName='reading.by' data={{ author }} />
          {/* TODO: make smaller this font and changes its color to gray */}
          <Description text={created} />
          <Text maxLength={1000} multiline style={styles.content}>
            {content}
          </Text>
        </View>
      </Container>
    )
  }
}

export default withAges(withUser(Reading))

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 29,
  },
  content: {
    height: 400,
    marginTop: 40,
    fontFamily: 'Karla-Regular',
    fontSize: 18,
    textAlignVertical: 'top',
    textAlign: 'justify',
    backgroundColor: 'transparent',
  },
})
