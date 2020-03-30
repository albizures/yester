import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, StyleSheet, Dimensions, Platform } from 'react-native';
import Container from '../../components/Container';
import { Heading2, Heading4, Body2 } from '../../components';
import Button from '../../components/Button';
import { saveUserData } from '../../utils/session';
import colors from '../../utils/colors';
import { extractSetupParams } from '../../utils';
import icons from '../../utils/icons';
import withUser, { shapeContextUser } from '../../components/withUser';
import { setNotificationsStatus } from '../../utils/notifications';
import { screen } from '../../utils/analytics';
import debugFactory from 'debug';

const debugError = debugFactory('yester:Confirmation:error');
const debugInfo = debugFactory('yester:Confirmation:info');

class Confirmation extends Component {
	static propTypes = {
		navigation: PropTypes.object.isRequired,
		contextUser: PropTypes.shape(shapeContextUser).isRequired,
	};

	state = {
		conditionalText: {
			[false]: {
				title: 'setup.confirmation.title',
				subtitle: 'setup.confirmation.subtitle',
				continue: 'setup.confirmation.continue',
			},
			[true]: {
				title: 'setup.confirmation.title.update',
				subtitle: 'setup.confirmation.subtitle.update',
				continue: 'setup.confirmation.continue.update',
			},
		},
	};

	constructor(props) {
		super(props);
		const { navigation } = this.props;
		const { conditionalText } = this.state;

		this.state = {
			conditionalText,
			...extractSetupParams(navigation),
			isLoading: false,
		};
	}

	componentDidMount() {
		screen('Confirmation', {});
	}

	onContinue = async () => {
		const {
			navigation,
			contextUser: { updateUser, user },
		} = this.props;
		const { birthDate, country, state, gender, birthPlace } = this.state;
		this.setState({ isLoading: true });
		await saveUserData({
			birthDate,
			country,
			state,
			gender,
			birthPlace,
			platform: Platform.OS,
		});

		await setNotificationsStatus(user);
		await updateUser();
		navigation.navigate('AppLoading');
	};

	onEdit = () => {
		const { navigation } = this.props;
		const {
			birthDate,
			country,
			state,
			countryName,
			stateName,
			givenName,
			gender,
			birthPlace,
			updateSetup,
		} = this.state;
		navigation.navigate('SetupBirthDate', {
			birthDate,
			country,
			state,
			countryName,
			stateName,
			givenName,
			gender,
			birthPlace,
			updateSetup,
		});
	};

	render() {
		const {
			isLoading,
			givenName,
			stateName,
			conditionalText,
			updateSetup,
		} = this.state;
		debugInfo(conditionalText, updateSetup);
		const text = conditionalText[updateSetup];

		return (
			<Container isLoading={isLoading} style={styles.container}>
				<Image source={icons.confirmation} style={styles.image} />

				<View style={styles.topFlex}>
					<Heading2
						keyName={text.title}
						data={{ state: stateName, givenName }}
						style={styles.titleText}
					/>

					<Heading4 keyName={text.subtitle} style={styles.subtitleText} />
				</View>

				<View style={styles.bottomFlex}>
					<Body2
						keyName='setup.confirmation.edit'
						style={styles.editText}
						onPress={this.onEdit}
					/>

					<Button
						title={text.continue}
						onPress={this.onContinue}
						type={Button.OUTLINED}
					/>
				</View>
			</Container>
		);
	}
}

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingBottom: height * 0.08,
		backgroundColor: colors.haiti,
	},
	topFlex: {
		flex: 2,
		alignItems: 'center',
		justifyContent: 'flex-start',
		marginTop: height * 0.23,
	},
	bottomFlex: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	image: {
		position: 'absolute',
		width,
		height,
	},
	titleText: {
		color: colors.white,
		textAlign: 'center',
	},
	subtitleText: {
		color: colors.white,
		textAlign: 'center',
		marginTop: 12,
	},
	editText: {
		color: colors.white,
		textAlign: 'center',
		textDecorationLine: 'underline',
		marginBottom: height * 0.06,
	},
});

export default withUser(Confirmation);
