import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import LeftSidebarNavItem from './LeftSideNavItem/LeftSideNavItem';
import './_leftSideNavItems.scss';
import DropdownItem from './DropdownItems/DropdownItem/DropdownItem';
import { logoutUser } from '../../../helper/userDetails';

class LeftSideNavItems extends PureComponent {
  static propTypes = {
    setActiveNavItem: PropTypes.func.isRequired,
    activeNavItem: PropTypes.object.isRequired,
    navIconsSource: PropTypes.object.isRequired,
    history: PropTypes.shape({}).isRequired
  };

  static childContextTypes = {
    activeNavItem: PropTypes.object.isRequired,
    setActiveNavItem: PropTypes.func.isRequired
  };

  getChildContext() {
    const { setActiveNavItem, activeNavItem } = this.props;
    return {
      activeNavItem,
      setActiveNavItem
    };
  }

  signout = () => {
    const { history } = this.props;
    logoutUser(history);
  };

  renderLogout = () => {
    return (
      <Fragment>
        <a
          href="/"
          id="signoutLink"
          className="side-drawer__logout-text"
          onClick={this.signout}
        >
          <i className="material-icons logout-sym">
power_settings_new
          </i>
          <span>
Logout
          </span>
        </a>
      </Fragment>
    );
  };

  renderRequestsDropdownItems = () => {
    const { selectedLink } = this.props;
    let requestActive, approvalActive;
    [requestActive, approvalActive] =
      selectedLink === 'request page' ? ['active', ''] : ['', 'active'];
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
  };

  renderSettingsDropdownItems = () => {
    const { selectedLink, isAdminCheck } = this.props;
    let userRoles;
    [userRoles] =
      selectedLink === 'settings page' ? ['active', ''] : ['', 'active'];
    return (
      <Fragment>
        {isAdminCheck && isAdminCheck === 'Super Administrator' ? (
          <DropdownItem link_to="/settings/roles">
          User Roles
          </DropdownItem>
        ) : null}
      </Fragment>
    );
  };

  render() {
    const { navIconsSource } = this.props;
    return (
      <ul>
        <LeftSidebarNavItem
          isDropdown
          linkIcons={navIconsSource.requestsIcon}
          link_to="/requests"
          text="Requests"
        >
          {this.renderRequestsDropdownItems()}
        </LeftSidebarNavItem>
        <LeftSidebarNavItem
          isDropdown
          linkIcons={navIconsSource.settingsIcon}
          link_to="/settings"
          text="Settings"
        >
          {this.renderSettingsDropdownItems()}
        </LeftSidebarNavItem>
        {this.renderLogout()}
      </ul>
    );
  }
}

LeftSideNavItems.propTypes = {
  selectedLink: PropTypes.string,
  isAdminCheck: PropTypes.string
};

LeftSideNavItems.defaultProps = {
  selectedLink: '',
  isAdminCheck: ''
};

export default LeftSideNavItems;
