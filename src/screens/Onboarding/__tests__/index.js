import React from 'react';
import renderer from 'react-test-renderer';

import Onboarding from '../';
const navigation = {
	navigate: jest.fn(),
};

describe('src/screens/Onboarding', () => {
	it('should render', () => {
		const tree = renderer
			.create(<Onboarding navigation={navigation} />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
