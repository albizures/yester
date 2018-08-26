import React from 'react'
import { shallow } from 'enzyme'
import { TouchableHighlight } from 'react-native'
import Button, {sizes} from '../Button'

describe('src/components/Button.js', () => {
  it('should render a TouchableHighlight', () => {
    const shallowButton = shallow(<Button title='Button' />)
    expect(shallowButton.type()).toBe(TouchableHighlight)
  })

  describe('when size button is small', () => {
    it('should render a TouchableHighlight', () => {
      const shallowButton = shallow(<Button title='Button' size={sizes.SMALL} />)
      expect(shallowButton.type()).toBe(TouchableHighlight)
    })
  })
})
