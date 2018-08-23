import { Dimensions, View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import React from 'react'

const Step = (props) => {
  const { children } = props
  const { width, height } = Dimensions.get('window')
  const portrait = height > width
  const style = {
    justifyContent: portrait ? 'center' : 'flex-start',
    paddingTop: portrait ? 0 : 10,
    width,
    height,
  }

  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  )
}

Step.propTypes = {
  children: PropTypes.node.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
})

export default Step