import React, { Fragment } from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import colors from '../utils/colors'

const Loading = ({ isLoading, children, top }) => {
  return (
    <Fragment>
      {children}
      {isLoading && <ActivityIndicator color={colors.black} size='large' style={[styles.loader, { top }]} />}
    </Fragment>
  )
}

Loading.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired,
  top: PropTypes.number,
}

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
  },
})

export default Loading
