import React from 'react'
import PropTypes from 'prop-types'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import colors from '../../utils/colors'
import icons from '../../utils/icons'
import { Heading3, Description } from '../../components'

const QuestionItem = (props) => {
  const {data, onPress} = props

  return (
    <TouchableOpacity onPress={onPress} >
      <View style={[styles.itemContainer]}>
        <View style={styles.textContainer}>
          <Heading3 text={data.text} numberOfLines={2} style={[{flexWrap: 'wrap'}]} />
          <Description text={data.category} numberOfLines={1} />
        </View>
        <View style={styles.iconContainer}>
          <Image
            source={icons.chevronRight}
            style={styles.icon}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

QuestionItem.propTypes = {
  data: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
}
export default QuestionItem

const styles = StyleSheet.create({
  itemContainer: {
    height: 75,
    width: 340,
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: colors.white,
    marginBottom: 17,
    shadowColor: colors.shadow,
    shadowOpacity: 0.22,
    shadowRadius: 15,
    shadowOffset: {
      height: 8,
    },
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 30,
  },
  iconContainer: {
    width: 35,
    height: 35,
    alignItems: 'flex-end',
    justifyContent: 'center',
    alignSelf: 'center',
    marginRight: 25,
  },
  icon: {
    width: 8,
    height: 15,
  },
})
