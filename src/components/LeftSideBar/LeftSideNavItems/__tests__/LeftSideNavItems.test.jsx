import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import LeftSideNavItems from '../../LeftSideNavItems/LeftSideNavItems';

describe('<LeftSideNavItems />', () => {
  let wrapper;

  beforeEach(() => {
    const navIconsSource = {
      requestsIcon: {
        active: 'test.svg',
        inactive: 'test.svg'
      },
      settingsIcon: {
        active: 'test.svg',
        inactive: 'test.svg'
      },
    };

    wrapper = mount(
      <MemoryRouter>
        <LeftSideNavItems
          activeNavItem={{}}
          navIconsSource={navIconsSource}
          setActiveNavItem={jest.fn}
        />
      </MemoryRouter>
    );
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('it renders two dropdown items', () => {
    const dropDownItems = wrapper.find('DropdownItem');
    expect(dropDownItems).toHaveLength(2);
  });
});
