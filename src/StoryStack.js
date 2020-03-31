import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Stories from './screens/Home/Stories';

const Stack = createStackNavigator();

const StoryStack = () => {
	return (
		<Stack.Navigator mode='modal' headerMode='none' initialRouteName='Stories'>
			<Stack.Screen name='Stories' component={Stories} />
		</Stack.Navigator>
	);
};

export default StoryStack;
