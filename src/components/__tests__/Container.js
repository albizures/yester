import React from 'react';
import { shallow } from 'enzyme';
import { View, ScrollView, RefreshControl } from 'react-native';

import Loading from '../Loading';
import ConditionalWrapper from '../ConditionalWrapper';

let Container = require('../Container').default;

const Children = () => <div>test</div>;

const render = (props) =>
	shallow(
		<Container {...props}>
			<Children />
		</Container>,
	);

describe('src/components/Container.js', () => {
	it('should render Loading component', () => {
		const shallowContainer = render();

		expect(shallowContainer.type()).toBe(View);

		const shallowLoading = shallowContainer.childAt(0);
		expect(shallowLoading.type()).toBe(Loading);
	});

	it('should render the provided topBar', () => {
		const topBar = <div>topBar</div>;

		const shallowLoading = render({ topBar }).find(Loading);

		const shallowTopBar = shallowLoading.childAt(0);

		expect(shallowTopBar.contains(topBar)).toBe(true);
	});

	it('should render a conditional scroll wrapper', () => {
		const shallowLoading = render().find(Loading);
		const shallowWrapper = shallowLoading.find(ConditionalWrapper);

		expect(shallowWrapper.prop('props')).toEqual(
			expect.objectContaining({
				refreshControl: undefined,
				style: expect.any(Object),
			}),
		);

		expect(shallowWrapper.prop('component')).toBe(ScrollView);
		expect(shallowWrapper.prop('condition')).toBe(undefined);
	});
	describe('when is loading and an onRefresh function is provided', () => {
		it('should provided a RefreshControl as prop', () => {
			const props = {
				scroll: true,
				refreshing: true,
				onRefresh: jest.fn(),
			};
			const shallowLoading = render(props).find(Loading);
			const shallowWrapper = shallowLoading.find(ConditionalWrapper);

			expect(shallowWrapper.prop('props')).toEqual(
				expect.objectContaining({
					refreshControl: expect.objectContaining({
						type: RefreshControl,
					}),
					style: expect.any(Object),
				}),
			);
		});
	});

	describe('when is ios', () => {
		beforeAll(() => {
			jest.mock('Platform', () => {
				const Platform = require.requireActual('Platform');
				Platform.OS = 'ios';
				return Platform;
			});
			jest.resetModules();
			require('../../../jest-setup');
			Container = require('../Container').default;
		});

		it('should add 20pt in the top as paddingTop', () => {
			const shallowContainer = render();
			expect(shallowContainer.prop('style')[0].paddingTop).toBe(20);
		});
	});
	describe('when is android', () => {
		beforeAll(() => {
			jest.mock('Platform', () => {
				const Platform = require.requireActual('Platform');
				Platform.OS = 'android';
				return Platform;
			});
			jest.resetModules();
			require('../../../jest-setup');
			Container = require('../Container').default;
		});

		it('should add not 20pt in the top as paddingTop', () => {
			const shallowContainer = render();
			expect(shallowContainer.prop('style')[0].paddingTop).toBe(0);
		});
	});
});
