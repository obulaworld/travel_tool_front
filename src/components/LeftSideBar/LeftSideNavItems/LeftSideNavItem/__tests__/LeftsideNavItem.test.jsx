import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { LeftSideNavItem } from '../../../LeftSideNavItems/LeftSideNavItem/LeftSideNavItem';
import DropdownItem from '../../../LeftSideNavItems/DropdownItems/DropdownItem/DropdownItem';

describe('<LeftSideNavItem />', () => {

  let match, wrapper;

  beforeEach(() => {
    match = {path: '/test-link'};

    const full_context = {
      context: {
        setActiveNavItem: jest.fn,
        activeNavItem: {},
      },
      childContextTypes: {
        setActiveNavItem: PropTypes.func.isRequired,
        activeNavItem: PropTypes.object.isRequired
      }};

    wrapper = mount(
      <MemoryRouter>
        <LeftSideNavItem
          text="Test link"
          isDropdown
          linkIcons={{active: 'test.svg', inactive: 'test.svg'}}
          match={match}
          link_to="/test-link">
          <DropdownItem link_to="/home">
            us
          </DropdownItem>
          <DropdownItem link_to="/home">
            us
          </DropdownItem>
        </LeftSideNavItem>
      </MemoryRouter>, full_context
    );});

  it('renders the LeftSideNavItem', () => {
    expect(wrapper).toMatchSnapshot();
  });


  describe('<LeftSideNavItem /> with dropdown', () => {

    it('renders as dropdown', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('toggles dropdown', () => {
      const expectedStateOnClick = { dropdownOpen: true };

      wrapper.find('a.left-side-nav-item').first().simulate('click');
      const stateOnClick = wrapper
        .find(LeftSideNavItem)
        .instance()
        .state;
      expect(stateOnClick).toEqual(expectedStateOnClick);
    });

    it('closes dropdown its when it is not the active item', () => {
      const expectedStateOnClick = { dropdownOpen: false };
      wrapper.setContext({activeNavItem: {}});
      const stateOnNewProps = wrapper
        .find(LeftSideNavItem)
        .instance()
        .state;
      expect(stateOnNewProps).toEqual(expectedStateOnClick);
    });
  });
});
