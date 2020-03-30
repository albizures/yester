import React from 'react';
import { shallow } from 'enzyme';
import { Auth } from 'aws-amplify';
import { Button, Alert } from 'react-native';
import renderer from 'react-test-renderer';
import { LoginManager } from 'react-native-fbsdk';

import Login from '../Login';

Alert.alert = jest.fn();

const navigation = { navigate: jest.fn() };

beforeEach(() => {
	Alert.alert.mockClear();
});

describe.skip('src/screens/Login.js', () => {
	it('should render', () => {
		const tree = renderer.create(<Login navigation={navigation} />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	describe('when facebook button is pressed', () => {
		it('should login to cognito', async () => {
			const shallowLogin = shallow(<Login navigation={navigation} />);
			const shallowTouchableHighlights = shallowLogin.find(Button);
			const shallowButtonToHome = shallowTouchableHighlights.at(0);

			await shallowButtonToHome.prop('onPress')();

			expect(LoginManager.logInWithReadPermissions).toHaveBeenCalledTimes(1);
			expect(LoginManager.logInWithReadPermissions).toHaveBeenCalledWith([
				'email',
				'public_profile',
			]);
			expect(Auth.federatedSignIn).toHaveBeenCalledTimes(1);
			expect(Auth.federatedSignIn).toHaveBeenCalledWith(
				'facebook',
				expect.objectContaining({
					token: expect.any(String),
					expires_at: expect.any(Number),
				}),
				expect.any(Object),
			);
		});

		describe('when something fails', () => {
			it('should show an alert', async () => {
				const shallowLogin = shallow(<Login navigation={navigation} />);
				const shallowTouchableHighlights = shallowLogin.find(Button);
				const shallowButtonToHome = shallowTouchableHighlights.at(0);

				LoginManager.logInWithReadPermissions.mockRejectedValueOnce(
					new Error('some error'),
				);

				await shallowButtonToHome.prop('onPress')();
				expect(Alert.alert).toHaveBeenCalledTimes(1);
				expect(Alert.alert).toHaveBeenCalledWith('some error');
			});
		});

		describe('when the login is cancelled', () => {
			it('should show an alert', async () => {
				const shallowLogin = shallow(<Login navigation={navigation} />);
				const shallowTouchableHighlights = shallowLogin.find(Button);
				const shallowButtonToHome = shallowTouchableHighlights.at(0);

				LoginManager.logInWithReadPermissions.mockResolvedValue({
					isCancelled: true,
				});

				await shallowButtonToHome.prop('onPress')();
				expect(Alert.alert).toHaveBeenCalledTimes(1);
				expect(Alert.alert).toHaveBeenCalledWith('Login cancelled');
			});
		});
	});
});
