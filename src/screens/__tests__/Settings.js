import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { Button } from 'react-native'

import Settings from '../Settings'

const navigation = { navigate: jest.fn() }

describe('src/screens/ConfirmEmail.js', () => {
  it('should render', () => {
    const tree = renderer.create(<Settings navigation={navigation} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  describe('when button to home is pressed', () => {
    it('should navigate to Home screen', () => {
      const shallowSettings = shallow(<Settings navigation={navigation} />)
      const shallowTouchableHighlights = shallowSettings.find(Button)
      const shallowButtonToHome = shallowTouchableHighlights.at(0)

      shallowButtonToHome.prop('onPress')()

      expect(navigation.navigate).toHaveBeenCalledTimes(1)
      expect(navigation.navigate).toHaveBeenCalledWith('Home')
    })
  })
})
