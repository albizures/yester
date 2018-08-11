import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { View, Button } from 'react-native'

import Home from '../Home'
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
      expect(shallowHome.type()).toBe(View)

      /* shallowHome.setState({ isLoading: false })
      const shallowTouchableHighlights2 = shallowHome.find(Button)
      const shallowButtonToHome22 = shallowTouchableHighlights2.at(0)

      shallowButtonToHome22.prop('onPress')()

      expect(navigation.navigate).toHaveBeenCalledTimes(1)
      expect(navigation.navigate).toHaveBeenCalledWith('Home2')
      expect(shallowHome.type()).toBe(View) */
    })
  })
})
