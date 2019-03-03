import React from 'react'
import PropTypes from 'prop-types'
import { View, Platform, ScrollView, RefreshControl, StyleSheet, ViewPropTypes } from 'react-native'

import ConditionalWrapper from './ConditionalWrapper'
import Loading from './Loading'
import colors from '../utils/colors'

const top = Platform.OS === 'ios' ? 20 : 0

const Container = (props) => {
  const { scroll, isLoading, children, topBar, onRefresh, refreshing, style, scrollRef } = props
  const refreshControl = (scroll && onRefresh && refreshing) ? (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  ) : undefined

  const ScrollViewProps = {
    refreshControl,
    style: styles.flex,
    ref: scrollRef,
  }

  return (
    <View style={[styles.container, style, !topBar ? { paddingTop: top } : undefined]}>
      <Loading top={top} isLoading={isLoading}>
        {topBar}
        <ConditionalWrapper component={ScrollView} condition={scroll} props={ScrollViewProps}>
          {children}
        </ConditionalWrapper>
      </Loading>
    </View>
  )
}

Container.propTypes = {
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool,
  children: PropTypes.node.isRequired,
  topBar: PropTypes.node,
  isLoading: PropTypes.bool,
  scroll: PropTypes.bool,
  style: ViewPropTypes.style,
  scrollRef: PropTypes.object,
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.athensGray,
  },
})

export default Container
