import React from 'react'
import { Image, View, StyleSheet, PixelRatio } from 'react-native'
import PropTypes from 'prop-types'
import colors from '../utils/colors'

// TODO use Animated.View to animate the icon
const TabIcon = ({ focused, src, activeSrc }) => {
  const source = focused ? activeSrc : src
  const style = focused ? styles.active : styles.inactive
  return (
    <View style={style}>
      <Image
        style={{
          height: 20,
          width: 20,
        }}
        source={source}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  active: {
    backgroundColor: colors.governorBay,
    padding: 18,
    borderRadius: PixelRatio.roundToNearestPixel((20 + (18 * 2)) / 2),
    marginBottom: 10,
  },
  inactive: {
    padding: 0,
  },
})

TabIcon.propTypes = {
  focused: PropTypes.bool.isRequired,
  src: PropTypes.number.isRequired,
  activeSrc: PropTypes.number.isRequired,
}

export const tabBarIcon = ({active, inactive}) => {
  const Icon = ({focused}) => (
    <TabIcon
      activeSrc={active}
      src={inactive}
      focused={focused} />
  )
  Icon.propTypes = {
    focused: PropTypes.bool,
  }

  return Icon
}

export default TabIcon
