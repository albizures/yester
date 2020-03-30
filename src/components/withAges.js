import React from 'react';

import PropTypes from 'prop-types';

const { Provider, Consumer } = React.createContext();

export const AgesProvider = Provider;
export const shapeContextAges = {
	updateAges: PropTypes.func.isRequired,
	ages: PropTypes.object,
};

export default (Component) => {
	const withAges = (props) => {
		return (
			<Consumer>
				{(data) => <Component contextAges={data} {...props} />}
			</Consumer>
		);
	};

	return withAges;
};
