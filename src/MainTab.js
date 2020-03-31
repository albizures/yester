import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsStack from './SettingsStack';
import StoryStack from './StoryStack';
import FeedStack from './FeedStack';
import Profile from './screens/Profile';
import { tabBarIcon } from './components/TabIcon';

const Tab = createBottomTabNavigator();

const Main = () => {
	return (
		<Tab.Navigator
			animationEnabled={true}
			swipeEnabled={true}
			initialRouteName='Feed'
			headerMode='none'
			tabBarOptions={{
				activeTintColor: colors.white,
				inactiveTintColor: colors.moonRaker,
				style: {
					backgroundColor: colors.governorBay,
				},
				labelStyle: {
					fontWeight: 'bold',
					marginTop: 0,
				},
			}}>
			<Tab.Screen
				name='Feed'
				component={FeedStack}
				options={{
					tabBarLabel: translate('home.bottomBar.feed'),
					tabBarIcon: tabBarIcon({
						active: icons.bottombarWriteActive,
						inactive: icons.bottombarWriteInactive,
						iconSize: {
							width: 29,
							height: 19,
						},
					}),
				}}
			/>
			<Tab.Screen
				name='MyStory'
				component={StoryStack}
				options={{
					tabBarLabel: translate('home.bottomBar.myStory'),
					tabBarIcon: tabBarIcon({
						active: icons.bottombarReadActive,
						inactive: icons.bottombarReadInactive,
						iconSize: {
							width: 21,
							height: 18,
						},
					}),
				}}
			/>
			<Tab.Screen
				name='Profile'
				component={Profile}
				options={{
					tabBarLabel: translate('home.bottomBar.profile'),
					tabBarIcon: tabBarIcon({
						active: icons.bottombarProfileActive,
						inactive: icons.bottombarProfileInactive,
						iconSize: {
							width: 21,
							height: 20,
						},
					}),
				}}
			/>
			<Tab.Screen
				name='Settings'
				component={SettingsStack}
				options={{
					tabBarLabel: translate('home.bottomBar.settings'),
					tabBarIcon: tabBarIcon({
						active: icons.bottombarSettingsActive,
						inactive: icons.bottombarSettingsInactive,
						iconSize: {
							width: 23,
							height: 22,
						},
					}),
				}}
			/>
		</Tab.Navigator>
	);
};
