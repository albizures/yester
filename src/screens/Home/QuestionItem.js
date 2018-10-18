import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import colors from '../../utils/colors'
import icons from '../../utils/icons'
import common from '../../styles/common'

const QuestionItem = (props) => {
  const {questionText, topicText, onPress} = props

  return (
    <TouchableOpacity onPress={onPress} >
      <View style={[styles.itemContainer]}>
        <View style={styles.textContainer}>
          <Text numberOfLines={2} style={[common.h3, {flexWrap: 'wrap'}]}>
            {questionText}
          </Text>
          <Text numberOfLines={1} style={[styles.topicText]}>
            {topicText}
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <Image
            source={icons.chevronRight}
            style={styles.icon}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

QuestionItem.propTypes = {
  questionText: PropTypes.string.isRequired,
  topicText: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
}
export default QuestionItem

const styles = StyleSheet.create({
  itemContainer: {
    height: 75,
    width: 340,
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: colors.white,
    marginBottom: 17,
    shadowColor: colors.shadow,
    shadowOpacity: 0.22,
    shadowRadius: 15,
    shadowOffset: {
      height: 8,
    },
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 30,
  },
  questionText: {
    fontFamily: 'Karla-Regular',
    color: colors.mineShaft,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  topicText: {
    fontFamily: 'Karla-Regular',
    color: colors.mineShaft,
    fontSize: 12,
    textAlign: 'left',
  },
  iconContainer: {
    width: 35,
    height: 35,
    alignItems: 'flex-end',
    justifyContent: 'center',
    alignSelf: 'center',
    marginRight: 25,
  },
  icon: {
    width: 8,
    height: 15,
  },
})
