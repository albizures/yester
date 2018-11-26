import React from 'react'
import PropTypes from 'prop-types'
import { View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import colors from '../../utils/colors'
import icons from '../../utils/icons'
import { Heading3, Description } from '../../components'
import { capitalize } from '../../utils'

const StoryItem = (props) => {
  const { onPress, question, category, content } = props

  const dot = !content
  const descriptionElement = content ? (
    <Description numberOfLines={1} text={capitalize(content)} style={styles.storyText} />
  ) : (
    <Description keyName='home.empty.story.description' style={styles.storyText} />
  )

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.newDotContainer} >
        {dot && <View style={styles.newDot} />}
      </View>
      <View style={styles.row}>
        <View style={styles.textContainer}>
          <Heading3 text={question} numberOfLines={2} style={styles.questionText} />
          <Description text={capitalize(category)} style={styles.categoryText} />
          {descriptionElement}
        </View>
        <View style={styles.iconContainer}>
          <Image source={icons.chevronRight} style={styles.chevron} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

StoryItem.propTypes = {
  question: PropTypes.string.isRequired,
  category: PropTypes.string,
  content: PropTypes.string,
  onPress: PropTypes.func.isRequired,
}
export default StoryItem

const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 5,
    width,
    flexDirection: 'row',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.mischka,
  },
  textContainer: {
    flex: 1,
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevron: {
    width: 8,
    height: 15,
  },
  categoryText: {
    marginTop: 4,
    color: colors.governorBay,
  },
  storyText: {
    marginTop: 3,
    marginBottom: 6,
    // text
  },
  newDotContainer: {
    width: 30,
    padding: 10,
    paddingTop: 6,
  },
  newDot: {
    width: 10,
    height: 10,
    backgroundColor: colors.royalBlue,
    borderRadius: 10,
  },
})
