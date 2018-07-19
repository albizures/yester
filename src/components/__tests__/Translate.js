import React from 'react'
import { shallow } from 'enzyme'
import { Text } from 'react-native'

import en from '../../translations/en.json'
import Translate from '../Translate'

const keyName = 'hello'

describe('src/components/Translate.js', () => {
  it('should render a Text', () => {
    const shallowTranslate = shallow(<Translate keyName={keyName} />)
    expect(shallowTranslate.type()).toBe(Text)
  })
  it('should render the translated text', () => {
    const shallowTranslate = shallow(<Translate keyName={keyName} />)
    expect(shallowTranslate.prop('children')).toBe(en[keyName])
  })
})
