import React from 'react'
import PropTypes from 'prop-types'
import { View, Image, StyleSheet } from 'react-native'
import colors from '../../utils/colors'
import icons from '../../utils/icons'
import Button, {types} from '../../components/Button'
import { Heading2, Heading5 } from '../../components'

const QuestionCard = (props) => {
  const {data, onPressWrite, onPressSkip} = props

  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <View style={styles.ilustration}>
          <Image source={icons.ssCard}
            style={{width: 340, height: 250}} />
          <View style={{flex: 1, position: 'absolute', alignSelf: 'center', paddingTop: 27}}>
            <Heading5 text={data.age} style={[{textAlign: 'center'}]} />
          </View>
        </View>
        <View style={styles.content}>
          <Heading2 text={data.category} style={[{marginBottom: 10}]} />
          <View style={{height: 41}}>
            <Heading5 text={data.text} />
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
  data: PropTypes.object.isRequired,
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
