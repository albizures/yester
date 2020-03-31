import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Onboarding from './screens/Onboarding';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import ForgotPassword from './screens/ForgotPassword';
import NewPassword from './screens/ForgotPassword/NewPassword';
import RecoverCode from './screens/ForgotPassword/RecoverCode';
import CreateAccount from './screens/CreateAccount';
import Subscription from './screens/Subscription';
import ConfirmAccount from './screens/ConfirmAccount';

const Stack = createStackNavigator();

const AuthStack = () => {
	return (
		<Stack.Navigator
			mode='modal'
			headerMode='none'
			initialRouteName='Onboarding'>
			<Stack.Screen name='Onboarding' component={Onboarding} />
			<Stack.Screen name='Login' component={Login} />
			<Stack.Screen name='SignUp' component={SignUp} />
			<Stack.Screen name='ForgotPassword' component={ForgotPassword} />
			<Stack.Screen name='NewPassword' component={NewPassword} />
			<Stack.Screen name='RecoverCode' component={RecoverCode} />
			<Stack.Screen name='CreateAccount' component={CreateAccount} />
			<Stack.Screen name='Subscription' component={Subscription} />
			<Stack.Screen name='ConfirmAccount' component={ConfirmAccount} />
		</Stack.Navigator>
	);
};

export default AuthStack;
