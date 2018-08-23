import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import commonStyles from '../../styles/common'
import colors from '../../utils/colors'
import Translate from '../../components/Translate'

const QuestionItem = (props) => (
  <View style={styles.container} >
    <View style={[commonStyles.separator, styles.margin]} />
    <View style={styles.row}>
      <Image source={require('../../assets/square.png')} style={styles.itemImage} />
      <View style={styles.questionText}>
        <Text style={styles.item}>
          {props.item.text}
        </Text>
        <Translate keyName='questionItem.completed' />
      </View>
      <Image source={require('../../assets/right-arrow.png')} style={styles.itemArrow} />
    </View>
  </View>
)
QuestionItem.propTypes = {
  item: PropTypes.object.isRequired,
}
export default QuestionItem

const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: { flex: 1 },
  item: {
    fontSize: 18,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: height * 0.1,
    width: width,
    paddingHorizontal: width * 0.08,
    backgroundColor: colors.white,
  },
  margin: {
    marginBottom: height * 0.01,
  },
  itemImage: {width: 40, height: 40, tintColor: colors.mainColor},
  questionText: {flex: 1, paddingLeft: width * 0.05},
  itemArrow: {width: 13.15, height: 24.5, tintColor: colors.mainColor},
})
