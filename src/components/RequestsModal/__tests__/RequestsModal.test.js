import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
import ConnectedRequestDetailsModal,
{ RequestDetailsModal } from '../RequestsModal';
import { fetchRequestsDetailsResponse,
  userImage } from '../../../redux/__mocks__/mocks';

let wrapper;
const props = {
  requestId: 'xDh20cuGx',
  user: {
    picture: 'http://my-image'
  },
  requestData: {
    id: 'xDh20cuGx',
    name: 'Test user C',
    origin: 'Lagos',
    destination: 'Nairobi',
    manager: 'Samuel Kubai',
    department: 'TDD',
    role: 'Software Developer',
    status: 'Approved',
    userId: '-MUyHJmKrxA90lPNQ1FOLNm',
    departureDate: '2018-09-12',
    arrivalDate: '2018-11-12',
    createdAt: '2018-09-04T10:38:12.141Z',
    comments: [
      {
        id: 1,
        userName: 'Random User',
        comment: 'This is a comment',
        createdAt: '2018-09-04T10:38:12.141Z',
        picture: 'http://my-image'
      },
      {
        id: 2,
        userName: 'Random User Two',
        comment: 'This is another comment',
        createdAt: '2018-10-04T10:38:12.141Z',
        picture: 'http://my-image'
      },
    ]
  },
  fetchUserRequestDetails: sinon.spy(() => Promise.resolve())
};
const componentDidMountSpy = sinon.spy(RequestDetailsModal.prototype, 'componentDidMount');
const formatDateSpy = sinon.spy(RequestDetailsModal.prototype, 'formatDate');
// describe what we are testing
describe('Render RequestsModal component', () => {
  beforeEach(() => {
    wrapper = shallow(<RequestDetailsModal {...props} />);
  });
  // make our assertions and what we expect to happen
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('tests that the component successfully rendered', () => {
    expect(wrapper.find('div').exists()).toBeTruthy();
  });

  it('should call componentDidMount()', () => {
    const {fetchUserRequestDetails, requestData} =  props;
    expect(componentDidMountSpy.called).toBe(true);
    expect(fetchUserRequestDetails.called).toEqual(true);
    expect(fetchUserRequestDetails.calledWith(requestData.id)).toEqual(true); 
  });

  it('should render the RequestsModal as expected', () => {
    expect(wrapper.length).toBe(1);
  });

  it('should render approveTextColor when button is clicked', () => {
    const approveButton = wrapper.find('#b1').at(0);
    approveButton.simulate('click');
    expect(wrapper.state('approveTextColor')).toBe('white');
  });

  it('should render rejectTextColor when button is clicked', () => {
    const rejectButton = wrapper.find('#b2').at(0);
    rejectButton.simulate('click');
    expect(wrapper.state('rejectTextColor')).toBe('white');
  });

  it('should render approveColor when button is clicked', () => {
    const approveButton = wrapper.find('#b1').at(0);
    approveButton.simulate('click');
    expect(wrapper.state('approveColor')).toBe('#49AAAF');
  });

  it('should render rejectColor when button is clicked', () => {
    
    const rejectButton = wrapper.find('#b2').at(0);
    rejectButton.simulate('click');
    expect(wrapper.state('rejectColor')).toBe('#FF5359');
  });
  const initialState = {};
  const mockStore = configureStore();
  const store = mockStore(initialState);

  it('should call formatDate', () => {
    expect(formatDateSpy.called).toBe(true);
  });
  
  describe('Connected RequestDetailsModal component', () => {
    it('tests that the component successfully rendered', () => {
      const store = mockStore({
        requests: fetchRequestsDetailsResponse.requestData,
        auth: { ...userImage }
      });
      const wrapper = shallow(<ConnectedRequestDetailsModal store={store} />);
      expect(wrapper.length).toBe(1);
    });
  });

});
