import React from 'react'
import PropTypes from 'prop-types'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import colors from '../../utils/colors'
import icons from '../../utils/icons'
import { Title, Heading3, Description } from '../../components'
import IconButton from '../../components/IconButton'

const QuestionItem = (props) => {
  const { text, onPress } = props

  return (
    <TouchableOpacity onPress={onPress} style={styles.container} >
      <View style={styles.card}>
        <View style={styles.topView}>
          <Title keyName='home.questionItem.dailyTopic!' style={styles.dayTopicText} />
        </View>
        <View style={styles.newTextContainer}>
          <Description keyName='home.questionItem.new' style={styles.newText} />
        </View>
        <View style={styles.bottomView}>
          <View style={{ flex: 1 }}>
            <Heading3 text={text} numberOfLines={2} style={{ flexWrap: 'wrap' }} />
          </View>
          <View style={styles.iconView}>
            <IconButton>
              <Image source={icons.pencil} style={styles.icon} />
            </IconButton>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginHorizontal: 20,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: colors.white,
    shadowColor: colors.shadow,
    shadowOpacity: 0.22,
    shadowRadius: 15,
    shadowOffset: {
      height: 8,
    },
  },
  topView: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.royalBlue,
  },
  bottomView: {
    flexDirection: 'row',
    padding: 10,
    paddingTop: 5,
    alignItems: 'stretch',
  },
  iconView: {
    marginLeft: 10,
    width: 40,
  },
  icon: {
    width: 17,
    height: 17,
  },
  newTextContainer: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  newText: {
    color: colors.royalBlue,
    fontWeight: 'bold',
  },
  dayTopicText: {
    color: colors.white,
    fontWeight: 'bold',
  },
})

QuestionItem.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
}
export default QuestionItem
