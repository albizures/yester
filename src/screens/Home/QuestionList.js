import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, FlatList, StyleSheet } from 'react-native'

const QuestionList = (props) => (

  <FlatList
    data={props.ages}
    renderItem={({item}) => (
      <View>
        <Text style={localStyles.sectionHeader}>{item.text}</Text>
        <TopicList {...props} />
      </View>
    )}
    keyExtractor={keyExtractor}
  />
)

QuestionList.propTypes = {
  ages: PropTypes.array.isRequired,
  topics: PropTypes.array.isRequired,
}

export default QuestionList

const keyExtractor = (item, index) => {
  return index.toString()
}

const TopicList = (props) => (
  <FlatList
    data={props.topics}
    renderItem={({item}) => (
      <Text style={localStyles.item}>{item.text}</Text>
    )}
    keyExtractor={keyExtractor}
  />
)

TopicList.propTypes = {
  topics: PropTypes.array.isRequired,
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})
