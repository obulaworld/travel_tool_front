import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
import ConnectedRequestDetailsModal,
{ RequestDetailsModal } from '../RequestsModal';
import { fetchRequestsDetailsResponse,
  userImage } from '../../../redux/__mocks__/mocks';
import requestData from '../__mocks__/requestData';

let wrapper;
const props = {
  requestId: 'xDh20cuGx',
  user: {
    picture: 'http://my-image'
  },
  requestData,
  fetchUserRequestDetails: sinon.spy(() => Promise.resolve()),
  requests: {
    requestData: {
      id: '1',
      name: 'Orion',
      status: 'Approved'
    }
  },
  updateRequestStatus: jest.fn(() => Promise.resolve()),
  isStatusUpdating: false
};
const componentDidMountSpy = sinon.spy(RequestDetailsModal.prototype, 'componentDidMount');
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

  it('should call renderStatusAsBadge function', () => {
    const action = wrapper.instance();
    const renderStatusAsBadge = jest.spyOn(wrapper.instance(), 'renderStatusAsBadge');
    action.renderStatusAsBadge('Approved');
    expect(renderStatusAsBadge).toBeCalled();
  });

  it('should call changeButtonColor function', () => {
    const button = {
      id: 1,
    };
    const action = wrapper.instance();
    const changeButtonColor = jest.spyOn(wrapper.instance(), 'changeButtonColor');
    action.changeButtonColor(button, 'Rejected');
    expect(changeButtonColor.mock.calls.length).toBe(1);
  });

  describe('Connected RequestDetailsModal component', () => {
    it('tests that the component successfully rendered', () => {
      const store = mockStore({
        requests: fetchRequestsDetailsResponse.requestData,
        auth: { ...userImage },
        approvals: [],
        modal: {modal: {}}
      });
      const wrapper = shallow(<ConnectedRequestDetailsModal store={store} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
