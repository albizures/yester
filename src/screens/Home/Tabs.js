import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dimensions, StyleSheet, View, Image } from 'react-native'
import { TabView, TabBar, PagerScroll } from 'react-native-tab-view'
import { Title } from '../../components'
// import Loading from '../../components/Loading'
import Tab from './Tab'
import withAges, { shapeContextAges } from '../../components/withAges'
import colors from '../../utils/colors'
import { getAgeIcon } from '../../utils/icons'
import http from '../../utils/http'
import debugFactory from 'debug'

const debugInfo = debugFactory('yester:Tabs:info')
// const debugError = debugFactory('yester:Tabs:error')

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
    isLoading: true,
    index: 0,
    routes: this.props.contextAges.agesList.map((age) => ({
      key: age.id,
      title: age.name,
    })),
    agesByStory: {},
  }

  async getStoriesByAge (id) {
    try {
      const { data = {} } = await http.get('/v1/stories', {
        age_id: id,
      })

      const { items = [], lastEvaluatedKey } = data
      return [undefined, items, lastEvaluatedKey]
    } catch (error) {
      return [error, []]
    }
  }

  async getStoriesByAges () {
    const { agesList } = this.props.contextAges

    const agesByStory = {}

    const listOfAgesByStory = await Promise.all(
      agesList.map(async (age) => {
        const { id } = age

        const [error, items, lastEvaluatedKey] = await this.getStoriesByAge(id)
        agesByStory[id] = { items, lastEvaluatedKey }

        return {
          error,
          items,
          ageId: id,
        }
      })
    )

    const firstAgeWithoutStories = listOfAgesByStory.find(
      ({ error, items }) => !error && items.length === 0
    )
    const indexOfFirstAgeWithoutStories = listOfAgesByStory.indexOf(firstAgeWithoutStories)

    return {
      index: indexOfFirstAgeWithoutStories - 1,
      agesByStory,
    }
  }

  async componentDidMount () {
    const { index, agesByStory } = await this.getStoriesByAges()
    this.setState({
      index,
      agesByStory,
      isLoading: false,
    })
  }

  onIndexChange = (index) => this.setState({ index })

  renderLabel = (scene) => {
    const focused = this.state.routes.indexOf(scene.route) === this.state.index
    const { title, key } = scene.route

    const customStyles = tabStyles[focused ? 'focused' : 'normal']

    return (
      <View style={styles.tabTitle}>
        {focused && <Image style={styles.ageIcon} source={getAgeIcon(key)} />}
        <Title text={title} numberOfLines={1} style={customStyles} />
      </View>
    )
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
          style={styles.header}
          tabStyle={styles.tabStyle}
          onTabLongPress={(scene) => {
            const { route } = scene
            debugInfo('onTabLongPress', scene)
            props.jumpTo(route.key)
          }}
        />
      </View>
    )
  }

  renderScene = ({ route }) => {
    const { onPressItem } = this.props
    const { agesByStory } = this.state
    const { items, lastEvaluatedKey } = agesByStory[route.key]

    return (
      <Tab
        onPressItem={onPressItem}
        initialEvaluatedKey={lastEvaluatedKey}
        initialStories={items}
        age={route.key}
      />
    )
  }

  render () {
    const { isLoading } = this.state
    console.log('State', this.state)

    if (isLoading) {
      return null // <Loading isLoading={isLoading} style={styles.loading} />
    }

    return (
      <TabView
        style={{ flex: 1 }}
        navigationState={this.state}
        renderScene={this.renderScene}
        renderTabBar={this.getTabBar}
        renderPager={(props) => <PagerScroll {...props} />}
        // renderPager={this.renderPager}
        onIndexChange={this.onIndexChange}
        initialLayout={initialLayout}
      />
    )
  }
}

export default withAges(Tabs)

const styles = StyleSheet.create({
  tabTitle: {
    width: 160,
    flexDirection: 'row',
    justifyContent: 'center',
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
  tabStyle: {
    width: 160,
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
