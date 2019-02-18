import React from 'react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import { mount } from 'enzyme';
import ConnectedReminderSetup, { ReminderSetup } from '../index';


describe('<ConnectedReminderSetup />', () => {
  const props = {
    fetchTemplates: jest.fn(),
    setItemToDisable: jest.fn(),
    enableReminderEmailTemplate: jest.fn(),
    location: {},
    listEmailTemplatesReducer: {
      pagination: {
        pageCount: {},
        currentPage: {}
      },
      templates: []
    },
    openModal: sinon.spy(),
    disableEmailTemplate: jest.fn(),
    closeModal: jest.fn(),
    onCancel: jest.fn(),
    history: {
      push: jest.fn(),
    },
    shouldOpen:true
  };

  const state = {
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
        <ConnectedReminderSetup {...props} />
      </MemoryRouter>
    </Provider>
  );
  const inst = wrapper.instance();
  it('renders', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the disable modal', () => {
    expect(wrapper.find('Modal').at(0).length).toBe(1);
  });

  it('should call the setItemToDisable function', () => {
    const shallowWrapper = mount( <ReminderSetup {...props} />);
    const templateId = { id: 5 };
    const wrapperInstance = shallowWrapper.instance();
    wrapperInstance.setItemToDisable(false,templateId);
    expect(shallowWrapper.state().templateId).toEqual(templateId.id);
  });

  it('should call the openModal function', () => {
    const shallowWrapper = mount( <ReminderSetup {...props} />);
    const templateId = { id: 5 };
    const wrapperInstance = shallowWrapper.instance();
    wrapperInstance.setItemToDisable(false,templateId);
    const { openModal } = props;
    expect(openModal.called).toEqual(true);
  });

  it('should handle onchange function', () => {
    const shallowWrapper = mount(
      <ReminderSetup
        {...{ ...props, shouldOpen: true, modalType: 'disable reminder template' }}
      />
    );
    shallowWrapper.find('textarea').simulate('change', {
      target: { value: 'hello'}
    });
    expect(shallowWrapper.state().disableReason).toEqual('hello');
  });

  it('should handle disableReminderTemplate function', () => {
    const shallowWrapper = mount(
      <ReminderSetup
        {...{ ...props, shouldOpen: true, modalType: 'disable reminder template' }}
      />
    );
    shallowWrapper.find('textarea').simulate('change', {
      target: { value: 'hello'}
    });
    shallowWrapper.find('button#oncancel').at(0).simulate('click');
    expect(shallowWrapper.state().disableReason).toEqual(null);
  });

  it('should handle enableReminderTemplate function', () => {
    const shallowWrapper = mount(
      <ReminderSetup
        {...{ ...props, shouldOpen: true, modalType: 'enable reminder template' }}
      />
    );
    shallowWrapper.find('button#oncancel').simulate('click');
    expect(shallowWrapper.state().disableReason).toEqual('');
  });
});
