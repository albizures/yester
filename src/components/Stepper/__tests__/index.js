import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import Stepper from '../'
const Step = () => (
  <div>step</div>
)

const children = [
  () => <Step />,
  () => <Step />,
  () => <Step />,
]

const render = () => (
  <Stepper>
    {children}
  </Stepper>
)

describe.only('src/screens/Stepper', () => {
  it('should render', () => {
    const tree = renderer.create(render()).toJSON()
    expect(tree).toMatchSnapshot()
  })

  describe('when next is executed', () => {
    it('should scroll to the next step', () => {
      const shallowStepper = shallow(render())
      const instance = shallowStepper.instance()

      instance.flatList.current = {
        scrollToIndex: jest.fn(),
      }

      instance.next()

      expect(instance.flatList.current.scrollToIndex).toHaveBeenCalledTimes(1)
      expect(instance.flatList.current.scrollToIndex).toHaveBeenCalledWith({
        animated: true,
        index: 1,
      })
    })
  })

  describe('when skip is executed', () => {
    it('should scroll to last step', () => {
      const shallowStepper = shallow(render())
      const instance = shallowStepper.instance()

      instance.flatList.current = {
        scrollToIndex: jest.fn(),
      }

      instance.skip()

      expect(instance.flatList.current.scrollToIndex).toHaveBeenCalledTimes(1)
      expect(instance.flatList.current.scrollToIndex).toHaveBeenCalledWith({
        animated: false,
        index: children.length - 1,
      })
    })
  })
  describe('when onSwipePageChange is executed', () => {
    it('should update the state', () => {
      const shallowStepper = shallow(render())
      const instance = shallowStepper.instance()

      expect(shallowStepper.state('currentStep')).toBe(0)
      expect(shallowStepper.state('previousStep')).toBe(null)

      instance.onSwipePageChange({
        viewableItems: [
          {index: 1},
        ],
      })

      expect(shallowStepper.state('currentStep')).toBe(1)
      expect(shallowStepper.state('previousStep')).toBe(0)
    })

    describe('when there is no viewable items', () => {
      it('should not change the state', () => {
        const shallowStepper = shallow(render())
        const instance = shallowStepper.instance()

        expect(shallowStepper.state('currentStep')).toBe(0)
        expect(shallowStepper.state('previousStep')).toBe(null)

        instance.onSwipePageChange({
          viewableItems: [],
        })

        expect(shallowStepper.state('currentStep')).toBe(0)
        expect(shallowStepper.state('previousStep')).toBe(null)
      })
    })

    describe('when the viewable items are the same', () => {
      it('should not change the state', () => {
        const shallowStepper = shallow(render())
        const instance = shallowStepper.instance()

        expect(shallowStepper.state('currentStep')).toBe(0)
        expect(shallowStepper.state('previousStep')).toBe(null)

        instance.onSwipePageChange({
          viewableItems: [
            {index: 0},
          ],
        })

        expect(shallowStepper.state('currentStep')).toBe(0)
        expect(shallowStepper.state('previousStep')).toBe(null)
      })
    })
  })
})
