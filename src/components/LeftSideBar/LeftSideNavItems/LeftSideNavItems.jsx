import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import LeftSidebarNavItem from './LeftSideNavItem/LeftSideNavItem';
import './_leftSideNavItems.scss';
import { logoutUser } from '../../../helper/userDetails';


class LeftSideNavItems extends PureComponent {

  static propTypes = {
    setActiveNavItem: PropTypes.func.isRequired,
    activeNavItem: PropTypes.object.isRequired,
    navIconsSource: PropTypes.object.isRequired,
    history: PropTypes.shape({}).isRequired,
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

  signout = () => {
    const { history } = this.props;
    logoutUser(history);
  }

  renderLogout = () => {
    return(
      <Fragment>
        
        <a href="/" id="signoutLink" className="side-drawer__logout-text" onClick={this.signout}>
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
    const{selectedLink} = this.props;
    let requestActive, approvalActive;
    [requestActive, approvalActive] = selectedLink === 'request page'? ['active', ''] : ['', 'active'];
    return (
      <Fragment>
        <a href="/requests" className={`left-sidebar__dropdown-links ${requestActive}`} onClick={this.handleClick}>
            My Requests
        </a>
        <a href="/requests/my-approvals" className={`left-sidebar__dropdown-links ${approvalActive}`}>
          My Approvals
        </a>
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

LeftSideNavItems.propTypes = {
  selectedLink: PropTypes.string,
};

LeftSideNavItems.defaultProps = {
  selectedLink: ''
};

export default LeftSideNavItems;
