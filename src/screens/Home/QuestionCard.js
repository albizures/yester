import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, StyleSheet } from 'react-native'
import colors from '../../utils/colors'
import common from '../../styles/common'
import Button, {types} from '../../components/Button'

const QuestionCard = (props) => {
  const {item, onPressWrite, onPressSkip} = props

  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <View style={styles.ilustration}>
          <Text style={[common.h5]}>
            {item.age}
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={[common.h2]}>
            {item.category}
          </Text>
          <Text style={[common.h5]}>
            {item.text}
          </Text>
          <Button title='questionCard.write' onPress={onPressWrite} />
          <Button title='questionCard.skip' onPress={onPressSkip} type={types.OUTLINED} />
        </View>
      </View>
    </View>
  )
}

QuestionCard.propTypes = {
  item: PropTypes.object.isRequired,
  onPressWrite: PropTypes.func.isRequired,
  onPressSkip: PropTypes.func.isRequired,
}

QuestionCard.defaultProps = {
  item: {
    text: 'What is your full givenname? Were you named after anyone? (Question)',
    category: 'Your Name (Topic)',
    age: 'Your first days (Age)',
  },
}
export default QuestionCard

const styles = StyleSheet.create({
  card: {
    height: 520,
    width: 340,
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: colors.white,
    marginTop: 84,
    shadowColor: colors.questionCardShadow,
    shadowOpacity: 0.1,
    shadowRadius: 30,
    shadowOffset: {
      height: 30,
    },
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
