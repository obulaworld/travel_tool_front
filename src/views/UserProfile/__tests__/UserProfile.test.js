import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import UserProfile from '../index';

const props = {
  user: {
    UserInfo: {
      name: 'John Doe',
      id: '-LHJlG',
      picture: 'http://www.image.com/jepg'
    }
  },
  isLoading: false,
  history: {
    push: jest.fn()
  },
  errors: [],
  shouldOpen: false,
  onNotificationToggle: jest.fn(),
};

const initialState = {
  auth: {
    user: {
      UserInfo: {
        name: 'John Doe',
        id: '-LHJlG',
        picture: 'http://www.image.com/jepg'
      }
    }
  },
  errors: [],
};

const mockStore = configureStore();
const store = mockStore(initialState);

describe('<UserProfile />', ()=>{
  it('should render correctly', () =>{
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <UserProfile {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

});
