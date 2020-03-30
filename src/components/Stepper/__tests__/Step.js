import React from 'react';
import renderer from 'react-test-renderer';

import Step from '../Step';
const Children = () => <div>test</div>;

let mockPortrait = true;

jest.mock('Dimensions', () => {
	return {
		get: () =>
			mockPortrait ? { width: 40, height: 50 } : { height: 40, width: 50 },
	};
});

describe('src/screens/Step.js', () => {
	it('should render a portrait version', () => {
		const tree = renderer
			.create(
				<Step>
					<Children />
				</Step>,
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});

	describe('when it´s landscape mode', () => {
		beforeEach(() => {
			mockPortrait = false;
		});
		it('should render a landscape version', () => {
			const tree = renderer
				.create(
					<Step>
						<Children />
					</Step>,
				)
				.toJSON();
			expect(tree).toMatchSnapshot();
		});
	});
});
