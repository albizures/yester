import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { Button } from 'react-native'

import Setup1 from '../Setup-1'

const navigation = { navigate: jest.fn() }

describe('src/screens/Setup-1.js', () => {
  it('should render', () => {
    const tree = renderer.create(<Setup1 navigation={navigation} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  describe('when button to Setup 2 is pressed', () => {
    it('should navigate to Setup2 screen', () => {
      const shallowSetup1 = shallow(<Setup1 navigation={navigation} />)
      const shallowTouchableHighlights = shallowSetup1.find(Button)
      const shallowButtonToHome = shallowTouchableHighlights.at(0)

      shallowButtonToHome.prop('onPress')()

      expect(navigation.navigate).toHaveBeenCalledTimes(1)
      expect(navigation.navigate).toHaveBeenCalledWith('Setup2')
    })
  })
})
