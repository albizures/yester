import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, FlatList } from 'react-native'

import Loading from '../../components/Loading'
import { Heading5 } from '../../components'
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

  async componentDidMount () {
    const { age } = this.props
    try {
      const { data } = await http.get('/v1/stories', {
        ageId: age,
        age_id: age,
        limit: 20,
      })

      this.setState({
        stories: data.items,
      })
    } catch (error) {
      console.log(error)
    }

    this.setState({ isLoading: false })
  }

  renderItem = ({item}) => {
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
        <Heading5 keyName={'home.empty.tab.title'} />
        <Heading5 keyName={'home.empty.tab.subtitle'} />
      </View>
    ) : (
      <FlatList
        horizontal
        style={{flexGrow: 0}}
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
  noStoriesContainer: {
    flex: 1,
    paddingHorizontal: 20,
    alignContent: 'center',
  },
  loading: {
    backgroundColor: colors.athensGray,
  },
  container: {
    flex: 1,
  },
})
