import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { Container } from '../../components/Container'

import Profile from '../Profile'

const navigation = { navigate: jest.fn() }

describe('src/screens/Profile.js', () => {
  it('should render', () => {
    const tree = renderer.create(<Profile navigation={navigation} />).toJSON()
    expect(tree).toMatchSnapshot()

    const shallowHome = shallow(<Profile navigation={navigation} />)
    expect(shallowHome.type).toBe(Container)
  })
})
