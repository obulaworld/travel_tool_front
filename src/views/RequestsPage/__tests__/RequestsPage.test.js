import React from 'react';
import sinon from 'sinon';
import { MemoryRouter } from 'react-router-dom';

import RequestsPage from '../RequestsPage';

const props = {
  requests: [
    {
      'id':1,
      'destination':'Lagos',
      'origin':'Nairobi',
      'duration':'3 days',
      'startDate':'12 Oct 2018',
      'status':'Open'
    },
    {
      'id':2,
      'destination':'New York',
      'origin':'Nairobi',
      'duration':'3 days',
      'startDate':'12 Oct 2018',
      'status':'Rejected'
    },
    {
      'id':3,
      'destination':'Kampala',
      'origin':'Nairobi',
      'duration':'3 days',
      'startDate':'12 Oct 2018',
      'status':'Approved'
    }
  ],
  pagination: {
    currentPage: 2,
    pageCount: 4,
    onPageChange: sinon.spy(),
  },
  history: {
    push: jest.fn()
  }
};

describe('<RequestsPage>', () => {
  beforeEach(() => {
    // wrapper.unmount();
  });

  it('should render the RequestsPage without crashing', () => {
    const wrapper = shallow(<RequestsPage {...props} />);
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });

  it('calls the onPageChange method', () => {
    const spy = sinon.spy(RequestsPage.prototype, 'onPageChange');
    const wrapper = mount(
      <MemoryRouter>
        <RequestsPage {...props} />
      </MemoryRouter>
  );
    wrapper.find('#next-button').simulate('click');
    expect(spy.calledOnce).toEqual(true);
    wrapper.find('#previous-button').simulate('click');
    expect(spy.calledWith(2)).toEqual(true);
    wrapper.unmount();
  });

  it('should render all the components except the notification pane', () => {
    const wrapper = shallow(<RequestsPage {...props} />);
    expect(wrapper.find('NavBar').length).toBe(1);
    expect(wrapper.find('.rp-requests__header').length).toBe(1);// RequestsPanelHeader
    expect(wrapper.find('Requests').length).toBe(1);
    expect(wrapper.find('.sidebar').length).toBe(1);// LeftSideBar
    // Since the element is always on the DOM, the page length will always be one
    // so I'm chcking if the 'hide' class exists
    // the presnce of the 'hide' class means that the elemnt has been hidden
    // the absence means the element is visible
    expect(wrapper.find('.notification .hide').exists()).toBeTruthy();
    // expect(wrapper.find('NotificationPane').length).toBe(0);
    expect(wrapper.find('Pagination').length).toBe(1);
    wrapper.unmount();
  });

  it('should display the notification pane when the notification icon gets clicked', () => {
    const wrapper = mount(
      <MemoryRouter>
        <RequestsPage {...props} />
      </MemoryRouter>
    );
    const notificationIcon = wrapper.find('.navbar__navbar-notification');
    notificationIcon.simulate('click');
    expect(wrapper.find('.notification').exists()).toBeTruthy();
    expect(wrapper.find('.notification .hide').exists()).toBeFalsy();
    expect(wrapper.find('.sidebar .hide').exists()).toBeTruthy();
    expect(wrapper.find('.sidebar .hide').length).toBe(1);
    expect(wrapper.find('Requests').exists()).toBeTruthy();
    expect(wrapper.find('NavBar').exists()).toBeTruthy();
    wrapper.unmount();
  });

  it('should close the notification pane when the close icon is clicked', () => {
    const wrapper = mount(
      <MemoryRouter>
        <RequestsPage {...props} />
      </MemoryRouter>
    );
    const closeIcon = wrapper.find('.notifications-header__close-btn');
    closeIcon.simulate('click');
    expect(wrapper.find('.notification .hide').exists()).toBeTruthy();
    expect(wrapper.find('.sidebar .hide').exists()).toBeFalsy();
    expect(wrapper.find('.sidebar .hide').length).toBe(0);
    expect(wrapper.find('Requests').exists()).toBeTruthy();
    expect(wrapper.find('NavBar').exists()).toBeTruthy();
    wrapper.unmount();
  });

  it.skip('should log the user out when the logout button is clicked', () => {
    const wrapper = mount(<RequestsPage {...props} />);
    const spy = sinon.spy(wrapper.instance(), 'logout');
    // window.location.replace = jest.fn();
    wrapper.find('#logout').simulate('click');
    expect(spy.calledOnce).toEqual(true);
    // expect(window.location.replace).toHaveBeenCalledWith('/');
    expect(history.push).toHaveBeenCalledWith('/');
  });
});
