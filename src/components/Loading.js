import React, { Fragment } from 'react';
import { ActivityIndicator, StyleSheet, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import colors from '../utils/colors';

const Loading = ({ isLoading, children, top, style }) => {
	return (
		<Fragment>
			{children}
			{isLoading && (
				<ActivityIndicator
					color={colors.black}
					size='large'
					style={[styles.loader, { top }, style]}
				/>
			)}
			{/* {isLoading && <View style={[styles.loader, { top }, style]}>
        <Image style={{ flex: 0.5, resizeMode: 'contain' }} source={require('../assets/Yester-loop_1.gif')} />
      </View>} */}
		</Fragment>
	);
};

Loading.propTypes = {
	isLoading: PropTypes.bool,
	children: PropTypes.node,
	top: PropTypes.number,
	style: ViewPropTypes.style,
};

const styles = StyleSheet.create({
	loader: {
		position: 'absolute',
		backgroundColor: 'rgba(0, 0, 0, 0.05)',
		height: '100%',
		width: '100%',
		top: 0,
		left: 0,
	},
});

export default Loading;
