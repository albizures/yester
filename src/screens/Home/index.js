import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	View,
	StyleSheet,
	FlatList,
	Alert,
	Image,
	Dimensions,
	Animated,
	Text,
} from 'react-native';
import QuestionItem from './QuestionItem';
import AlertItem from './AlertItem';
import StoryItem from './StoryItem';
import Tabs from './Tabs';
import Container from '../../components/Container';
import TopBar from '../../components/TopBar';
import { Title, Heading4, Heading3 } from '../../components';
import http from '../../utils/http';
import colors from '../../utils/colors';
import icons from '../../utils/icons';
import { indexToString, capitalize } from '../../utils';
import { translate } from '../../components/Translate';
import { screen, track } from '../../utils/analytics';
import { authorizeAction } from '../../utils/session';
import withUser, { shapeContextUser } from '../../components/withUser';
import debugFactory from 'debug';

const debugInfo = debugFactory('yester:Home:info');
const debugError = debugFactory('yester:Home:error');

class Home extends Component {
	static propTypes = {
		navigation: PropTypes.object.isRequired,
		contextUser: PropTypes.shape(shapeContextUser).isRequired,
	};

	state = {
		isLoading: true,
		item: {},
		positionToast: new Animated.Value(-100),
	};

	willFocusListener = null;

	async componentDidMount() {
		const { navigation } = this.props;
		const { addListener } = navigation;
		this.willFocusListener = addListener('willFocus', this.load);

		this.setState({ isLoading: true });
		await authorizeAction(this.props, async (currentStatus) => {
			// const question = {
			//   age_id: 'Age#31',
			//   category: 'Family',
			//   description: 'What were your favorite hobbies or activities?',
			//   id: 'Question#0099',
			//   sub_category: '',
			// }
			try {
				const { data: question } = await http.getAPI('/v2/questions');
				this.setState({ isLoading: false, question });
			} catch (error) {
				this.setState({
					isLoading: false,
				});
				debugError('today question:', error.response);
				if (error.response.status === 404) {
					debugError('There is not a new question ready.');
					return;
				}
				if (error.response.status === 402) {
					const { data } = error.response;
					debugError(data.message);
					this.setState({ currentStatus });
					return;
				}
				Alert.alert(translate('home.error.today.question'));
			}
		});
	}

	load = () => {
		screen('My Story', { age: 'childhood' });
	};

	onPressToast = () => {
		const { navigation } = this.props;
		const storyId = navigation.getParam('storyId');
		this.closeToast();
		navigation.navigate('Reading', { storyId });
	};

	closeToast = () => {
		clearInterval(this.timeout);
		Animated.spring(this.state.positionToast, {
			toValue: -100,
			bounciness: 3,
			speed: 3,
		}).start();
	};

	componentWillUnmount() {
		clearInterval(this.timeout);
		this.willFocusListener.remove();
	}

	renderChapter = ({ item }) => (
		<View style={styles.chapterView}>
			<View style={styles.chapterTitle}>
				<Image source={icons.childhood} style={styles.chapterImage} />
				<Title text={capitalize(item.text)} style={styles.chapterText} />
			</View>
			<FlatList
				data={this.state.questions}
				renderItem={this.renderStoryItem}
				keyExtractor={indexToString}
			/>
		</View>
	);

	renderStoryItem = ({ item }) => (
		<StoryItem data={item} onPress={() => this.onPressItem(item)} />
	);

	onWriteTodayQuestion = () => {
		const { question: item } = this.state;
		const {
			category,
			age_id: ageId,
			description: question,
			id: questionId,
			story_id: storyId,
			category_id: categoryId,
		} = item;
		this.onPressItem({
			ageId,
			category,
			question,
			questionId,
			storyId,
			categoryId,
		});
	};

	onPressAlertItem = () => {
		const { navigation } = this.props;
		const { currentStatus } = this.state;
		navigation.navigate('Subscription', { currentStatus });
	};

	onPressItem = (item) => {
		const { navigation } = this.props;
		const {
			ageId,
			category,
			question,
			questionId,
			storyId,
			content,
			categoryId,
		} = item;

		track('Tap Story', { ageId, category, title: question });

		if (content) {
			return navigation.navigate('Reading', { storyId });
		}

		debugInfo(item);

		navigation.navigate('ModalCard', {
			ageId,
			category,
			question,
			questionId,
			storyId,
			categoryId,
		});
	};

	render() {
		const { isLoading, question, positionToast, currentStatus } = this.state;
		const topBarTitle = (
			<View
				style={{ height: 51, alignItems: 'center', justifyContent: 'center' }}>
				<Image source={icons.logoWhite} style={styles.topBarImage} />
			</View>
		);
		const topBar = <TopBar title={topBarTitle} />;
		return (
			<Container topBar={topBar} isLoading={isLoading} style={styles.container}>
				<View style={styles.view}>
					{question && (
						<QuestionItem
							text={question.description}
							onPress={this.onWriteTodayQuestion}
						/>
					)}
					{currentStatus && (
						<AlertItem
							currentStatus={currentStatus}
							onPress={this.onPressAlertItem}
						/>
					)}
					{!isLoading && (
						<Tabs onPressItem={this.onPressItem} answered={false} />
					)}
				</View>
				<Animated.View
					style={[styles.toastContainer, { bottom: positionToast }]}>
					<View style={[styles.toast]}>
						<Text style={styles.checkMark}>✓</Text>
						<View style={styles.contentToast}>
							<Heading4 keyName='home.toast.story.saved' />
							<Heading3
								keyName='home.toast.read.story.now'
								onPress={this.onPressToast}
								style={{ textDecorationLine: 'underline' }}
							/>
						</View>
						<View style={styles.closeContainer}>
							<Text style={styles.close} onPress={this.closeToast}>
								×
							</Text>
						</View>
					</View>
				</Animated.View>
			</Container>
		);
	}
}

export default withUser(Home);

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
	toastContainer: {
		position: 'absolute',
		shadowColor: colors.shadow,
		shadowOpacity: 0.3,
		shadowRadius: 8,
		shadowOffset: {
			height: 8,
		},
		elevation: 8,
	},
	toast: {
		flexDirection: 'row',
		backgroundColor: colors.white,
		fontSize: 30,
		borderRadius: 10,
		overflow: 'hidden',
	},
	contentToast: {
		paddingHorizontal: 15,
		paddingVertical: 8,
		height: 59,
	},
	closeContainer: {
		marginVertical: 10,
		paddingHorizontal: 14,
		borderLeftWidth: 1,
		borderLeftColor: colors.mischka,
		height: 40,
	},
	close: {
		fontSize: 30,
		lineHeight: 40,
		color: colors.boulder,
		textAlign: 'center',
		fontWeight: 'bold',
	},
	checkMark: {
		paddingHorizontal: 15,
		paddingVertical: 5,
		height: 60,
		width: 60,
		backgroundColor: colors.mantis,
		fontSize: 36,
		color: colors.white,
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor: colors.athensGray,
	},
	topBarImage: {
		width: 100,
		height: 26,
	},
	view: {
		flex: 1,
		backgroundColor: colors.athensGray,
		paddingTop: 20,
	},
	chapterView: {
		width,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	chapterTitle: {
		width,
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		paddingLeft: 40,
		marginTop: 33,
		marginBottom: 20,
	},
	chapterImage: {
		width: 28,
		height: 30,
		marginRight: 10,
	},
	chapterText: {
		color: colors.governorBay,
		fontWeight: 'bold',
		paddingTop: 5,
	},
});
