import React from 'react';
import { shallow } from 'enzyme';
import RequestDetailsModal from '../RequestsModal';

// describe what we are testing
describe('Render RequestsModal component', () => {
  // make our assertions and what we expect to happen
  it('should match snapshot', () => {
    const wrapper = shallow(<RequestDetailsModal />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the RequestsModal as expected', () => {
    const wrapper = shallow(<RequestDetailsModal />);
    expect(wrapper.length).toBe(1);
  });

  it('should render approveTextColor when button is clicked', () => {
    const wrapper = mount(<RequestDetailsModal />);
    const approveButton = wrapper.find('#b1').at(0);
    approveButton.simulate('click');
    expect(wrapper.state('approveTextColor')).toBe('white');
  });

  it('should render rejectTextColor when button is clicked', () => {
    const wrapper = mount(<RequestDetailsModal />);
    const rejectButton = wrapper.find('#b2').at(0);
    rejectButton.simulate('click');
    expect(wrapper.state('rejectTextColor')).toBe('white');
  });

  it('should render approveColor when button is clicked', () => {
    const wrapper = mount(<RequestDetailsModal />);
    const approveButton = wrapper.find('#b1').at(0);
    approveButton.simulate('click');
    expect(wrapper.state('approveColor')).toBe('#49AAAF');
  });

  it('should render rejectColor when button is clicked', () => {
    const wrapper = mount(<RequestDetailsModal />);
    const rejectButton = wrapper.find('#b2').at(0);
    rejectButton.simulate('click');
    expect(wrapper.state('rejectColor')).toBe('#FF5359');
  });

  // it('should render close modal when button is clicked', () => {
  //   // let approveState = {
  //   //   approveColor: '#49AAAF',
  //   //   approveTextColor: 'white'
  //   // };
  //   const wrapper = mount(<RequestDetailsModal  />);
  //   let approve = wrapper.find('#buttonId').at(0);
  //   approve.simulate('click');
  //   // console.log(approveState);
  //   expect(wrapper.state('approveColor').handleApprove).toEqual('#49AAAF');
  // });

});
