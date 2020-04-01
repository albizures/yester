import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View, StyleSheet, Dimensions } from 'react-native';

import Container from '../../components/Container';
import Button from '../../components/Button';
import { Heading2, Heading4 } from '../../components';
import TopBar from '../../components/TopBar';
import TextInput from '../../components/TextInput';
import colors from '../../utils/colors';

export default class RecoverCode extends Component {
	static propTypes = {
		navigation: PropTypes.object.isRequired,
	};

	state = {
		code: '',
	};

	onPress = () => {
		const { navigation, route } = this.props;
		const { code } = this.state;

		const email = route.params.email;

		navigation.navigate('NewPassword', { code, email });
	};

	onChange = (value, name) => {
		this.setState({
			[name]: value,
		});
	};

	onBack = () => {
		const { navigation } = this.props;
		navigation.navigate('Login');
	};

	render() {
		const { code } = this.state;

		const topBar = (
			<TopBar title='forgot.password.code.topbar' onBack={this.onBack} />
		);

		return (
			<Container topBar={topBar}>
				<KeyboardAwareScrollView extraScrollHeight={20}>
					<View style={{ marginHorizontal: 20 }}>
						<View style={styles.topFlex}>
							<Heading2
								keyName='forgot.password.code.title'
								style={styles.titleText}
							/>
							<Heading4
								keyName='forgot.password.code.subtitle'
								style={styles.subtitleText}
							/>
						</View>
						<View style={styles.bottomFlex}>
							<TextInput
								title='forgot.password.code'
								autoCapitalize='none'
								keyboardType='numeric'
								value={code}
								onChangeText={(text) =>
									this.onChange(text.toLowerCase(), 'code')
								}
							/>
							<Button
								title='forgot.password.code.submit'
								onPress={this.onPress}
							/>
						</View>
					</View>
				</KeyboardAwareScrollView>
			</Container>
		);
	}
}

const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
	topFlex: {
		flex: 0.25,
		justifyContent: 'flex-start',
		paddingTop: height * 0.045,
		paddingBottom: height * 0.045,
	},
	bottomFlex: {
		flex: 0.75,
		alignItems: 'center',
	},
	titleText: {
		textAlign: 'center',
		color: colors.governorBay,
		marginBottom: 20,
	},
	subtitleText: {
		textAlign: 'center',
	},
});
