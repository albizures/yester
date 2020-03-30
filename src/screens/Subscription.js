import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Image,
	Dimensions,
	Text,
	Linking,
	Platform,
	Alert,
	TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';
import colors from '../utils/colors';
import icons from '../utils/icons';
import Container from '../components/Container';
import {
	Title,
	Description,
	Heading1,
	Heading5,
	Heading3,
	Heading4,
	Body1,
} from '../components';
import { translate } from '../components/Translate';
import Button, { types } from '../components/Button';
import Divider from '../components/Divider';
import {
	logOut,
	subscriptionStatus,
	saveUserSubscriptionStatus,
} from '../utils/session';
import {
	getEntitlements,
	makePurchase,
	restoreTransactions,
} from '../utils/purchases';
import { screen, track } from '../utils/analytics';
import _ from 'lodash';
import debugFactory from 'debug';

const debugError = debugFactory('yester:Subscription:error');
const debugInfo = debugFactory('yester:Subscription:info');

class Subscription extends Component {
	static propTypes = {
		navigation: PropTypes.object.isRequired,
	};

	state = {
		entitlements: [],
		conditionalText: {
			[subscriptionStatus.ODD_REQUIRE.code]: {
				title: 'subscription.title',
				subtitle: 'subscription.subtitle',
				priceDetails: 'subscription.priceDetails',
			},
			[subscriptionStatus.EVEN_REQUIRE.code]: {
				title: 'subscription.even.title',
				subtitle: 'subscription.even.subtitle',
				priceDetails: 'subscription.even.priceDetails',
			},
			[subscriptionStatus.PREVIEW.code]: {
				title: 'subscription.even.title',
				subtitle: 'subscription.even.subtitle',
				priceDetails: 'subscription.even.priceDetails',
			},
			[subscriptionStatus.EXPIRED.code]: {
				title: 'subscription.expired.title',
				subtitle: 'subscription.expired.subtitle',
				priceDetails: 'subscription.expired.priceDetails',
			},
		},
		currentStatus: subscriptionStatus.ODD_REQUIRE,
	};

	async componentDidMount() {
		const { navigation } = this.props;
		const currentStatus = navigation.getParam('currentStatus');
		debugInfo('currentStatus', currentStatus);
		this.setState({ currentStatus });
		screen('Subscription', {});
		try {
			const entitlements = await getEntitlements();
			this.setState({ entitlements });
		} catch (err) {
			debugError('getEntitlements', err);
		}
	}

	onLogOut = async () => {
		const { navigation } = this.props;
		const { currentStatus } = this.state;

		if (currentStatus === subscriptionStatus.ODD_REQUIRE) {
			await logOut();
			return navigation.navigate('CreateAccount');
		}

		navigation.navigate('Home');
	};

	onContinue = async () => {
		const { navigation } = this.props;
		const { entitlements } = this.state;
		try {
			const purchaserInfo = await makePurchase(
				entitlements.pro.monthly.identifier,
			);
			debugInfo('Make purchase purchaserInfo:', purchaserInfo);
			const {
				entitlements: { active },
			} = purchaserInfo;

			if (_.isEmpty(active.pro)) {
				return Alert.alert(
					'Hey!',
					translate('subscription.onContinue.alert.notActive'),
				);
			}

			track('Trial Started', {
				item: entitlements.pro.monthly.identifier,
				revenue: 0.0,
			});

			await saveUserSubscriptionStatus(subscriptionStatus.PRO, purchaserInfo);

			navigation.navigate('AppLoading');
		} catch (err) {
			if (err.userCancelled) {
				return Alert.alert(
					'Hey!',
					translate('subscription.onContinue.alert.userCancelled'),
				);
			}
			if (err.code === '6') {
				return Alert.alert(
					'Hey!',
					translate('subscription.onContinue.alert.alreadySubscribed'),
				);
			}
			Alert.alert('Hey!', translate('subscription.onContinue.alert.error'));
		}
	};

	onRestore = async () => {
		const { navigation } = this.props;
		try {
			const purchaserInfo = await restoreTransactions();
			const {
				entitlements: { active },
			} = purchaserInfo;
			debugInfo('Restore subscription purchaserInfo: ', purchaserInfo);

			if (_.isEmpty(active.pro)) {
				return Alert.alert(
					'Hey!',
					translate('subscription.onRestore.alert.notActive'),
				);
			}

			track('Susbcription Restore', {
				item: 'pro',
				revenue: 4.99,
			});

			Alert.alert('Hey!', translate('subscription.onRestore.alert.restored'));
			navigation.navigate('AppLoading');
		} catch (err) {
			Alert.alert('Hey!', translate('subscription.onRestore.alert.error'));
		}
	};

