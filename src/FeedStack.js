import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import ModalCard from './screens/Home/ModalCard';

const Stack = createStackNavigator();

const SettingsStack = () => {
	return (
		<Stack.Navigator mode='modal' headerMode='none' initialRouteName='Home'>
			<Stack.Screen name='Home' component={Home} />
			<Stack.Screen name='ModalCard' component={ModalCard} />
		</Stack.Navigator>
	);
};

export default SettingsStack;
