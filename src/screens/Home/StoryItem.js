import React from 'react'
import PropTypes from 'prop-types'
import { View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import colors from '../../utils/colors'
import icons from '../../utils/icons'
import { Heading3, Description } from '../../components'
import Divider from '../../components/Divider'
import { capitalize } from '../../utils'

const StoryItem = (props) => {
  const { onPress, data } = props

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.row}>

        <View style={styles.textContainer}>
          <Heading3 text={data.text} numberOfLines={2} style={[{flexWrap: 'wrap'}]} />
          <Description text={capitalize(data.category)}
            style={styles.categoryText} />
          <Description text={capitalize('This is where my story begins...'/* data.story */)}
            style={styles.storyText} />
        </View>

        <View style={styles.iconContainer}>
          <Image source={icons.chevronRight} style={styles.chevron} />
        </View>

      </View>
      <Divider style={styles.divider} />
    </TouchableOpacity>
  )
}

StoryItem.propTypes = {
  data: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
}
export default StoryItem

const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    height: 85,
    width,
    paddingLeft: 40,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  chevron: {
    width: 8,
    height: 15,
  },
  categoryText: {
    marginTop: 5,
    color: colors.royalBlue,
  },
  storyText: {
    marginTop: 3,
  },
  divider: {
    width: width - 30,
    marginLeft: 0,
  },
})
