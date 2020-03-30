import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Button from '../../components/Button';

import CreateAccount from '../CreateAccount';
const navigation = {
	navigate: jest.fn(),
};

describe.skip('src/screens/CreateAccount.js', () => {
	it('should render', () => {
		const tree = renderer
			.create(<CreateAccount navigation={navigation} />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});

	describe('when button to continue with FB is pressed', () => {
		it('should navigate to Facebook screen', () => {
			const shallowCreateAccount = shallow(
				<CreateAccount navigation={navigation} />,
			);
			const shallowTouchableHighlights = shallowCreateAccount.find(Button);
			const shallowButtonToFacebook = shallowTouchableHighlights.at(0);
			shallowButtonToFacebook.prop('onPress')();

			// expect(navigation.navigate).toHaveBeenCalledTimes(1)
			expect(navigation.navigate).toHaveBeenCalledWith('Facebook');
		});
	});

	describe('when button Create Account is pressed', () => {
		it('should navigate to Setuo screen', () => {
			const shallowCreateAccount = shallow(
				<CreateAccount navigation={navigation} />,
			);
			const shallowTouchableHighlights = shallowCreateAccount.find(Button);
			const shallowButtonToSignIn = shallowTouchableHighlights.at(1);

			shallowButtonToSignIn.prop('onPress')();

			// expect(navigation.navigate).toHaveBeenCalledTimes(2)
			expect(navigation.navigate).toHaveBeenCalledWith('Setup');
		});
	});
});
