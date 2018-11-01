import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import TravelCalendar from '../index';

const props = {
  travelCalendar: {
    data: [{
      name: "Barrison Waina",
      department: "Apprenticeship Department",
      role: "Product designer",
      flights: {
        arrival: {
          destination: "Lagos",
          airline: "Kenya Airways",
          flight_no: "KQ5752",
          arrival_time: "24/10/2018 13:23:33",
          depature_time: "24/10/2018 13:23:33"
        },
        depature: {
          destination: "Nairobi",
          airline: "Kenya Airways",
          flight_no: "KQ5752",
          arrival_time: "24/10/2018 13:23:33",
          depature_time: "24/10/2018 13:23:33"
        }
      }
    }],
    pagination: {
      total: 30,
      current_page: 1,
      limit: 13,
      nextPage: 2,
      prevPage: null
    }
  },
  fetchCalendarAnalytics: jest.fn()
};

const initialState = {};

const mockStore = configureStore();
const store = mockStore(initialState);

describe('Travel Calendar', () => {
  it('should render Travel Calendar without crashing', ()=> {
   const mountWrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <TravelCalendar {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(mountWrapper.length).toBe(1)
  });
});
