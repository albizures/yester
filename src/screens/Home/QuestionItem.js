import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, StyleSheet } from 'react-native'
import colors from '../../utils/colors'
import icons from '../../utils/icons'
import common from '../../styles/common'

const QuestionItem = (props) => {
  const {text} = props

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.questionText}>
          <Text numberOfLines={2} style={[common.h4, {flexWrap: 'wrap'}]}>
            {text}
          </Text>
        </View>
        <Image source={icons.buttonPlus} resizeMode='cover' style={styles.buttonPlus} />
      </View>
    </View>
  )
}

QuestionItem.propTypes = {
  text: PropTypes.string.isRequired,
}
export default QuestionItem

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 75,
    width: 340,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: colors.white,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: colors.mischka,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowRadius: 15,
    shadowOpacity: 1.0,
    elevation: 8,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  questionText: {
    flex: 1,
    height: 50,
    width: 220,
    marginLeft: 30,
    justifyContent: 'center',
  },
  buttonPlus: {
  // Specfile dice 35x35 pero el SVG no viene en la posicion 0,0
    width: 50,
    height: 50,
    marginRight: 17,
  },
})
