import { Dimensions, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

const Step = (props) => {
	const { children } = props;

	const { width, height } = Dimensions.get('window');
	// const portrait = height > width
	const style = {
		width,
		height,
	};

	return <View style={[styles.container, style]}>{children}</View>;
};

Step.propTypes = {
	children: PropTypes.node.isRequired,
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default Step;
