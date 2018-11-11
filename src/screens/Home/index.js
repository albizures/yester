import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, FlatList, Alert, Image, Dimensions } from 'react-native'

import QuestionItem from './QuestionItem'
import StoryItem from './StoryItem'
import Tabs from './Tabs'
import Container from '../../components/Container'
import TopBar from '../../components/TopBar'
import { Title } from '../../components'

import http from '../../utils/http'
import colors from '../../utils/colors'
import icons from '../../utils/icons'
import { indexToString, capitalize } from '../../utils'

export default class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  state = {
    isLoading: true,
    item: {},
  }

  async componentDidMount () {
    this.setState({
      isLoading: true,
    })

    try {
      const { data: question } = await http.get('/v1/questions')
      console.log('component did mount', question)
      this.setState({ question })
    } catch (error) {
      if (error.response.status !== 404) {
        Alert.alert('Yester couldn\'t get today\'s question')
        console.log(error.response)
      }
    }

    this.setState({
      isLoading: false,
    })
  }

  renderChapter = ({item}) => (
    <View style={styles.chapterView}>
      <View style={styles.chapterTitle}>
        <Image source={icons.childhood} style={styles.chapterImage} />
        <Title text={capitalize(item.text)} style={styles.chapterText} />
      </View>
      <FlatList
        data={this.state.questions}
        renderItem={this.renderStoryItem}
        keyExtractor={indexToString}
      />
    </View>
  )

  renderStoryItem = ({item}) => (
    <StoryItem data={item} onPress={() => this.onPressItem(item)} />
  )

  onWriteTodayQuestion = () => {
    const { question } = this.state
    this.onPressItem(question)
  }

  onPressItem = (question) => {
    const { navigation } = this.props
    const { ageId, title, description } = question
    navigation.navigate('ModalCard', {
      ageId,
      title,
      description,
    })
  }

  render () {
    const { isLoading, question } = this.state
    const topBarTitle = (
      <View style={styles.topBarView}>
        <Image source={icons.logoWhite} style={styles.topBarLogo} />
      </View>
    )
    const topBar = (
      <TopBar title={topBarTitle} />
    )
    return (
      <Container topBar={topBar} isLoading={isLoading} style={styles.container} >
        <View style={styles.view}>
          { question && <QuestionItem text={question.description} onPress={this.onWriteTodayQuestion} />}
          <Tabs onPressItem={this.onPressItem} />
        </View>
      </Container>
    )
  }
}

const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.athensGray,
  },
  topBarLogo: {
    width: 100,
    height: 26,
  },
  topBarView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 12,
  },
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.athensGray,
    paddingTop: 20,
  },
  chapterView: {
    width,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  chapterTitle: {
    width,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 40,
    marginTop: 33,
    marginBottom: 20,
  },
  chapterImage: {
    width: 28,
    height: 30,
    marginRight: 10,
  },
  chapterText: {
    color: colors.governorBay,
    fontWeight: 'bold',
    paddingTop: 5,
  },
})
