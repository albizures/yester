import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { Button } from 'react-native'

import Setup from '../Setup'

const navigation = { navigate: jest.fn() }

describe('src/screens/Setup.js', () => {
  it('should render', () => {
    const tree = renderer.create(<Setup navigation={navigation} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  describe('when button to setup 1 is pressed', () => {
    it('should navigate to Setup1 screen', () => {
      const shallowSetup = shallow(<Setup navigation={navigation} />)
      const shallowTouchableHighlights = shallowSetup.find(Button)
      const shallowButtonToHome = shallowTouchableHighlights.at(0)

      shallowButtonToHome.prop('onPress')()

      expect(navigation.navigate).toHaveBeenCalledTimes(1)
      expect(navigation.navigate).toHaveBeenCalledWith('Setup1')
    })
  })
})
