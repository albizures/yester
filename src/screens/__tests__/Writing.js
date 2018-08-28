import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { Button } from 'react-native'

import Writing from '../Writing'

const navigation = { navigate: jest.fn() }

describe('src/screens/Writing.js', () => {
  it('should render', () => {
    const tree = renderer.create(<Writing navigation={navigation} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  describe('when button to Reading is pressed', () => {
    it('should navigate to Reading screen', () => {
      const shallowWriting = shallow(<Writing navigation={navigation} />)
      const shallowTouchableHighlights = shallowWriting.find(Button)
      const shallowButtonToHome = shallowTouchableHighlights.at(0)

      shallowButtonToHome.prop('onPress')()

      expect(navigation.navigate).toHaveBeenCalledTimes(1)
      expect(navigation.navigate).toHaveBeenCalledWith('Reading')
    })
  })
})
