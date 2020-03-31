import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SetupBirthDate from './screens/Setup/BirthDate';
import SetupPlace from './screens/Setup/Place';
import SetupConfirmation from './screens/Setup/Confirmation';

const Stack = createStackNavigator();

const SetupStack = () => {
	return (
		<Stack.Navigator headerMode='none' initialRouteName='SetupBirthDate'>
			<Stack.Screen name='SetupBirthDate' component={SetupBirthDate} />
			<Stack.Screen name='SetupPlace' component={SetupPlace} />
			<Stack.Screen name='SetupConfirmation' component={SetupConfirmation} />
		</Stack.Navigator>
	);
};

export default SetupStack;
