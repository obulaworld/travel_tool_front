import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import ButtonGroup from '../ButtonGroup';


const props = {
  openRequestsCount: 1,
  pastRequestsCount: 1,
  limit: 10,
  fetchUserRequests: sinon.spy(() => Promise.resolve()),
  buttonsType: 'requests'
};

const defaultState = {
  allActive: false,
  openActive: false,
  pastActive: false,
}

describe('<ButtonGroup />', () => {
  it('should render successfully', () => {
    const wrapper = shallow(<ButtonGroup {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('calls the fetchRequests method when the `all` button is clicked', () => {
    const wrapper = mount(<ButtonGroup {...props} />);
    const spy = sinon.spy(wrapper.instance(), 'fetchRequests');
    const allButton = wrapper.find('#all-button');
    const newState = {
      ...defaultState,
      allActive: true
    };
    allButton.simulate('click');
    expect(spy.calledOnce).toEqual(true);
    expect(spy.calledWith('', newState));
    expect(wrapper.state()).toEqual(newState)
  });

  it('calls the fetchRequests method when the `open requests` button is clicked', () => {
    const wrapper = mount(<ButtonGroup {...props} />);
    const spy = sinon.spy(wrapper.instance(), 'fetchRequests');
    const openButton = wrapper.find('#open-button');
    const newState = {
      ...defaultState,
      openActive: true
    };
    openButton.simulate('click');
    expect(spy.calledOnce).toEqual(true);
    expect(spy.calledWith('', newState));
    expect(wrapper.state()).toEqual(newState);
  });

  it('calls the fetchRequests method when the `past requests` button is clicked', () => {
    const wrapper = mount(<ButtonGroup {...props} />);
    const spy = sinon.spy(wrapper.instance(), 'fetchRequests');
    const pastButton = wrapper.find('#past-button');
    const newState = {
      ...defaultState,
      pastActive: true
    };
    pastButton.simulate('click');
    expect(spy.calledOnce).toEqual(true);
    expect(spy.calledWith('', newState));
    expect(wrapper.state()).toEqual(newState);
  });
})
