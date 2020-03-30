import React from 'react';
import { StyleSheet, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import colors from '../utils/colors';

const IconButton = ({ style, children }) => {
	return <View style={[styles.container, style]}>{children}</View>;
};

IconButton.propTypes = {
	style: ViewPropTypes.style,
	children: PropTypes.node,
};

const styles = StyleSheet.create({
	container: {
		width: 35,
		height: 35,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.governorBay,
		borderRadius: 35,
		shadowColor: colors.brightTurquoise,
		shadowOpacity: 0.42,
		shadowRadius: 6,
		shadowOffset: {
			height: 3,
		},
		elevation: 3,
	},
});

export default IconButton;
