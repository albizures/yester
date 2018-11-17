import React from 'react'
import PropTypes from 'prop-types'
import { View, Image, StyleSheet } from 'react-native'
import colors from '../../utils/colors'
import icons from '../../utils/icons'
import { capitalize } from '../../utils'
import Button, {types} from '../../components/Button'
import { Heading2, Heading5 } from '../../components'

const QuestionCard = (props) => {
  const {data, onPressWrite, onPressSkip} = props

  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <View style={styles.illustrationView}>
          <Image source={icons.cardFriendship} />
        </View>
        <View style={{flex: 1, position: 'absolute', paddingTop: 27}}>
          <Heading5 text={capitalize(data.age)} style={{textAlign: 'center'}} />
        </View>

        <View style={styles.contentTop}>
          <Heading2 text={capitalize(data.category)} style={{marginBottom: 10}} />
          <Heading5 text={capitalize(data.text)} />
        </View>

        <View style={styles.contentBottom}>
          <Button title='questionCard.write'
            onPress={onPressWrite}
            style={{marginBottom: 20}} />
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
    justifyContent: 'flex-start',
    backgroundColor: colors.white,
    borderRadius: 30,
  },
  contentTop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  contentBottom: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 30,
  },
  illustrationView: {
    width: 340,
    height: 250,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
