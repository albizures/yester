import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import Dot from './Dot';

const Dots = ({ steps, currentStep }) => (
	<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
		{new Array(steps).fill(null).map((item, index) => (
			<Dot key={index} active={index === currentStep} />
		))}
	</View>
);

Dots.propTypes = {
	steps: PropTypes.number.isRequired,
	currentStep: PropTypes.number.isRequired,
};

export default Dots;