	onPressTerms = () => {
		// this.props.navigation.navigate('Terms')
		Linking.openURL('https://www.yester.app/terms');
	};

	onPressPrivacy = () => {
		// this.props.navigation.navigate('About')
		Linking.openURL('https://www.yester.app/privacy');
	};

	render() {
		const terms =
			Platform.OS === 'ios'
				? 'subscription.terms.ios'
				: 'subscription.terms.android';
		const { entitlements, conditionalText, currentStatus } = this.state;
		const text = conditionalText[currentStatus.code];

		return (
			<View style={{ position: 'relative' }}>
				<Image source={icons.subscription} style={styles.image} />
				<Container scroll style={styles.container}>
					<View style={styles.topFlex}>
						<Title
							keyName='subscription.close'
							style={styles.closeText}
							onPress={this.onLogOut}
						/>
						<Heading1 keyName={text.title} style={styles.titleText} />
						<Heading5
							keyName={text.subtitle}
							data={{ price: translate('subscription.price') }}
							style={styles.subtitleText}
						/>
						{
							// <Image source={icons.ballon} style={styles.ballonImage} />
						}
						<Heading3 keyName='subscription.slogan' style={styles.sloganText} />
						<Heading4
							keyName='subscription.features'
							style={styles.featuresText}
						/>

						<Button
							title='subscription.action'
							onPress={this.onContinue}
							type={types.OUTLINED}
							disabled={entitlements.length === 0}
						/>
						<Body1
							keyName={text.priceDetails}
							data={{ price: translate('subscription.price') }}
							style={styles.priceDetailsText}
						/>
						<TouchableHighlight>
							<Body1
								keyName='subscription.restore'
								style={styles.restoreText}
								onPress={this.onRestore}
							/>
						</TouchableHighlight>
					</View>

					<View style={styles.bottomFlex}>
						<Divider style={styles.divider} />

						<Description
							keyName='subscription.termsTitle'
							style={styles.termsTitleText}
						/>
						<Text style={{ paddingBottom: 40 }}>
							<Description keyName={terms} style={styles.termsText} />
							<Description
								keyName='subscription.termsLink'
								style={styles.termsLink}
								onPress={this.onPressTerms}
							/>
							<Description
								keyName='subscription.termsAnd'
								style={styles.termsText}
							/>
							<Description
								keyName='subscription.privacyLink'
								style={styles.termsLink}
								onPress={this.onPressPrivacy}
							/>
						</Text>
					</View>
				</Container>
			</View>
		);
	}
}

const color = colors.white;
const textAlign = 'center';
const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		width,
		height,
		zIndex: 1,
		backgroundColor: 'transparent',
	},
	topFlex: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingTop: height * 0.07,
		paddingHorizontal: width * 0.08,
		paddingBottom: height * 0.04,
	},
	bottomFlex: {
		flex: 1,
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		paddingHorizontal: width * 0.08,
	},
	image: {
		position: 'absolute',
		zIndex: 0,
		width,
		height,
	},
	closeText: {
		color,
		alignSelf: 'flex-end',
		fontWeight: 'bold',
		marginBottom: height * 0.03,
	},
	titleText: {
		color,
		textAlign,
		marginBottom: height * 0.01,
	},
	subtitleText: {
		color,
		fontWeight: 'bold',
		textAlign,
		marginBottom: height * 0.07,
	},
	ballonImage: {
		width: 78,
		height: 98.88,
		marginBottom: height * 0.04,
	},
	sloganText: {
		color,
		textAlign,
		fontWeight: 'bold',
		marginBottom: height * 0.02,
	},
	featuresText: {
		color,
		textAlign,
		marginBottom: height * 0.05,
	},
	priceDetailsText: {
		color,
		textAlign,
		marginTop: height * 0.01,
	},
	restoreText: {
		color,
		textAlign,
		textDecorationLine: 'underline',
		marginTop: height * 0.04,
	},
	termsTitleText: {
		textAlign: 'left',
		fontWeight: 'bold',
		color: colors.athensGray,
		marginBottom: height * 0.01,
	},
	termsText: {
		color: colors.athensGray,
	},
	termsLink: {
		color,
		fontWeight: 'bold',
		textDecorationLine: 'underline',
	},
	divider: {
		width: 300,
		alignSelf: 'center',
		backgroundColor: colors.royalBlue,
		marginBottom: 15,
	},
});

export default Subscription;
