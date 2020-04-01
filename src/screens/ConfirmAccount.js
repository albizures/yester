import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	View,
	Alert,
	StyleSheet,
	Image,
	KeyboardAvoidingView,
	Dimensions,
	TouchableOpacity,
} from 'react-native';
import { Auth } from 'aws-amplify';
import {
	Body1,
	Heading2,
	Heading3,
	Heading4,
	Description,
} from '../components';
import Container from '../components/Container';
import TopBar from '../components/TopBar';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { updateUserAttribute } from '../utils/session';
import colors from '../utils/colors';
import icons from '../utils/icons';
import debugFactory from 'debug';

const debugError = debugFactory('yester:ConfirmAccount:error');
const debugInfo = debugFactory('yester:ConfirmAccount:info');

export default class ConfirmAccount extends Component {
	static propTypes = {
		navigation: PropTypes.object.isRequired,
	};

	state = {
		conditionalText: {
			[true]: {
				title: 'confirm.title',
				subtitle: 'confirm.subtitle',
				submit: 'confirm.submit',
			},
			[false]: {
				title: 'confirm.title.profile',
				subtitle: 'confirm.subtitle.profile',
				submit: 'confirm.submit.profile',
			},
		},
	};

	constructor(props) {
		super(props);
		const { route } = props;
		const { conditionalText } = this.state;

		this.state = {
			conditionalText,
			code: '',
			email: route.params.email,
			number: route.params.number,
			signUpVerify: route.params.signUpVerify,
			isLoading: false,
		};
	}

	async componentDidMount() {
		const currentUser = await Auth.currentAuthenticatedUser();
		debugInfo(currentUser);
		if (currentUser.attributes && !currentUser.attributes['email_verified']) {
			Auth.verifyCurrentUserAttribute('email');
		}
	}

	onChange = (value, name) => {
		this.setState({
			[name]: value,
		});
	};

	onPressContinue = async () => {
		const { navigation } = this.props;
		const { code, signUpVerify } = this.state;
		this.setState({ isLoading: true });

		try {
			await Auth.verifyCurrentUserAttributeSubmit('email', code);
			await updateUserAttribute('email_verified', true);

			if (signUpVerify) return navigation.navigate('AppLoading');
			return navigation.navigate('AppLoading', {
				lastScreen: 'Profile',
			});
		} catch (error) {
			this.setState({ isLoading: false });
			debugError('ConfirmAccount', error);
			Alert.alert(error.message || error);
		}
	};

	onPressSkip = async () => {
		const { navigation } = this.props;
		this.setState({ isLoading: true });
		return navigation.navigate('AppLoading');
	};

	onPressResend() {
		Auth.verifyCurrentUserAttribute('email');
	}

	onBack = () => {
		this.props.navigation.navigate('Profile');
	};

	render() {
		const {
			code,
			email,
			number,
			signUpVerify,
			isLoading,
			conditionalText,
		} = this.state;
		const text = conditionalText[signUpVerify];

		const skipElement = (
			<TouchableOpacity>
				<Description
					keyName='confirm.skip'
					style={styles.skipLabel}
					onPress={this.onPressSkip}
				/>
			</TouchableOpacity>
		);

		const topBar = (
			<TopBar
				title='confirm.topbar'
				onBack={!signUpVerify ? this.onBack : null}
			/>
		);

		return (
			<Container isLoading={isLoading} topBar={topBar}>
				<KeyboardAvoidingView enabled behavior='position'>
					<View style={styles.container}>
						<View style={styles.topFlex}>
							<Image source={icons.feather} style={styles.image} />
							<Heading2 keyName={text.title} style={styles.titleText} />
							<Heading4 keyName={text.subtitle} style={styles.subtitleText} />
							<Heading4 keyName='confirm.label' />
							<Heading3
								text='{contact}'
								data={{ contact: email || number }}
								style={styles.contactText}
							/>
							<Heading4 keyName='confirm.note' style={styles.noteText} />
						</View>

						<View style={styles.bottomFlex}>
							<TextInput
								title='confirm.inputLabel'
								keyboardType='numeric'
								value={code}
								onChangeText={(text) => this.onChange(text, 'code')}
							/>
							<TouchableOpacity>
								<Body1
									keyName='confirm.resendCode'
									style={styles.resendText}
									onPress={this.onPressResend}
								/>
							</TouchableOpacity>
							<Button title={text.submit} onPress={this.onPressContinue} />
							{signUpVerify ? skipElement : null}
						</View>
					</View>
				</KeyboardAvoidingView>
			</Container>
		);
	}
}

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
	container: {
		width,
		height,
		backgroundColor: colors.athensGray,
		paddingHorizontal: width * 0.08,
	},
	topFlex: {
		flex: 0.5,
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingTop: height * 0.04,
		// marginBottom: height * 0.04,
	},
	bottomFlex: {
		flex: 0.5,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	image: {
		width: 79,
		height: 92,
		marginBottom: height * 0.03,
	},
	titleText: {
		textAlign: 'center',
		color: colors.governorBay,
	},
	subtitleText: {
		textAlign: 'center',
		marginBottom: height * 0.04,
	},
	contactText: {
		textAlign: 'center',
		marginBottom: height * 0.04,
	},
	noteText: {
		textAlign: 'center',
	},
	resendText: {
		alignSelf: 'flex-start',
		color: colors.governorBay,
		textAlign: 'left',
		marginTop: height * -0.01,
		marginBottom: height * 0.03,
		paddingLeft: 8,
	},
	skipLabel: {
		fontWeight: 'bold',
		textDecorationLine: 'underline',
		marginTop: height * 0.04,
	},
});
