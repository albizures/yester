import React from 'react'
import PropTypes from 'prop-types'
import { View, Image, StyleSheet, TouchableOpacity, Switch } from 'react-native'
import colors from '../utils/colors'
import icons from '../utils/icons'
import { Heading4, Heading3 } from './'
import Divider from './Divider'

export const types = {
  ICON: 'ICON',
  ICON2: 'ICON2',
  TEXT: 'TEXT',
  TOGGLE: 'TOGGLE',
  NONE: 'NONE',
}

const SettingsItem = (props) => {
  const { onPress, title, type } = props

  let showIcon = {
    [types.ICON]: (
      <View style={styles.iconContainer}>
        <Image
          source={icons.chevronRight}
          style={styles.icon}
        />
      </View>
    ),
    [types.ICON2]: (
      <View style={styles.iconContainer}>
        <Image
          source={icons.check}
          style={styles.icon2}
        />
      </View>
    ),
    [types.TEXT]: (
      <View style={styles.textButton}>
        <Heading3 text='Disconnect' style={{color: colors.governorBay}} />
      </View>
    ),
    [types.TOGGLE]: (
      <View style={styles.textButton}>
        <Switch style={{}} />
      </View>
    ),
    [types.NONE]: (
      <View style={styles.iconContainer} />
    ),
  }

  return (
    <TouchableOpacity onPress={onPress} >
      <View style={[styles.itemContainer]}>
        <View style={styles.textContainer}>
          <Heading4 text={title} style={styles.item} />
        </View>
        {showIcon[type]}
      </View>
      <Divider style={{width: 323, marginLeft: 0}} />
    </TouchableOpacity>
  )
}

SettingsItem.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  type: PropTypes.oneOf(Object.keys(types)),
}
export default SettingsItem

const styles = StyleSheet.create({
  itemContainer: {
    height: 75,
    width: 340,
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 35,
    height: 35,
    alignItems: 'flex-end',
    justifyContent: 'center',
    alignSelf: 'center',
    marginRight: 25,
  },
  textButton: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    alignSelf: 'center',
    marginRight: 25,
  },
  icon: {
    width: 8,
    height: 15,
  },
  icon2: {
    width: 13,
    height: 9.5,
  },
})
