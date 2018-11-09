import React from 'react'
import PropTypes from 'prop-types'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import colors from '../../utils/colors'
import icons from '../../utils/icons'
import { Title, Heading3, Description } from '../../components'
import IconButton from '../../components/IconButton'
import { capitalize } from '../../utils'

const QuestionItem = (props) => {
  const {data, onPress} = props

  return (
    <TouchableOpacity onPress={onPress} style={styles.container} >
      <View style={styles.card}>
        <View style={styles.topView}>
          <Title text={'Your topic of the day!'} style={styles.dayTopicText} />
        </View>
        <View style={styles.bottomView}>
          <View style={styles.textView}>
            <Description keyName='home.questionItem.new' style={styles.newText} />
            <Heading3 text={data.text} numberOfLines={2} style={{flexWrap: 'wrap'}} />
          </View>
          <View style={styles.iconView}>
            <IconButton>
              <Image source={icons.pencil} style={styles.icon} />
            </IconButton>
          </View>
        </View>

      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 138,
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
    height: 58,
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
    justifyContent: 'flex-start',
  },
  iconView: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  icon: {
    width: 17,
    height: 17,
  },
  newText: {
    color: colors.royalBlue,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 7,
  },
  dayTopicText: {
    color: colors.white,
    fontWeight: 'bold',
  },
})

QuestionItem.propTypes = {
  data: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
}
export default QuestionItem
