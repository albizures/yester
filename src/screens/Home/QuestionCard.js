import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, StyleSheet } from 'react-native'
import colors from '../../utils/colors'
import icons from '../../utils/icons'
import common from '../../styles/common'
import Button, {types} from '../../components/Button'

const QuestionCard = (props) => {
  const {item, onPressWrite, onPressSkip} = props

  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <View style={styles.ilustration}>
          <Image source={icons.ssCard}
            style={{width: 340, height: 250}} />
          <View style={{flex: 1, position: 'absolute', alignSelf: 'center', paddingTop: 27}}>
            <Text style={[common.h5, {textAlign: 'center'}]}>
              {item.age}
            </Text>
          </View>
        </View>
        <View style={styles.content}>
          <Text style={[common.h2, {marginBottom: 10}]}>
            {item.category}
          </Text>
          <View style={{height: 41}}>
            <Text style={[common.h5]}>
              {item.text}
            </Text>
          </View>
          <Button title='questionCard.write'
            style={{marginVertical: 20}}
            onPress={onPressWrite} />
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
    overflow: 'hidden',
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
    paddingTop: 20,
    paddingBottom: 30,
  },
})
