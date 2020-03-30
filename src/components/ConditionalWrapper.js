import React from 'react';
import PropTypes from 'prop-types';

const ConditionalWrapper = ({ component, props, condition, children }) => {
	const Component = component;
	return condition ? <Component {...props}>{children}</Component> : children;
};

ConditionalWrapper.propTypes = {
	component: PropTypes.func.isRequired,
	condition: PropTypes.bool,
	children: PropTypes.node.isRequired,
	props: PropTypes.object,
};

export default ConditionalWrapper;
