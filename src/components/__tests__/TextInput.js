import React from 'react';
import { shallow } from 'enzyme';
import TextInput, { validations } from '../TextInput';
import InputContainer from '../InputContainer';

describe('src/components/TextInput.js', () => {
	it('should render a View with a Custom TextInput in it', () => {
		const shallowButton = shallow(<TextInput title='titleKeyName' />);
		expect(shallowButton.type()).toBe(InputContainer);
	});

	describe('when TextInput is not editable', () => {
		it('should render a View with a Custom TextInput in it', () => {
			const shallowButton = shallow(
				<TextInput title='titleKeyName' editable={false} />,
			);
			expect(shallowButton.type()).toBe(InputContainer);
		});
	});

	describe('when TextInput is validated', () => {
		it('should render a View with a Custom TextInput in it', () => {
			const shallowButton = shallow(
				<TextInput
					title='titleKeyName'
					validation={validations.GOOD}
					validationMessage='validationKeyName'
				/>,
			);
			expect(shallowButton.type()).toBe(InputContainer);
		});
	});

	describe('when TextInput has a description label', () => {
		it('should render a View with a Custom TextInput in it', () => {
			const shallowButton = shallow(
				<TextInput title='titleKeyName' description='descriptionKeyName' />,
			);
			expect(shallowButton.type()).toBe(InputContainer);
		});
	});
});
