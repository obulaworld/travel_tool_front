import React from 'react';
import { mount } from 'enzyme';
import TemplateDetailsModal from '../TemplateDetailsModal';

describe('<TemplateDetailsModal />', () => {
  const props = {
    closeModal: jest.fn(), 
    templates: [],
    modalType: '', 
    shouldOpen: false, 
    onetemplate: {}, 
  };

  it('renders without crashing', () => {
    const wrapper = mount(<TemplateDetailsModal {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
