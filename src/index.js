import './base64Polyfill';
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StatusBar, View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Amplify, { Hub } from 'aws-amplify';
import SplashScreen from 'react-native-splash-screen';
import {
	AWS_REGION,
	AWS_IDENTITY_POOL_ID,
	AWS_USER_POOL_ID,
	AWS_USER_CLIENT_POOL_ID,
	COGNITO_DOMAIN,
	HOST,
	// REDIRECT_URI,
} from 'react-native-dotenv';
import { UserProvider } from './components/withUser';
import { AgesProvider } from './components/withAges';
import AppLoading from './screens/AppLoading';
import SetupStack from './SetupStack';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import {
	Storage,
	sanitizeUser,
	sanitizeStats,
	isAuthorized,
} from './utils/session';
import {
	initNotifications,
	addEventListener,
	removeEventListener,
} from './utils/notifications';
import { setupAnalytics } from './utils/analytics';
import debugFactory from 'debug';

const debugInfo = debugFactory('yester:index:info');

require('moment/locale/es.js');

const oauth = {
	domain: COGNITO_DOMAIN,
	scope: ['email', 'profile', 'openid'],
	// redirectSignIn: REDIRECT_URI,
	// redirectSignOut: REDIRECT_URI,
	responseType: 'token',
};

Amplify.configure({
	storage: Storage,
	Auth: {
		identityPoolId: AWS_IDENTITY_POOL_ID,
		region: AWS_REGION,
		userPoolId: AWS_USER_POOL_ID,
		userPoolWebClientId: AWS_USER_CLIENT_POOL_ID,
		mandatorySignIn: true,
	},
	oauth: oauth,
	API: {
		endpoints: [
			{
				name: 'MainAPI',
				endpoint: HOST,
			},
		],
	},
});

Hub.listen('auth', (data) => {
	debugInfo(data);
});

const Stack = createStackNavigator();

export default class App extends Component {
	state = {};
	async componentDidMount() {
		SplashScreen.hide();
		debugFactory.disable();
		// debugFactory.enable('yester:*');
		//debugFactory.enable('yester:Place*, yester:Picker*')
		// debugFactory.enable('yester:Writing*')

		initNotifications();
		addEventListener('received', this.onReceived);
		addEventListener('opened', this.onOpened);
		addEventListener('ids', this.onIds);

		setupAnalytics();
	}

	componentWillUnmount() {
		removeEventListener('received', this.onReceived);
		removeEventListener('opened', this.onOpened);
		removeEventListener('ids', this.onIds);
	}

	onReceived(notification) {
		debugInfo('Notification received: ', notification);
	}

	onOpened(openResult) {
		debugInfo('Message: ', openResult.notification.payload.body);
		debugInfo('Data: ', openResult.notification.payload.additionalData);
		debugInfo('isActive: ', openResult.notification.isAppInFocus);
		debugInfo('openResult: ', openResult);
	}

	onIds(device) {
		debugInfo('Listener ids device: ', device);
	}

	updateUser = async () => {
		debugInfo('Updating context user');
		const user = await sanitizeUser();
		this.setState({ user });
	};

	updateStats = async () => {
		debugInfo('Updating context stats');
		const stats = await sanitizeStats();
		this.setState({ stats });
	};

	updateAuthorization = async () => {
		debugInfo('Updating context currentStatus');
		const { user, stats } = this.state;
		const currentStatus = await isAuthorized(user, stats);
		this.setState({ currentStatus });
		return currentStatus;
	};

	updateAges = (ages) => {
		debugInfo('Updating ages', ages);
		this.setState({
			ages: ages.reduce(
				(agesObj, age) => ({
					...agesObj,
					[age.id]: age,
				}),
				{},
			),
			agesList: ages,
		});
	};

	render() {
		const { user, stats, currentStatus, ages, agesList } = this.state;
		const userContextValue = {
			updateUser: this.updateUser,
			updateStats: this.updateStats,
			updateAuthorization: this.updateAuthorization,
			user,
			stats,
			currentStatus,
		};
		const agesContextValue = {
			updateAges: this.updateAges,
			ages,
			agesList,
		};

		const statusBarStyle =
			Platform.OS === 'ios' ? 'light-content' : 'dark-content';

		return (
			<NavigationContainer>
				<AgesProvider value={agesContextValue}>
					<UserProvider value={userContextValue}>
						<View style={{ flex: 1 }}>
							<StatusBar barStyle={statusBarStyle} />
							<Stack.Navigator headerMode='none' initialRouteName='AppLoading'>
								<Stack.Screen name='App' component={AppStack} />
								<Stack.Screen name='Auth' component={AuthStack} />
								<Stack.Screen name='AppLoading' component={AppLoading} />
								<Stack.Screen name='Setup' component={SetupStack} />
							</Stack.Navigator>
						</View>
					</UserProvider>
				</AgesProvider>
			</NavigationContainer>
		);
	}
}
