import React from 'react'
import Spinner from '..';


describe('<FilterContext />', () => {
  const wrapper = shallow(<Spinner />);

  it('should render without crushing', () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper).toMatchSnapshot();
  });
});
