import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	View,
	StyleSheet,
	Image,
	Dimensions,
	KeyboardAvoidingView,
	Alert,
} from 'react-native';
import Container from '../../components/Container';
import { Heading2, Heading4, Description } from '../../components';
import { translate } from '../../components/Translate';
import Button from '../../components/Button';
import colors from '../../utils/colors';
import icons from '../../utils/icons';
import DatePicker from '../../components/DatePicker';
import Picker from '../../components/Picker';
import TopBar from '../../components/TopBar';
import { extractSetupParams } from '../../utils';
import { screen } from '../../utils/analytics';
import withUser, { shapeContextUser } from '../../components/withUser';
import moment from 'moment';

import debugFactory from 'debug';
const debugError = debugFactory('yester:BirthDate:error');
const debugInfo = debugFactory('yester:BirthDate:info');

class BirthDate extends Component {
	static propTypes = {
		navigation: PropTypes.object.isRequired,
		contextUser: PropTypes.shape(shapeContextUser).isRequired,
	};

	scroll = React.createRef();

	constructor(props) {
		super(props);
		const { navigation } = this.props;
		this.state = {
			...extractSetupParams(navigation),
			genders: [
				{ value: 'female', label: 'Female' },
				{ value: 'male', label: 'Male' },
			],
		};
	}

	onDidFocus = () => {
		const { navigation } = this.props;
		this.setState(extractSetupParams(navigation));
	};

	async componentDidMount() {
		const { navigation } = this.props;
		const { user } = this.props.contextUser;
		navigation.addListener('didFocus', this.onDidFocus);
		screen('BirthDate', {});
		this.setState({
			givenName: user.givenName,
		});
	}

	onContinue = () => {
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

		if (!birthDate) {
			return Alert.alert(translate('setup.age.birthdate.alert'));
		}
		if (!gender) {
			return Alert.alert(translate('setup.age.gender.alert'));
		}
		const momentBirth = moment(birthDate);
		const momentNow = moment();
		const ageYears = momentNow.diff(momentBirth, 'years');
		if (ageYears < 13) {
			return Alert.alert(translate('setup.age.birthdate.minor.alert'));
		}

		navigation.navigate('SetupPlace', {
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

	onChangeGender = (gender, index) => {
		const { genders } = this.state;
		index = index - 1;
		if (genders[index]) {
			this.setState({
				gender,
				genderName: genders[index].label,
			});
		}
	};

	onOpenModal = () => {
		this.setState({
			marginBottom: 100,
		});
		setTimeout(() => {
			this.scroll.current.scrollToEnd({ animated: true });
		}, 100);
	};

	onCloseModal = () => {
		this.setState({
			marginBottom: 0,
		});

		setTimeout(() => {
			this.scroll.current.scrollTo({ y: 0, animated: true });
		}, 100);
	};

	render() {
		const { givenName, birthDate, genders, gender, marginBottom } = this.state;
		const topBarTitle = (
			<View style={{ height: 110, paddingHorizontal: 30 }}>
				<View
					style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'flex-end',
					}}>
					<Heading2
						keyName='setup.age.greeting'
						data={{ givenName }}
						style={[{ color: colors.brightTurquoise }]}
					/>
				</View>
				<View
					style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'flex-start',
					}}>
					<Heading4
						keyName='setup.age.greeting.subtitle'
						style={[{ color: colors.white, textAlign: 'center' }]}
					/>
				</View>
			</View>
		);

		const topBar = <TopBar title={topBarTitle} />;
		return (
			<Container topBar={topBar} scroll scrollRef={this.scroll}>
				<KeyboardAvoidingView
					contentContainerStyle={{
						flex: 1,
						height: '100%',
						width: '100%',
						marginBottom,
					}}
					behavior='position'
					enabled>
					<View style={styles.container}>
						<View style={styles.topFlex}>
							<Image source={icons.childhood} style={styles.image} />
							<Heading4
								keyName='setup.age.question'
								style={styles.questionText}
							/>
						</View>

						<View style={styles.bottomFlex}>
							<DatePicker
								title='setup.age.birthdate'
								value={birthDate}
								onDateChange={(birthDate) => {
									this.setState({ birthDate });
								}}
								onCloseModal={this.onCloseModal}
								onOpenModal={this.onOpenModal}
							/>
							<Picker
								title='setup.age.form.gender'
								items={genders}
								value={gender}
								onOpen={this.onOpenModal}
								onClose={this.onCloseModal}
								onValueChange={this.onChangeGender}
								placeholder={{
									label: translate('setup.age.form.gender.placeholder'),
									value: null,
								}}
							/>
							<Button
								title='setup.continue'
								style={styles.button}
								onPress={this.onContinue}
							/>
							<Description
								keyName='setup.age.disclaimer'
								style={styles.disclaimerText}
							/>
						</View>
					</View>
				</KeyboardAvoidingView>
			</Container>
		);
	}
}

export default withUser(BirthDate);

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: colors.athensGray,
		paddingBottom: height * 0.03,
		paddingHorizontal: width * 0.08,
	},
	topFlex: {
		flex: 0.25,
		alignItems: 'center',
		paddingTop: height * 0.045,
		paddingBottom: height * 0.03,
	},
	bottomFlex: {
		flex: 0.75,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	image: {
		width: 60,
		height: 64.52,
		marginBottom: height * 0.03,
	},
	button: {
		marginTop: height * 0.03,
		marginBottom: height * 0.03,
	},
	questionText: {
		textAlign: 'center',
	},
	disclaimerText: {
		textAlign: 'center',
		paddingHorizontal: 17,
	},
});
