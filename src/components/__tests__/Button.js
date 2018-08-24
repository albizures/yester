import React from 'react'
import { shallow } from 'enzyme'
import { TouchableHighlight } from 'react-native'

import Button from '../Button'

describe('src/components/Button.js', () => {
  it('should render a TouchableHighlight', () => {
    const shallowButton = shallow(<Button title='Button' type={'filled'} size={'normal'} icon={0} />)
    expect(shallowButton.type()).toBe(TouchableHighlight)
  })

  describe('when size button is small', () => {
    it('should render a TouchableHighlight', () => {
      const shallowButton = shallow(<Button title='Button' type={'filled'} size={'small'} icon={0} />)
      expect(shallowButton.type()).toBe(TouchableHighlight)
    })
  })
})
