import React from 'react';
import { mount } from 'enzyme';
import ListEmailTemplates from '../ListEmailTemplates';
import listOfTemplates from '../../../views/ReminderSetup/__mocks__/index';

describe('<ListEmailTemplates />', () => {
  const {templates, pagination} = listOfTemplates;
  const props = {
    fetchTemplates: jest.fn(),
    setItemToDisable: jest.fn(),
    disableEnable: false,
    listEmailTemplatesReducer: {
      pagination: {
        pageCount: 3,
        currentPage: 3
      },
      templates: [{
        id: 1,
        name: '',
        creator : {
          fullName: ''
        },
        createdAt: '2019-01-21T07:33:26.123Z',
        updatedAt: '2019-01-21T07:33:26.123Z',
        deletedAt: null,
        disabled: true,
      }]
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
 
