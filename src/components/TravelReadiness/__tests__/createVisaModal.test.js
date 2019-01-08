import React from 'react';
import {CreateVisaModal} from '../createVisaModal';

describe('createVisaModal', () => {
  const props = {
    modal: jest.fn()
  };
  const wrapper = mount(<CreateVisaModal { ...props } />);
  it('renders without crashing and matches snapshots', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.add-visa').length).toEqual(1);
  });
});
