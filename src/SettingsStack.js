import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from './screens/Settings';
import Language from './screens/Language';
import Notifications from './screens/Notifications';
import Terms from './screens/Terms';
import About from './screens/About';

const Stack = createStackNavigator();

const SettingsStack = () => {
	return (
		<Stack.Navigator
			mode='modal'
			headerMode='none'
			initialRouteName='SettingsHome'>
			<Stack.Screen name='SettingsHome' component={Settings} />
			<Stack.Screen name='Language' component={Language} />
			<Stack.Screen name='Notifications' component={Notifications} />
			<Stack.Screen name='Terms' component={Terms} />
			<Stack.Screen name='About' component={About} />
		</Stack.Navigator>
	);
};

export default SettingsStack;
