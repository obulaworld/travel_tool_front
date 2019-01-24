import React from 'react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import ReminderSetupConnected, { ReminderSetup  } from '..';
import listOfTemplates from '../__mocks__';

describe('<ReminderSetupConnected />', () => {
  const { templates, pagination } = listOfTemplates;
  const props = {
    fetchTemplates: jest.fn(),
    location: {},
    setItemToDisable: jest.fn(),
    history: {
      push: jest.fn(),
    },
    openModal: jest.fn(),
    closeModal: jest.fn()
  };

  const state = {
    listEmailTemplatesReducer: {
      pagination: {
        pageCount: 3,
        currentPage: 3
      },
      templates: {
        name: '',
        creator : {
          fullname: ''
        },
      }
    },
    templateId: 1,
    modal: {
      shouldOpen: false,
      modalType: '',
    },
    templatedetails: {},
  };
  const mockStore = configureStore();
  const store = mockStore (state);
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <ReminderSetupConnected {...props} />
      </MemoryRouter>
    </Provider>
  );
  const inst = wrapper.instance();
  it('renders', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the disable modal', () => {
    const setup = () => {
      const props = {
        enableReminderEmailTemplate: jest.fn(),
        openModal: jest.fn(),
        history: {
          push: jest.fn()
        },
        fetchTemplates: jest.fn(),
        location: {},
        shouldOpen:true,
        closeModal: jest.fn(),
        listEmailTemplatesReducer: {}
      };
      const unconnectedWrapper = shallow(<ReminderSetup {...props} />);
      return { unconnectedWrapper, props };
    };
    const e = {
      preventDefault: jest.fn()
    };
    const  { unconnectedWrapper, props } = setup();
    const { enableReminderEmailTemplate } = props;
    const inst  = unconnectedWrapper.instance();
    inst.enableReminderTemplate(e);
    expect(e.preventDefault).toHaveBeenCalled();
    expect(enableReminderEmailTemplate).toHaveBeenCalled();
  });

  it('should setItem to disable', () => {
    const setup = () => {
      const props = {
        enableReminderEmailTemplate: jest.fn(),
        openModal: jest.fn(),
        history: {
          push: jest.fn()
        },
        fetchTemplates: jest.fn(),
        location: {},
        closeModal: jest.fn(),
        listEmailTemplatesReducer: {},
        shouldOpen:true,
      };
      const unconnectedWrapper = shallow(<ReminderSetup {...props} />);
      return { unconnectedWrapper, props };
    };
    const { unconnectedWrapper, props } = setup();
    const { openModal } = props;
    const wrapperInstance = unconnectedWrapper.instance();
    const template = {
      id: 1
    };
    wrapperInstance.setItemToDisable(template,true);
    expect(unconnectedWrapper.state('templateId')).toBe(1);
    expect(openModal).toHaveBeenCalled();
  } );
});
