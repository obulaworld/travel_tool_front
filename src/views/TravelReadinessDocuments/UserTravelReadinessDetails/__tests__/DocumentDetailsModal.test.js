import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import ConnectedDocumentDetailsModal, { DocumentDetailsModal, TravelDocumentField } from '../DocumentDetailsModal';
import { initialState } from '../../../../redux/reducers/travelReadinessDocuments';
import users from '../../__mocks__/users';
import NotFound from '../../../ErrorPages';

const defaultState = {
  travelReadinessDocuments: {
    ...initialState,
    users,
    userReadiness: users[0],
  },
  comments: {
    comment: '',
    comments: [],
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
  },
  user: {
    getCurrentUserRole: ['Requester']
  }
};

const props = {
  userData: {
    fullName: 'Zlatan Ibile',
    occupation: 'Software Developer'
  },
  user: {
    picture: 'http://pix.els'
  },
  fetchingDocument: false,
  document: {
    isVerified: false,
    data: {
      id: 'ckls'
    }
  },
  fetchDocumentDetails: jest.fn(),
  documentId: 'xifslke',
  documentType: 'passport',
  verifyDocument: jest.fn(),
  getCurrentUserRole: ['Requester']
};

describe('DocumentDetailsModal', () => {
  it('should render the NotFound component if document is not found', () => {
    const store = configureStore()(defaultState);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ConnectedDocumentDetailsModal {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.length).toBe(1);
    expect(wrapper.find(NotFound).length).toBe(1);
  });

  it('should render the Passport Details without crashing', () => {
    const wrapper = shallow(<DocumentDetailsModal {...props} />);
    expect(wrapper.find(TravelDocumentField).length).toBe(6);
    wrapper.unmount();
  });

  it('should render the Visa Details without crashing', () => {
    const updatedProps = {
      ...props,
      documentType: 'visa'
    };
    const wrapper = shallow(<DocumentDetailsModal {...updatedProps} />);
    expect(wrapper.find(TravelDocumentField).length).toBe(5);
  });

  it('should render the Visa Details without crashing when document is verified', () => {
    const updatedProps = {
      ...props,
      documentType: 'visa',
      document: {
        isVerified: true,
        data: {
          id: 'ckls',
          isVerified: true,
        }
      }
    };
    const wrapper = shallow(<DocumentDetailsModal {...updatedProps} />);
    expect(wrapper.find(TravelDocumentField).length).toBe(5);
  });

  it('should simulate verify documents click', () => {
    const updatedProps = {
      ...props,
      getCurrentUserRole: ['Travel Administrator']
    };
    const wrapper = shallow(<DocumentDetailsModal {...updatedProps} />);
    const verifyButton = wrapper.find('Button');
    verifyButton.simulate('click');
    expect(wrapper.find(TravelDocumentField).length).toBe(6);
  });

  it('should render the Visa Details without crashing when user is an admin and document is verified', () => {
    const updatedProps = {
      ...props,
      getCurrentUserRole: ['Travel Administrator'],
      document: {
        isVerified: true,
        data: {
          id: 'ckls',
          isVerified: true,
        }
      }
    };
    const wrapper = shallow(<DocumentDetailsModal {...updatedProps} />);
    expect(wrapper.find(TravelDocumentField).length).toBe(6);
  });

  describe('TravelDocumentField', () => {
    it('should render correctly', () => {
      const wrapper = shallow(<TravelDocumentField label="Column" value="The value" />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
