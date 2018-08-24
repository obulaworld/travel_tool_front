import React from 'react';
import SideDrawer from '../SideDrawer';


const wrapper = shallow(<SideDrawer />);

it('should render the page', () => {
    expect(wrapper.find('div').length).toBe(3);
});
