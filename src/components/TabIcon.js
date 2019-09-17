import React from 'react'
import { Image, View, StyleSheet, PixelRatio } from 'react-native'
import PropTypes from 'prop-types'
import colors from '../utils/colors'

// TODO use Animated.View to animate the icon
const TabIcon = ({ focused, src, activeSrc, iconSize }) => {
  const source = focused ? activeSrc : src
  const style = focused ? styles.active : styles.inactive
  iconSize = iconSize || styles.iconSize

  return (
    <View style={style}>
      <Image style={iconSize} source={source} />
    </View>
  )
}

const styles = StyleSheet.create({
  active: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.governorBay,
    // padding: 18,
    borderRadius: PixelRatio.roundToNearestPixel(60), // (20 + 18 * 2) / 2),
    marginBottom: 10,
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: -5,
    },
  },
  inactive: {
    padding: 0,
  },
  iconSize: {
    height: 20,
    width: 20,
  },
})

TabIcon.propTypes = {
  focused: PropTypes.bool.isRequired,
  src: PropTypes.number.isRequired,
  activeSrc: PropTypes.number.isRequired,
  iconSize: PropTypes.object,
}

export const tabBarIcon = ({ active, inactive, iconSize }) => {
  const Icon = ({ focused }) => (
    <TabIcon activeSrc={active} src={inactive} focused={focused} iconSize={iconSize} />
  )
  Icon.propTypes = {
    focused: PropTypes.bool,
  }

  return Icon
}

export default TabIcon
