import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Alert, StyleSheet, Dimensions, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Auth } from 'aws-amplify';
import Container from '../components/Container';
import Button from '../components/Button';
import { Heading2, Heading4 } from '../components';
import TopBar from '../components/TopBar';
import TextInput from '../components/TextInput';
import colors from '../utils/colors';
import { translate } from '../components/Translate';
import { logIn, postAPIUser } from '../utils/session';
import DeviceInfo from 'react-native-device-info';
import debugFactory from 'debug';

const debugError = debugFactory('yester:SignUp:error');
const debugInfo = debugFactory('yester:SignUp:info');

export default class SignUp extends Component {
	static propTypes = {
		navigation: PropTypes.object.isRequired,
	};

	state = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		isLoading: false,
	};

	onPress = async () => {
		const { navigation, currentUser } = this.props;
		const { firstName, lastName, email, password } = this.state;

		this.setState({ isLoading: true });

		try {
			await Auth.signUp({
				username: email,
				password,
				attributes: {
					given_name: firstName,
					family_name: lastName,
				},
			});
			await logIn(email, password);

			// TODO Find the best way to allow manual name update.
			const build = DeviceInfo.getBuildNumber();
			const version = DeviceInfo.getVersion();
			await postAPIUser({
				given_name: currentUser.attributes['given_name'],
				family_name: currentUser.attributes['family_name'],
				platform: Platform.OS,
				build,
				version,
				email_verified: false,
			});

			return navigation.navigate('ConfirmAccount', {
				email,
				signUpVerify: true,
			});
		} catch (error) {
			this.setState({ isLoading: false });
			debugError(error);
			if (error.code === 'UsernameExistsException') {
				Alert.alert(translate('signup.usernameExistsException'));
			} else Alert.alert(translate('signup.error'));
		}
	};

	onChange = (value, name) => {
		this.setState({
			[name]: value,
		});
	};

	onBack = () => {
		const { navigation } = this.props;
		navigation.navigate('CreateAccount');
	};

	render() {
		const { firstName, lastName, email, password, isLoading } = this.state;
		const topBar = <TopBar title='signup.topbar' onBack={this.onBack} />;
		return (
			<Container isLoading={isLoading} scroll topBar={topBar}>
				<KeyboardAwareScrollView
					enableAutomaticScroll
					resetScrollToCoords={{ x: 0, y: 0 }}
					enableOnAndroid>
					<View style={styles.topFlex}>
						<Heading2 keyName='signup.title' style={styles.titleText} />
						<Heading4 keyName='signup.subtitle' style={styles.subtitleText} />
					</View>

					<View style={styles.bottomFlex}>
						<TextInput
							title='signup.firstName'
							value={firstName}
							onChangeText={(text) => this.onChange(text, 'firstName')}
							setRef={(ref) => (this.firstNameInput = ref)}
							onSubmitEditing={() => this.lastNameInput.focus()}
							blurOnSubmit={false}
						/>
						<TextInput
							title='signup.lastName'
							value={lastName}
							onChangeText={(text) => this.onChange(text, 'lastName')}
							setRef={(ref) => (this.lastNameInput = ref)}
							onSubmitEditing={() => this.emailInput.focus()}
							blurOnSubmit={false}
						/>
						<TextInput
							title='signup.email'
							autoCapitalize='none'
							keyboardType='email-address'
							value={email}
							onChangeText={(text) =>
								this.onChange(text.toLowerCase(), 'email')
							}
							description='signup.emailDescription'
							setRef={(ref) => (this.emailInput = ref)}
							onSubmitEditing={() => this.passwordInput.focus()}
							blurOnSubmit={false}
						/>
						<TextInput
							title='signup.password'
							password
							value={password}
							onChangeText={(text) => this.onChange(text, 'password')}
							description='signup.passwordDescription'
							setRef={(ref) => (this.passwordInput = ref)}
							onSubmitEditing={this.onPress}
						/>
						<Button title='signup.submit' onPress={this.onPress} />
					</View>
				</KeyboardAwareScrollView>
			</Container>
		);
	}
}

const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
	topFlex: {
		justifyContent: 'flex-start',
		paddingTop: height * 0.045,
		marginBottom: height * 0.045,
	},
	bottomFlex: {
		alignItems: 'center',
	},
	titleText: {
		textAlign: 'center',
		color: colors.governorBay,
	},
	subtitleText: {
		textAlign: 'center',
	},
});
