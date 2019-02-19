import React from 'react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import TravelStipends from '../index';
import mockData from '../../../mockData/travelStipend';


const { stipends } = mockData;
describe('<ConnectedTravelStipends />', () => {
  const props = {
    fetchAllTravelStipends: jest.fn(),
    listAllTravelStipends: { stipends }
  };

  const state = {
    listAllTravelStipends: {
      errors: {},
      stipends,
      isLoading: false
    }
  };
  const mockStore = configureStore();
  const store = mockStore (state);
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <TravelStipends {...props} />
      </MemoryRouter>
    </Provider>
  );

  it('renders appropriately', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
