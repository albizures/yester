import React from 'react';
import { shallow } from 'enzyme';
import { ActivityIndicator } from 'react-native';

import Loading from '../Loading';

const Children = () => <div>test</div>;

const render = (props) =>
	shallow(
		<Loading {...props}>
			<Children />
		</Loading>,
	);

describe('src/components/Loading.js', () => {
	it('should render the provided children', () => {
		const shallowLoading = render();
		expect(shallowLoading.find(Children).exists()).toBe(true);
	});

	describe('when is not loading', () => {
		it('should not render an ActivityIndicator', () => {
			const shallowLoading = render();
			expect(shallowLoading.find(ActivityIndicator).exists()).toBe(false);
		});
	});

	describe('when is loading', () => {
		it('should render an ActivityIndicator', () => {
			const shallowLoading = render({ isLoading: true });
			expect(shallowLoading.find(ActivityIndicator).exists()).toBe(true);
		});
	});
});
