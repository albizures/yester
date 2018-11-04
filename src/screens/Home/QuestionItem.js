import React from 'react'
import PropTypes from 'prop-types'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import colors from '../../utils/colors'
import icons from '../../utils/icons'
import { Heading2, Heading3, Description } from '../../components'
import { capitalize } from '../../utils'

const QuestionItem = (props) => {
  const {data, onPress} = props

  return (
    <TouchableOpacity onPress={onPress} style={styles.container} >
      <View style={styles.card}>
        <View style={styles.topView}>
          <Heading2 text={'Your topic of the day!'} numberOfLines={2} style={styles.dayTopicText} />
        </View>
        <View style={styles.bottomView}>
          <View style={styles.textView}>
            <Heading3 text={data.text} numberOfLines={2} style={{flexWrap: 'wrap'}} />
            <Description text={capitalize(data.category)}
              style={{marginTop: 3}}
              numberOfLines={1} />
          </View>
          <View style={styles.iconView}>
            <Image
              source={icons.buttonPlus}
              style={styles.icon}
            />
          </View>
        </View>

      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 130,
    width: 340,
  },
  card: {
    flex: 1,
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
    height: 55,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: colors.royalBlue,
    paddingLeft: 20,
  },
  bottomView: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 20,
  },
  textView: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  iconView: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  icon: {
    width: 50,
    height: 50,
  },
  dayTopicText: {
    color: colors.white,
  },
})

QuestionItem.propTypes = {
  data: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
}
export default QuestionItem
