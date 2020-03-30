import React from 'react';
import PropTypes from 'prop-types';
import {
	View,
	Image,
	StyleSheet,
	TouchableOpacity,
	Switch,
} from 'react-native';
import colors from '../utils/colors';
import icons from '../utils/icons';
import { Heading4, Heading3 } from './';
import Divider from './Divider';

export const types = {
	CHEVRON: 'CHEVRON',
	CHECK: 'CHECK',
	TEXT: 'TEXT',
	TOGGLE: 'TOGGLE',
	NONE: 'NONE',
};

const SettingsItem = (props) => {
	const { onPress, title, type, valueToggle } = props;

	let showIcon = {
		[types.CHEVRON]: (
			<View style={styles.iconContainer}>
				<Image source={icons.chevronRight} style={styles.chevron} />
			</View>
		),
		[types.CHECK]: (
			<View style={styles.iconContainer}>
				<Image source={icons.check} style={styles.check} />
			</View>
		),
		[types.TEXT]: (
			<View style={styles.textButton}>
				<Heading3 text='Disconnect' style={{ color: colors.governorBay }} />
			</View>
		),
		[types.TOGGLE]: (
			<View style={styles.textButton}>
				<Switch style={{}} value={valueToggle} onValueChange={onPress} />
			</View>
		),
	};

	return (
		<TouchableOpacity onPress={onPress}>
			<View style={[styles.itemContainer]}>
				<View style={styles.textContainer}>
					<Heading4 text={title} style={styles.item} />
				</View>
				{showIcon[type]}
			</View>
			<Divider style={{ marginLeft: 0 }} />
		</TouchableOpacity>
	);
};

SettingsItem.types = types;

SettingsItem.propTypes = {
	title: PropTypes.string.isRequired,
	onPress: PropTypes.func.isRequired,
	type: PropTypes.oneOf(Object.keys(types)),
	valueToggle: PropTypes.bool,
};
export default SettingsItem;

const styles = StyleSheet.create({
	itemContainer: {
		height: 75,
		flexDirection: 'row',
	},
	textContainer: {
		flex: 1,
		alignItems: 'flex-start',
		justifyContent: 'center',
	},
	iconContainer: {
		width: 35,
		height: 35,
		alignItems: 'flex-end',
		justifyContent: 'center',
		alignSelf: 'center',
		marginRight: 25,
	},
	textButton: {
		flex: 1,
		alignItems: 'flex-end',
		justifyContent: 'center',
		alignSelf: 'center',
		marginRight: 25,
	},
	chevron: {
		width: 8,
		height: 15,
	},
	check: {
		width: 13,
		height: 9.5,
	},
});
