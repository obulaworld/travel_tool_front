import React from 'react';
import { shallow } from 'enzyme';
import DocumentsHeader from '../index';

const props = {
  openModal: jest.fn(),
};

describe('<DocumentsHeader />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<DocumentsHeader {...props} />);
    expect(wrapper.find('PageHeader').length).toBe(1);
  });
});
