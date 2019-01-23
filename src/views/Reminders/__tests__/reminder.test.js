import React from 'react';
import {Provider} from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import ConnectedReminders, { Reminders } from '../index';
import {initialState} from '../../../redux/reducers/emailReminder';
import TemplatesPagination from '../../../components/ReminderSetup/TemplatesPagination';


const mockStore = configureStore();

const initState = {
  emailReminders: {
    ...initialState,
    meta: {
      documentCount: {
        passport: 2,
        visa: 1
      },
      pagination: {
        'pageCount': 3,
        'currentPage': 1
      }
    },
    reminders: [
      {
        id: 3,
        conditionName: 'PasssssT',
        documentType: 'Passport',
        disabled: false,
        createdAt: '2019-01-24T16:11:09.802Z',
        updatedAt: '2019-01-25T14:42:00.976Z',
        userId: '-LT2Pgjb2os_fE5yxSf9',
        user: {
          fullName: 'Adeniyi Adeyokunnu'
        },
        reasons: [
          {
            reason: 'Home stretch',
            conditionId: 3,
            createdAt: '2019-01-25T14:35:39.275Z'
          }
        ]
      }
    ]
  },
  modal: {
    modal: { ...initialState }
  }
};
const store = mockStore(initState);
const props = {
  history: {
    push: jest.fn()
  },
  disableReminderCondition: jest.fn(),
  fetchEmailReminder: jest.fn(),
  setItemToDisable: jest.fn(),
  shouldOpen: true,
  modalType: 'disable reminder condtion',
  closeModal: jest.fn(),
  enableDisabledReminderCondition: jest.fn()
};

describe('Reminder component', () => {

  it('should test two button exist (passport and visa)  ', () => {
    // The page to be rendered
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedReminders {...props} />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    // To find two button tags on the DOM
    const buttons = wrapper.find('button');
    expect(buttons.length).toEqual(8);
  });

  it('should test if the two buttons are passport and visa', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedReminders {...props} />
      </Provider>
    );
    const button = wrapper.find('#passportButton');
    expect(button.text()).toEqual('Passports 0');

    const visaButton = wrapper.find('#visaButton');
    expect(visaButton.text()).toEqual('Visas 0');
  });

  it('should test default button is passport', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedReminders {...props} />
      </Provider>
    );

    const passportButton = wrapper.find('#passportButton');
    const {className} = passportButton.props();
    expect(className).toEqual('document-button_group__active');
  });
  it('should render the Reminder page without crashing', () => {


    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ConnectedReminders {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });


  it('should test that passport and visa button toggle when clicked',  () => {
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedReminders {...props} />
      </Provider>
    );
    wrapper.find('#passportButton').simulate('click');
    const passportButton = wrapper.find('#passportButton');
    const {className: classNamePassport} = passportButton.props();
    expect(classNamePassport).toEqual('document-button_group__active');

    wrapper.find('#visaButton').simulate('click');
    const visaButton = wrapper.find('#visaButton');
    const {className: classNameVisa} = visaButton.props();
    expect(classNameVisa).toEqual('document-button_group__active');
  });
});
