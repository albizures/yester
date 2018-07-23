import React from 'react'
import PropTypes from 'prop-types'
import { shallow } from 'enzyme'

import ConditionalWrapper from '../ConditionalWrapper'

const Wrapper = ({children}) => (
  <div>{children}</div>
)

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
}

const Children = () => (
  <div>test</div>
)

const render = (props) => shallow(
  <ConditionalWrapper component={Wrapper} {...props}>
    <Children />
  </ConditionalWrapper>
)

describe('src/components/ConditionalWrapper.js', () => {
  describe('when the condition is true', () => {
    it('should wrap the children', () => {
      const shallowTranslate = render({ condition: true })
      expect(shallowTranslate.type()).toBe(Wrapper)
    })
  })
  describe('when the condition is false', () => {
    it('should not wrap the children', () => {
      const shallowTranslate = render({ condition: false })
      expect(shallowTranslate.type()).toBe(Children)
    })
  })

  it('should pass the props to the wrapper', () => {
    const props = {
      test: 1,
    }
    const shallowTranslate = render({ condition: true, props })
    expect(shallowTranslate.prop('test')).toEqual(props.test)
  })
})
