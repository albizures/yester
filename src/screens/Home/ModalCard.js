import React from 'react';
import PropTypes from 'prop-types';
import {
	View,
	Image,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
} from 'react-native';
import colors from '../../utils/colors';
import { getCategoryIllustration } from '../../utils/icons';
import { capitalize } from '../../utils';
import Button, { types } from '../../components/Button';
import { Heading2, Heading5, Heading3 } from '../../components';
import withAges, { shapeContextAges } from '../../components/withAges';
import withUser, { shapeContextUser } from '../../components/withUser';
import { track } from '../../utils/analytics';
import { authorizeAction } from '../../utils/session';
import { useAppContext } from '../../contexts/AppContext';

const WriteButton = (props) => {
	const { navigation, updateAuthorization, route } = props;
	const { showAd } = useAppContext();

	const onWrite = async () => {
		const currentStatus = await authorizeAction({
			navigation,
			contextUser: {
				updateAuthorization,
			},
		});

		if (!currentStatus.authorized) {
			// in this case authorizeAction will show and alert
			return;
		}

		const params = {
			ageId: route.params.ageId,
			questionId: route.params.questionId,
			question: route.params.question,
			storyId: route.params.storyId,
		};

		// going back to close the modal so
		// is not open when closing writing screen
		navigation.goBack();

		// any posible error is logged and catched by the showAd
		await showAd();

		return navigation.navigate('Writing', params);
	};

	return (
		<Button
			title='questionCard.write'
			onPress={onWrite}
			style={{ marginBottom: 20 }}
		/>
	);
};

WriteButton.propTypes = {
	navigation: PropTypes.object.isRequired,
	updateAuthorization: PropTypes.func.isRequired,
	route: PropTypes.object.isRequired,
};

class ModalCard extends React.Component {
	static propTypes = {
		navigation: PropTypes.object.isRequired,
		contextUser: PropTypes.shape(shapeContextUser).isRequired,
		contextAges: PropTypes.shape(shapeContextAges).isRequired,
	};

	async componentDidMount() {
		try {
		} catch (error) {
			console.error(error);
		}
	}

	onSkip = () => {
		const { navigation, route } = this.props;
		const question = route.params.question;
		track('Skip Story', { title: question });
		navigation.goBack();
	};

	render() {
		const { route, navigation } = this.props;
		const { updateAuthorization } = this.props.contextUser;
		const { ages } = this.props.contextAges;
		const ageId = route.params.ageId;
		const question = route.params.question || '';
		const categoryId = route.params.categoryId;
		const age = (ages[ageId] || {}).name;
		const illustration = getCategoryIllustration(categoryId);

		const ComponentQuestion = question.length > 65 ? Heading3 : Heading2;
		return (
			<View style={styles.modalContainer}>
				<TouchableOpacity style={styles.modalBackground} onPress={this.onSkip}>
					<View />
				</TouchableOpacity>
				<View style={styles.card}>
					<View style={styles.container}>
						<Image source={illustration} style={{ width: 340, height: 250 }} />
						<View style={{ flex: 1, position: 'absolute', paddingTop: 27 }}>
							<Heading5
								text={capitalize(age)}
								style={{ textAlign: 'center' }}
							/>
						</View>

						<View style={styles.contentTop}>
							{/* <Heading2 text={capitalize(category)} style={{marginBottom: 10}} /> */}
							<ComponentQuestion
								style={{ textAlign: 'center' }}
								text={capitalize(question)}
							/>
						</View>

						<View style={styles.contentBottom}>
							<WriteButton
								navigation={navigation}
								route={route}
								updateAuthorization={updateAuthorization}
							/>
							<Button
								title='questionCard.skip'
								onPress={this.onSkip}
								type={types.OUTLINED}
							/>
						</View>
					</View>
				</View>
			</View>
		);
	}
}

export default withAges(withUser(ModalCard));

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
	modalBackground: {
		flex: 1,
		backgroundColor: 'rgba(98, 97, 232, 0.85)',
		width: '100%',
	},
	modalContainer: {
		flex: 1,
		width,
		height,
		alignItems: 'center',
		justifyContent: 'center',
	},
	card: {
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
		borderRadius: 30,
		borderWidth: 0.5,
		margin: 20,
		borderColor: colors.white,
		shadowColor: colors.questionCardShadow,
		shadowOpacity: 0.1,
		shadowRadius: 30,
		shadowOffset: {
			height: 30,
		},
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor: colors.white,
	},
	contentTop: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingHorizontal: 20,
		paddingBottom: 20,
	},
	contentBottom: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-end',
		paddingBottom: 30,
	},
});
