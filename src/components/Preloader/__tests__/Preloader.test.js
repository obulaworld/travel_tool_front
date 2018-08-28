import React from 'react';
import { shallow } from 'enzyme';
import Preloader from '../Preloader';

describe('Preloader', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Preloader />);
    expect(wrapper).toMatchSnapshot();
  });
});
