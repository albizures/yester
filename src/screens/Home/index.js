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
      // const question = {
      //   age_id: 'Age#31',
      //   category: 'Familia',
      //   description: 'What were your favorite hobbies or activities?',
      //   id: 'Question#0099',
      //   sub_category: '',
      // }

      this.setState({ question })
    } catch (error) {
      console.log(error.response)
      if (error.response.status !== 404) {
        Alert.alert('Yester couldn\'t get today\'s question')
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
    const { question: item } = this.state
    const {
      category,
      age_id: ageId,
      description: question,
      id: questionId,
      story_id: storyId,
      category_id: categoryId,
    } = item
    this.onPressItem({ ageId, category, question, questionId, storyId, categoryId })
  }

  onPressItem = (item) => {
    const { navigation } = this.props
    const { ageId, category, question, questionId, storyId, content, categoryId } = item

    if (content) {
      return navigation.navigate('Reading', { storyId })
    }

    console.log({
      ageId,
      category,
      question,
      questionId,
      storyId,
      categoryId,
    })

    navigation.navigate('ModalCard', {
      ageId,
      category,
      question,
      questionId,
      storyId,
      categoryId,
    })
  }

  render () {
    const { isLoading, question } = this.state
    const topBarTitle = (
      <View style={{height: 51, alignItems: 'center', justifyContent: 'center'}}>
        <Image source={icons.logoWhite} style={styles.topBarImage} />
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
  topBarImage: {
    width: 100,
    height: 26,
  },
  view: {
    flex: 1,
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
