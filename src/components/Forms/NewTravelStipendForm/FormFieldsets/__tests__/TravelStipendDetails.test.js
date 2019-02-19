import React from 'react';
import TravelStipendFieldset from '../TravelStipendDetails';

const props = {
  values: {
    centers: [{
      location: 'Nairobi, Kenya'},
    {
      location: 'Kigali, Rwanda'
    }],
    stipend: 1234
  },
  modalType: 'create travel stipend',
};

const setup = (props) => shallow(<TravelStipendFieldset {...props} />);

describe('<TravelStipendFieldset />', () => {
  it('should render properly', () => {
    const wrapper = setup(props);
    expect(wrapper.length).toBe(1);
  });

  it('should match snapshot', () => {
    const wrapper = setup(props);
    expect(wrapper).toMatchSnapshot();
  });
});
