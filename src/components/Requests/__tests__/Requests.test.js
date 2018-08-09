import React from 'react';
import Requests from '../Requests';

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
      'id':'645923RTF',
      'destination':'New York',
      'origin':'Nairobi',
      'duration':'3 days',
      'startDate':'12 Oct 2018',
      'status':'Rejected'
    },
    {
      'id':'545923RTF',
      'destination':'Kampala',
      'origin':'Nairobi',
      'duration':'3 days',
      'startDate':'12 Oct 2018',
      'status':'Approved'
    }
  ]
};

const wrapper = shallow(<Requests {...props} />);

describe('<Requests />', () => {
  it('should render the requests table when there are requests', () => {
    expect(wrapper.find('table.mdl-data-table').length).toBe(1);
    expect(wrapper.find('.table__row').length).toBe(3);
  });

  it('adds the appropriate class based on the status of the request', () => {
    expect(wrapper.find('#status-745923RTF').hasClass('request__status--open')).toEqual(true);
    expect(wrapper.find('#status-645923RTF').hasClass('request__status--rejected')).toEqual(true);
    expect(wrapper.find('#status-545923RTF').hasClass('request__status--approved')).toEqual(true);
  });

  it('should render a div when there are no requests', () => {
    wrapper.setProps({requests: []});
    expect(wrapper.find('table.mdl-data-table').length).toBe(0);
    expect(wrapper.find('div.table__requests--empty').length).toBe(1);
    expect(wrapper.find('div.table__requests--empty').text())
      .toEqual('You have no requests at the moment');
  });
});

