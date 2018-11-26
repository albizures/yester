import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dimensions, StyleSheet, View, Image } from 'react-native'
import { TabView, TabBar } from 'react-native-tab-view'

import { Title } from '../../components'
import Tab from './Tab'
import withAges, { shapeContextAges } from '../../components/withAges'
import colors from '../../utils/colors'
import { getAgeIcon } from '../../utils/icons'

const { width } = Dimensions.get('window')

const initialLayout = {
  height: 0,
  width,
}

class Tabs extends Component {
  static propTypes = {
    onPressItem: PropTypes.func.isRequired,
    contextAges: PropTypes.shape(shapeContextAges).isRequired,
  }

  state = {
    index: 0,
    routes: this.props.contextAges.agesList.map((age) => ({
      key: age.id,
      title: age.name,
    })),
  }

  onIndexChange = index => this.setState({ index })

  renderLabel = (scene) => {
    const focused = this.state.routes.indexOf(scene.route) === this.state.index
    const { title, key } = scene.route

    const customStyles = tabStyles[focused ? 'focused' : 'normal']

    return <View style={styles.tabTitle}>
      {focused && <Image style={styles.ageIcon} source={getAgeIcon(key)} />}
      <Title text={title} numberOfLines={1} style={customStyles} />
    </View>
  }

  getTabBar = (props) => {
    return (
      <View style={styles.headerContainer}>
        <TabBar
          {...props}
          scrollEnabled
          pressOpacity={1}
          renderLabel={this.renderLabel}
          labelStyle={styles.label}
          indicatorStyle={styles.indicator}
          style={styles.header} />
      </View>
    )
  }

  renderScene = ({ route }) => {
    const { onPressItem } = this.props
    return (
      <Tab onPressItem={onPressItem} age={route.key} />
    )
  };

  render () {
    return (
      <TabView
        style={{flex: 1}}
        navigationState={this.state}
        renderScene={this.renderScene}
        renderTabBar={this.getTabBar}
        // renderPager={this.renderPager}
        onIndexChange={this.onIndexChange}
        initialLayout={initialLayout} />
    )
  }
}

export default withAges(Tabs)

const styles = StyleSheet.create({
  tabTitle: {
    flexDirection: 'row',
  },
  ageIcon: {
    width: 32,
    height: 32,
    marginRight: 5,
  },
  headerContainer: {
    paddingHorizontal: 20,
    overflow: 'visible',
    borderBottomWidth: 1,
    borderBottomColor: colors.mischka,
  },
  header: {
    overflow: 'visible',
    backgroundColor: 'transparent',
    height: 50,
  },
  indicator: {
    backgroundColor: colors.governorBay,
  },
})

const tabStyles = StyleSheet.create({
  focused: {
    color: colors.governorBay,
    fontWeight: 'bold',
  },
  normal: {
    color: colors.mischka,
  },
})
