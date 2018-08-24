import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import colors from '../../utils/colors'
import icons from '../../utils/icons'
import common from '../../styles/common'
import Translate from '../../components/Translate'

const QuestionItem = (props) => (
  <View style={styles.container} >
    <View style={styles.row}>
      <Image source={require('../../assets/square.png')} style={styles.itemImage} />
      <View style={styles.questionText}>
        <Text style={common.h3}>
          {props.item.text}
        </Text>
        <Translate keyName='questionItem.completed' />
      </View>
      <Image source={icons.buttonPlus} style={styles.itemArrow} />
    </View>
  </View>
)
QuestionItem.propTypes = {
  item: PropTypes.object.isRequired,
}
export default QuestionItem

const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 75,
    width: 340,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: colors.white,
    marginBottom: 12,
    shadowColor: colors.mischka,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowRadius: 10,
    shadowOpacity: 1.0,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  itemImage: {width: 40, height: 40, tintColor: colors.governorBay},
  questionText: {flex: 1, paddingLeft: width * 0.02},
  itemArrow: {width: 35, height: 35},
})
