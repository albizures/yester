import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { Button } from 'react-native'

import Setup2 from '../Setup-2'

const navigation = { navigate: jest.fn() }

describe('src/screens/Setup-2.js', () => {
  it('should render', () => {
    const tree = renderer.create(<Setup2 navigation={navigation} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  describe('when button to home is pressed', () => {
    it('should navigate to Home screen', () => {
      const shallowSetup2 = shallow(<Setup2 navigation={navigation} />)
      const shallowTouchableHighlights = shallowSetup2.find(Button)
      const shallowButtonToHome = shallowTouchableHighlights.at(0)

      shallowButtonToHome.prop('onPress')()

      expect(navigation.navigate).toHaveBeenCalledTimes(1)
      expect(navigation.navigate).toHaveBeenCalledWith('Home')
    })
  })
})
