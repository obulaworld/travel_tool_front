import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
import DocumentDetailsModal from '../DocumentDetailsModal';
import { initialState } from '../../../../redux/reducers/travelReadinessDocuments';
import users from '../../__mocks__/users';

const state = {
  travelReadinessDocuments: {
    ...initialState,
    users,
    userReadiness: users[0],
  },
  modal: {
    modal: {
      shouldOpen: false,
      modalType: 'test modal',
    }
  },
  auth: {
    user: {
      UserInfo: {
        picture: 'http://mockpicture.in'
      }
    }
  }
};

const store = configureStore()(state);

describe('DocumentDetailsModal', () => {
  const props = {
    userData: {
      fullName: 'Zlatan Ibile',
      occupation: 'Software Developer'
    },
    documentId: 'xifslke',
    documentType: 'passport',
  };

  it('should render the Document Details without crashing', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <DocumentDetailsModal {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });
});
