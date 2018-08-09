import React from 'react';
import sinon from 'sinon';
import RequestsPage from '../RequestsPage';

const props = {
  requests: [
    {
      'id':'745923RTF',
      'destination':'Lagos',
      'origin':'Nairobi',
      'duration':'3 days',
      'startDate':'12 Oct 2018',
      'status':'Open'
    },
    {
      'id':'745923RTF',
      'destination':'New York',
      'origin':'Nairobi',
      'duration':'3 days',
      'startDate':'12 Oct 2018',
      'status':'Rejected'
    },
    {
      'id':'745923RTF',
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
  }
};

const wrapper = shallow(<RequestsPage {...props} />);
const spy = sinon.spy(wrapper.instance(), 'onPageChange');

describe('<RequestsPage>', () => {
  it('should render the Requests and Pagination components successfully', () => {
    expect(wrapper.find('Requests').length).toBe(1);
    expect(wrapper.find('Pagination').length).toBe(1);
  });

  it('calls the onPageChange method', () => {
    wrapper.instance().onPageChange(2);
    expect(spy.calledOnce).toEqual(true);
    expect(spy.calledWith(2)).toEqual(true);
  });
});
