import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import RequestPanelHeader from '../RequestPanelHeader';

const props = {
  openRequestsCount: 1,
  pastRequestsCount: 0,
  limit: 10,
  getRequestsWithLimit: sinon.spy(() => Promise.resolve()),
  fetchUserRequests: sinon.spy(() => Promise.resolve()),
  requests: [
    {
      id: 'xDh20btGz',
      name: 'Amarachukwu Agbo',
      origin: 'Lagos',
      destination: 'Nairobi',
      manager: 'Samuel Kubai',
      gender: 'Female',
      department: 'TDD',
      role: 'Software Developer',
      status: 'Open',
      userId: 'pommyLHJmKrx76A8Slm',
      departureDate: '2018-12-09',
      arrivalDate: '2018-12-11',
    },
  ]
};

describe('<RequestPanelHeader />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<RequestPanelHeader {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
