import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { Button } from 'react-native'

import Language from '../Language'

const navigation = { navigate: jest.fn() }

describe('src/screens/Language.js', () => {
  it('should render', () => {
    const tree = renderer.create(<Language navigation={navigation} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  describe('when button to home is pressed', () => {
    it('should navigate to Home screen', () => {
      const shallowLanguage = shallow(<Language navigation={navigation} />)
      const shallowTouchableHighlights = shallowLanguage.find(Button)
      const shallowButtonToHome = shallowTouchableHighlights.at(0)

      shallowButtonToHome.prop('onPress')()

      expect(navigation.navigate).toHaveBeenCalledTimes(1)
      expect(navigation.navigate).toHaveBeenCalledWith('Home')
    })
  })
})
