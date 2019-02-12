import React, { Fragment } from 'react'
import { StyleSheet, ViewPropTypes, View, Image } from 'react-native'
import PropTypes from 'prop-types'

const Loading = ({ isLoading, children, top, style }) => {
  return (
    <Fragment>
      {children}
      {isLoading && <View style={[styles.loader, { top }, style]}>
        <Image style={{ flex: 0.5, resizeMode: 'contain' }} source={require('../assets/Yester-loop_1.gif')} />
      </View>}
    </Fragment>
  )
}

Loading.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired,
  top: PropTypes.number,
  style: ViewPropTypes.style,
}

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    height: '100%',
    width: '100%',
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
  },
})

export default Loading
