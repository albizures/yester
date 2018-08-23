import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { Button, Alert } from 'react-native'

import agesFixture from './__fixtures__/ages.json'
import topicsFixture from './__fixtures__/topics.json'

import Container from '../../../components/Container'
import http from '../../../utils/http'
import Home from '../'
const navigation = {
  navigate: jest.fn(),
}

describe('src/screens/Home.js', () => {
  it('should render', () => {
    const tree = renderer.create(<Home navigation={navigation} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  describe('when button is pressed', () => {
    it('should navigate to Home2 screen', () => {
      const shallowHome = shallow(<Home navigation={navigation} />)
      const shallowTouchableHighlights = shallowHome.find(Button)
      const shallowButtonToHome2 = shallowTouchableHighlights.at(0)

      shallowButtonToHome2.prop('onPress')()

      expect(navigation.navigate).toHaveBeenCalledTimes(1)
      expect(navigation.navigate).toHaveBeenCalledWith('Home2')
      expect(shallowHome.type()).toBe(Container)
    })
  })

  // shallowHome.setState({
  //   isLoading: false,
  //   dataSource: {
  //     age: agesFixture,
  //     topics: topicsFixture,
  //   },
  // })

  describe('#getAgesItems', () => {
    it('should render a View', () => {
      const age = agesFixture[0]
      const shallowHome = shallow(<Home navigation={navigation} />)
      const home = shallowHome.instance()

      shallowHome.setState({
        isLoading: false,
        age: agesFixture,
        topics: topicsFixture,
      })

      const shallowItem = shallow(home.getAgesItems({ item: age }))
      expect(shallowItem.type()).toBe('View')
    })
  })

  describe('#getTopicsItems', () => {
    it('should render a View', () => {
      const topic = topicsFixture[0]
      const shallowHome = shallow(<Home navigation={navigation} />)
      const home = shallowHome.instance()

      shallowHome.setState({
        isLoading: false,
        age: agesFixture,
        topics: topicsFixture,
      })

      const shallowItem = shallow(home.getTopicsItems({ item: topic }))
      expect(shallowItem.type()).toBe('View')
    })
  })

  describe('#renderAgeItem', () => {
    it('should render a View', () => {
      const age = agesFixture[0]
      const shallowHome = shallow(<Home navigation={navigation} />)
      const home = shallowHome.instance()

      shallowHome.setState({
        isLoading: false,
        age: agesFixture,
        topics: topicsFixture,
      })

      const shallowItem = shallow(home.renderAgeItem({ item: age }))
      expect(shallowItem.type()).toBe('View')
    })
  })

  describe('#renderTopicItem', () => {
    it('should render a View', () => {
      const topic = topicsFixture[0]
      const shallowHome = shallow(<Home navigation={navigation} />)
      const home = shallowHome.instance()

      shallowHome.setState({
        isLoading: false,
        age: agesFixture,
        topics: topicsFixture,
      })

      const shallowItem = shallow(home.renderTopicItem({ item: topic }))
      expect(shallowItem.type()).toBe('View')
    })
  })

  describe('#componentDidMount', () => {
    it('should render a View', async () => {
      http.get = jest.fn().mockResolvedValue({data: {value: 'test'}})
      const shallowHome = shallow(<Home navigation={navigation} />)
      const home = shallowHome.instance()

      await home.componentDidMount()
      expect(shallowHome.state()).toMatchObject({isLoading: false, value: 'test'})
    })

    describe('when the request fail', () => {
      it('should display an alert', async () => {
        http.get = jest.fn().mockRejectedValue(new Error('Error test'))
        Alert.alert = jest.fn()
        const shallowHome = shallow(<Home navigation={navigation} />)
        const home = shallowHome.instance()
        await home.componentDidMount()
        expect(Alert.alert).toBeCalledWith('Error', 'Error test')
      })
    })
  })
})
