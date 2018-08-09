import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import LeftSideBar from '../LeftSideBar';

describe('<LeftSideBar />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<LeftSideBar />);
    expect(wrapper).toMatchSnapshot();
  });

  it('changes active navigation link', () => {
    expect.assertions(2);
    const wrapper = mount(
      <MemoryRouter>
        <LeftSideBar />
      </MemoryRouter>
    );

    const defaultActiveNavItem = {};
    expect(wrapper
      .find(LeftSideBar)
      .instance().state.activeNavItem
    ).toEqual(defaultActiveNavItem);

    wrapper.find('a.left-side-nav-item').first().simulate('click');
    const newState = wrapper.find(LeftSideBar).instance().state;
    expect(newState.activeNavItem).not.toEqual(defaultActiveNavItem);
  });
});
