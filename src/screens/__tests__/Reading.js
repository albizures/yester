import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { Button } from 'react-native'

import Reading from '../Reading'

const navigation = { navigate: jest.fn() }

describe('src/screens/Reading.js', () => {
  it('should render', () => {
    const tree = renderer.create(<Reading navigation={navigation} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  describe('when button to Home is pressed', () => {
    it('should navigate to Home screen', () => {
      const shallowReading = shallow(<Reading navigation={navigation} />)
      const shallowTouchableHighlights = shallowReading.find(Button)
      const shallowButtonToHome = shallowTouchableHighlights.at(0)

      shallowButtonToHome.prop('onPress')()

      expect(navigation.navigate).toHaveBeenCalledTimes(1)
      expect(navigation.navigate).toHaveBeenCalledWith('Home')
    })
  })
})
