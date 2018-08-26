import React from 'react'
import { shallow } from 'enzyme'
import { TouchableHighlight } from 'react-native'

import Button, {types, sizes} from '../Button'

describe('src/components/Button.js', () => {
  it('should render a TouchableHighlight', () => {
    const shallowButton = shallow(<Button title='Button' type={types.FILLED} size={sizes.NORMAL} icon={0} />)
    expect(shallowButton.type()).toBe(TouchableHighlight)
  })

  describe('when size button is small', () => {
    it('should render a TouchableHighlight', () => {
      const shallowButton = shallow(<Button title='Button' type={types.FILLED} size={sizes.SMALL} icon={0} />)
      expect(shallowButton.type()).toBe(TouchableHighlight)
    })
  })
})
