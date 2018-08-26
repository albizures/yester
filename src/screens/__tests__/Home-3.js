import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { Button } from 'react-native'

import Home3 from '../Home-3'

const navigation = { navigate: jest.fn() }

describe('src/screens/ConfirmEmail.js', () => {
  it('should render', () => {
    const tree = renderer.create(<Home3 navigation={navigation} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  describe('when button to home is pressed', () => {
    it('should navigate to Home screen', () => {
      const shallowHome3 = shallow(<Home3 navigation={navigation} />)
      const shallowTouchableHighlights = shallowHome3.find(Button)
      const shallowButtonToHome = shallowTouchableHighlights.at(0)

      shallowButtonToHome.prop('onPress')()

      expect(navigation.navigate).toHaveBeenCalledTimes(1)
      expect(navigation.navigate).toHaveBeenCalledWith('Home')
    })
  })
})
