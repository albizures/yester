import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, FlatList } from 'react-native';
import { Heading5, Heading4 } from '../../components';
import StoryItem from './StoryItem';
import colors from '../../utils/colors';
import http from '../../utils/http';
import { indexToString } from '../../utils';
import debugFactory from 'debug';

const debugError = debugFactory('yester:Tab:error');
const debugInfo = debugFactory('yester:Tab:info');

export default class Tab extends Component {
	static propTypes = {
		onPressItem: PropTypes.func.isRequired,
		age: PropTypes.string.isRequired,
		initialStories: PropTypes.array.isRequired,
		initialEvaluatedKey: PropTypes.object,
		answered: PropTypes.bool,
	};

	state = {
		lastEvaluatedKey: this.props.initialEvaluatedKey,
		stories: this.props.initialStories,
		endReached: !this.props.initialEvaluatedKey,
		conditionalText: {
			[true]: {
				emptyTitle: 'home.empty.tab.stories.title',
				emptySubtitle: 'home.empty.tab.stories.subtitle',
			},
			[false]: {
				emptyTitle: 'home.empty.tab.questions.title',
				emptySubtitle: 'home.empty.tab.questions.subtitle',
			},
		},
	};

	onEndReached = (info) => {
		this.getStories();
	};

	getStories = async () => {
		const { age, answered } = this.props;
		const {
			lastEvaluatedKey,
			stories: currentStories,
			endReached,
		} = this.state;
		if (endReached) {
			return;
		}

		const queryParams = {
			age_id: age,
			lastEvaluatedKey: JSON.stringify(lastEvaluatedKey),
			answered,
		};
		try {
			const { data } = await http.getAPI('/v2/stories', queryParams);
			const stories = currentStories.concat(data.items);

			this.setState({
				stories,
				lastEvaluatedKey: data.lastEvaluatedKey,
				endReached: !data.lastEvaluatedKey,
			});
		} catch (error) {
			debugError(error);
			debugError(error.response);
		}
	};

	renderItem = ({ item }) => {
		const { onPressItem } = this.props;

		const {
			content,
			story,
			category,
			question_id: questionId,
			title: question,
			age_id: ageId,
			id: storyId,
			category_id: categoryId,
		} = item;
		const newItem = {
			question,
			questionId,
			ageId,
			storyId,
			content,
			categoryId,
		};
		return (
			<StoryItem
				question={question}
				category={category}
				content={content}
				story={story}
				onPress={() => onPressItem(newItem)}
			/>
		);
	};

	render() {
		const { answered } = this.props;
		const { stories, conditionalText } = this.state;
		const text = conditionalText[answered];

		const content =
			stories.length === 0 ? (
				<View style={styles.noStoriesContainer}>
					<Heading4
						style={[styles.message, styles.highlightMessage]}
						keyName={text.emptyTitle}
					/>
					<Heading5 style={styles.message} keyName={text.emptySubtitle} />
				</View>
			) : (
				<FlatList
					onEndReached={this.onEndReached}
					style={{ flexGrow: 0 }}
					data={stories}
					keyExtractor={indexToString}
					renderItem={this.renderItem}
				/>
			);

		return <View style={styles.container}>{content}</View>;
	}
}

const styles = StyleSheet.create({
	highlightMessage: {
		fontWeight: 'bold',
		color: colors.governorBay,
	},
	message: {
		textAlign: 'center',
	},
	noStoriesContainer: {
		flex: 1,
		paddingHorizontal: 20,
		paddingTop: 40,
		alignContent: 'center',
	},
	loading: {
		backgroundColor: colors.athensGray,
	},
	container: {
		flex: 1,
	},
});
