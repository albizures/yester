import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, StyleSheet } from 'react-native'
import colors from '../../utils/colors'
import common from '../../styles/common'
import Button, {types} from '../../components/Button'

const QuestionCard = (props) => {
  const {questionText, topicText, stageText, onPressWrite, onPressSkip} = props

  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <View style={styles.ilustration}>
          <Text style={[common.h5]}>
            {stageText}
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={[common.h2]}>
            {topicText}
          </Text>
          <Text style={[common.h5]}>
            {questionText}
          </Text>
          <Button title='questionCard.write' onPress={onPressWrite} />
          <Button title='questionCard.skip' onPress={onPressSkip} type={types.OUTLINED} />
        </View>
      </View>
    </View>
  )
}

QuestionCard.propTypes = {
  questionText: PropTypes.string.isRequired,
  topicText: PropTypes.string.isRequired,
  stageText: PropTypes.string.isRequired,
}

QuestionCard.defaultProps = {
  questionText: 'What is your full givenname? Were you named after anyone? (Question)',
  topicText: 'Your Name (Topic)',
  stageText: 'Your first days (Age)',
}
export default QuestionCard

const styles = StyleSheet.create({
  card: {
    height: 520,
    width: 340,
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: colors.white,
    marginTop: 10,
    marginBottom: 20,
    shadowColor: colors.mischka,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowRadius: 15,
    shadowOpacity: 1.0,
    elevation: 8,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.white,
    borderRadius: 30,
  },
  ilustration: {
    height: 250,
  },
  content: {
    height: 270,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
})
