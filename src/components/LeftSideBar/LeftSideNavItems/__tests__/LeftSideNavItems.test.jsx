import React from 'react';
import Cookie from 'cookies-js';
import { MemoryRouter } from 'react-router-dom';
import LeftSideNavItems from '../LeftSideNavItems';

describe('<LeftSideNavItems />', () => {
  let wrapper;

  const props = {
    history: {
      push: jest.fn
    }
  };

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
          {...props}
        />
      </MemoryRouter>
    );
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('it renders two dropdown items', () => {
    const dropDownItems = wrapper.find('DropdownItem');
    expect(dropDownItems).toHaveLength(0);
  });

  it('should log user out when the logout link is clicked', () => {
    wrapper.find('#signoutLink').simulate('click');
    const token = Cookie.get('login-status');
    const loginStatus = Cookie.get('jwt-token');
    expect(token).toEqual(undefined);
    expect(loginStatus).toEqual(undefined);
  });
});
