import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Animated from 'react-native-reanimated';
import {
	View,
	StyleSheet,
	FlatList,
	Image,
	Dimensions,
	Text,
} from 'react-native';
import QuestionItem from './QuestionItem';
import StoryItem from './StoryItem';
import Tabs from './Tabs';
import BottomDrawer from './BottomDrawer';
import Container from '../../components/Container';
import TopBar from '../../components/TopBar';
import { Title, Heading4, Heading3 } from '../../components';
import colors from '../../utils/colors';
import icons from '../../utils/icons';
import { indexToString, capitalize } from '../../utils';
import { screen, track } from '../../utils/analytics';
import withUser, { shapeContextUser } from '../../components/withUser';
import debugFactory from 'debug';

const debugInfo = debugFactory('yester:Stories:info');
const debugError = debugFactory('yester:Stories:error');

class Stories extends Component {
	static propTypes = {
		navigation: PropTypes.object.isRequired,
		contextUser: PropTypes.shape(shapeContextUser).isRequired,
	};

	constructor(props) {
		super(props);
		const {
			contextUser: { user, stats, currentStatus },
		} = props;

		this.state = {
			isLoading: true,
			item: {},
			positionToast: new Animated.Value(-100),
			modalVisible: false,
			user,
			stats,
			currentStatus,
		};
	}

	unsubscribeFocusListener = null;

	async componentDidMount() {
		const { navigation, route } = this.props;
		this.unsubscribeFocusListener = navigation.addListener('focus', this.load);

		this.setState({ isLoading: false });

		const storyId = route.params.storyId;
		if (storyId) {
			this.setModalVisible(true);
		}
	}

	load = () => {
		// this.setModalVisible(true)
		screen('My Story', { age: 'childhood' });
	};

	setModalVisible(visible) {
		this.setState({ modalVisible: visible });
	}

	onSubscribe = () => {
		const {
			navigation,
			contextUser: { currentStatus },
		} = this.props;
		navigation.navigate('Subscription', { currentStatus });
	};

	onOk = () => {
		this.setModalVisible(false);
	};

	onPressToast = () => {
		const { navigation, route } = this.props;
		const storyId = route.params.storyId;
		this.closeToast();
		navigation.navigate('Reading', { storyId });
	};

	closeToast = () => {
		const { positionToast } = this.state;
		clearInterval(this.timeout);
		Animated.spring(positionToast, {
			toValue: -100,
			bounciness: 3,
			speed: 3,
		}).start();
	};

	componentWillUnmount() {
		clearInterval(this.timeout);

		if (this.unsubscribeFocusListener) {
			this.unsubscribeFocusListener();
		}
	}

	renderChapter = ({ item }) => {
		const { questions } = this.state;
		return (
			<View style={styles.chapterView}>
				<View style={styles.chapterTitle}>
					<Image source={icons.childhood} style={styles.chapterImage} />
					<Title text={capitalize(item.text)} style={styles.chapterText} />
				</View>
				<FlatList
					data={questions}
					renderItem={this.renderStoryItem}
					keyExtractor={indexToString}
				/>
			</View>
		);
	};

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
		const { isLoading, question, positionToast } = this.state;

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
					{!isLoading && <Tabs onPressItem={this.onPressItem} answered />}
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

				{this.state.modalVisible && (
					<View
						style={{
							width,
							height,
							position: 'absolute',
							backgroundColor: 'rgba(49, 49, 49, 0.67)',
						}}
					/>
				)}
				{this.state.modalVisible && (
					<BottomDrawer
						props={this.props}
						visible={this.state.modalVisible}
						onOk={this.onOk}
						onSubscribe={this.onSubscribe}
					/>
				)}
			</Container>
		);
	}
}

export default withUser(Stories);

const { width, height } = Dimensions.get('window');
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
		paddingVertical: 10,
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
		fontSize: 40,
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
		width: '100%',
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
