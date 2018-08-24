import React, { PureComponent, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import LeftSidebarNavItem from './LeftSideNavItem/LeftSideNavItem';
import DropdownItem from './DropdownItems/DropdownItem/DropdownItem';
import './_leftSideNavItems.scss';


class LeftSideNavItems extends PureComponent {

  static propTypes = {
    setActiveNavItem: PropTypes.func.isRequired,
    activeNavItem: PropTypes.object.isRequired,
    navIconsSource: PropTypes.object.isRequired
  };

  static childContextTypes = {
    activeNavItem: PropTypes.object.isRequired,
    setActiveNavItem: PropTypes.func.isRequired
  };

  getChildContext() {
    const {setActiveNavItem, activeNavItem} = this.props;
    return {
      activeNavItem,
      setActiveNavItem
    };
  }

  renderLogout = () => {
    return(
      <Fragment>
        
        <a href="/" className="side-drawer__logout-text">
          <i className="material-icons logout-sym">
        power_settings_new
          </i>
          <span>
            Logout

          </span>
        </a>
      </Fragment>
    );
  }
  renderRequestsDropdownItems = () => {
    return (
      <Fragment>
        <DropdownItem link_to="/requests">
          My Requests
        </DropdownItem>
        <DropdownItem link_to="/requests/my-approvals">
          My Approvals
        </DropdownItem>
      </Fragment>
    );
  }

  render() {
    const { navIconsSource } = this.props;

    return (
      <ul>
        <LeftSidebarNavItem isDropdown linkIcons={navIconsSource.requestsIcon} link_to="/requests" text="Requests">
          { this.renderRequestsDropdownItems() }
        </LeftSidebarNavItem>
        <LeftSidebarNavItem linkIcons={navIconsSource.settingsIcon} link_to="/settings" text="Settings" />
        {this.renderLogout()}
      </ul>
    );
  }
}

export default LeftSideNavItems;
