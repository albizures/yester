import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, FlatList } from 'react-native'

import Loading from '../../components/Loading'
import { Heading5, Heading4 } from '../../components'
import StoryItem from './StoryItem'

import colors from '../../utils/colors'
import http from '../../utils/http'
import { indexToString } from '../../utils'

export default class Tab extends Component {
  static propTypes = {
    onPressItem: PropTypes.func.isRequired,
    age: PropTypes.string.isRequired,
  }

  state = {
    isLoading: true,
    stories: [],
  }

  onEndReached = (info) => {
    this.getStories()
  }

  getStories = async () => {
    const { age } = this.props
    const { lastEvaluatedKey, stories, endReached } = this.state
    if (endReached) {
      return
    }
    try {
      const { data } = await http.get('/v1/stories', {
        age_id: age,
        lastEvaluatedKey,
      })

      this.setState({
        stories: stories.concat(data.items),
        lastEvaluatedKey: data.lastEvaluatedKey,
        endReached: !data.lastEvaluatedKey,
      })
    } catch (error) {
      console.log(error)
      console.log(error.response)
    }
  }

  async componentDidMount () {
    await this.getStories()
    this.setState({ isLoading: false })
  }

  renderItem = ({ item }) => {
    const { onPressItem } = this.props
    const { category, question_id: questionId, title: question, age_id: ageId, id: storyId, story, content } = item
    const newItem = { question, questionId, ageId, storyId, content }
    return (
      <StoryItem
        question={question}
        category={category}
        content={content}
        story={story}
        onPress={() => onPressItem(newItem)}
      />
    )
  }

  render () {
    const { isLoading, stories } = this.state
    const content = stories.length === 0 ? (
      <View style={styles.noStoriesContainer}>
        <Heading4 style={[styles.message, styles.highlightMessage]} keyName={'home.empty.tab.title'} />
        <Heading5 style={styles.message} keyName={'home.empty.tab.subtitle'} />
      </View>
    ) : (
      <FlatList
        onEndReached={this.onEndReached}
        style={{ flexGrow: 0 }}
        data={stories}
        keyExtractor={indexToString}
        renderItem={this.renderItem}
      />
    )

    return (
      <View style={styles.container}>
        <Loading isLoading={isLoading} style={styles.loading} >
          {content}
        </Loading>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  highlightMessage: {
    fontWeight: 'bold',
    color: colors.governorBay,
  },
  message: {
    textAlign: 'center',
  },
  noStoriesContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    alignContent: 'center',
  },
  loading: {
    backgroundColor: colors.athensGray,
  },
  container: {
    flex: 1,
  },
})
