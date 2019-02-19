import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ListTravelStipends from '../TravelStipends';
import mockData from '../../../mockData/travelStipend';


describe('<ListTravelStipends />',() => {
  const { stipends }  = mockData;
  const props = {
    fetchAllTravelStipends: jest.fn(),
    listAllTravelStipends: {stipends}
  };
  const wrapper = mount(
    <MemoryRouter>
      <ListTravelStipends {...props} />
    </MemoryRouter>
  );
  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });
});


