import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

import ConnectedAnalytics, {mapStateToProps} from '..';

const initialState = {
  analytics: {
    payload: {
      total_requests: 230
    },
    error: '',
    isLoading: false,
    success: false
  }
};

let props = {
  analytics: {
    payload: {
      total_requests: 230
    }
  },
  context: {
    filter: 'Today'
  }
};

const mockStore = configureStore();
const store = mockStore(initialState);

const wrapper = shallow(
  <Provider store={store}>
    <MemoryRouter>
      <ConnectedAnalytics {...props} store={store} />
    </MemoryRouter>
  </Provider>
).dive();

describe('<Analytics />', () => {
  it('maps the correct state to props', () => {
    wrapper.html();
    const mapper = mapStateToProps({ ...props });
    expect(mapper.analytics.payload.total_requests).toEqual(230);
  });

});
