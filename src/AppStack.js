import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainTab from './MainTab';
import Writing from './screens/Writing';
import Reading from './screens/Reading';

const Stack = createStackNavigator();

const AppStack = () => {
	return (
		<Stack.Navigator mode='modal' headerMode='none' initialRouteName='MainTab'>
			<Stack.Screen name='MainTab' component={MainTab} />
			<Stack.Screen name='Writing' component={Writing} />
			<Stack.Screen name='Reading' component={Reading} />
		</Stack.Navigator>
	);
};

export default AppStack;
