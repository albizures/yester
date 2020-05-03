import React from 'react';
import PropTypes from 'prop-types';
import {
	View,
	Platform,
	ScrollView,
	RefreshControl,
	StyleSheet,
	ViewPropTypes,
} from 'react-native';
import { AdMobBanner } from 'react-native-admob';
import { useAppContext } from '../contexts/AppContext';
import ConditionalWrapper from './ConditionalWrapper';
import Loading from './Loading';
import colors from '../utils/colors';

const top = Platform.OS === 'ios' ? 20 : 0;

const Container = (props) => {
	const { bannerId } = useAppContext();
	const {
		scroll,
		isLoading,
		children,
		topBar,
		onRefresh,
		refreshing,
		style,
		scrollRef,
		scrollEvents,
		keyboardDismissMode,
		ads = false,
	} = props;
	const refreshControl =
		scroll && onRefresh && refreshing ? (
			<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
		) : undefined;

	const ScrollViewProps = {
		refreshControl,
		scrollEventThrottle: 16,
		keyboardDismissMode: keyboardDismissMode || 'on-drag',
		style: styles.flex,
		ref: scrollRef,
		...scrollEvents,
	};

	return (
		<View
			style={[
				styles.container,
				style,
				!topBar ? { paddingTop: top } : undefined,
			]}>
			<Loading top={top} isLoading={isLoading}>
				{topBar}
				{ads && (
					<View style={styles.adContainer}>
						<AdMobBanner
							adSize='banner'
							adUnitID={bannerId}
							testDevices={[AdMobBanner.simulatorId]}
							onAdFailedToLoad={(error) => console.error(error)}
						/>
					</View>
				)}
				<ConditionalWrapper
					component={ScrollView}
					condition={scroll}
					props={ScrollViewProps}>
					{children}
				</ConditionalWrapper>
			</Loading>
		</View>
	);
};

Container.propTypes = {
	onRefresh: PropTypes.func,
	refreshing: PropTypes.bool,
	children: PropTypes.node.isRequired,
	topBar: PropTypes.node,
	scrollEvents: PropTypes.object,
	isLoading: PropTypes.bool,
	scroll: PropTypes.bool,
	style: ViewPropTypes.style,
	scrollRef: PropTypes.object,
	keyboardDismissMode: PropTypes.string,
	ads: PropTypes.bool,
};

const styles = StyleSheet.create({
	flex: {
		flex: 1,
	},
	adContainer: {
		paddingVertical: 16,
		paddingHorizontal: 20,
	},
	container: {
		flex: 1,
		backgroundColor: colors.athensGray,
	},
});

export default Container;
