import React from 'react';
import { mount } from 'enzyme';
import ListEmailTemplates from '../ListEmailTemplates';
import listOfTemplates from '../../../views/ReminderSetup/__mocks__/index';

describe('<ListEmailTemplates />', () => {
  const {templates, pagination} = listOfTemplates;
  const props = {
    fetchTemplates: jest.fn(),
    listEmailTemplatesReducer: {
      templates,
      pagination,
    },
    location: {}
  };
  const wrapper =  mount(<ListEmailTemplates {...props} />);

  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('calls onPageChange function', () => {
    wrapper.find('#next-button').simulate('click');
    expect(props.fetchTemplates).toHaveBeenCalled();
  });
});
 
