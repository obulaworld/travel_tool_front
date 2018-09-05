import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LeftSideNavItems from './LeftSideNavItems/LeftSideNavItems';
import activeBookmarkIcon from '../../images/icons/bookmark_active.svg';
import inactiveBookmarkIcon from '../../images/icons/bookmark_inactive.svg';
import activeSettingsIcon from '../../images/icons/settings_active.svg';
import inactiveSettingsIcon from '../../images/icons/settings_inactive.svg';
import './_leftSideBar.scss';

export class LeftSideBar extends Component {
  state = {
    activeNavItem: {}
  };

  setActiveNavItem = clickedNavItem => {
    this.setState({ activeNavItem: clickedNavItem });
  };

  getNavigationIcons = () => {
    return {
      requestsIcon: {
        active: activeBookmarkIcon,
        inactive: inactiveBookmarkIcon
      },
      settingsIcon: {
        active: activeSettingsIcon,
        inactive: inactiveSettingsIcon
      }
    };
  };

  render() {
    const { activeNavItem } = this.state;
    const { selectedLink,  getCurrentUserRole} = this.props;
    return (
      <div className="left-sidebar">
        <div className="left-sidebar__fixed_wrapper">
          <div style={{ overflowY: 'scroll', height: '100%' }}>
            <LeftSideNavItems
              selectedLink={selectedLink}
              activeNavItem={activeNavItem}
              isAdminCheck={getCurrentUserRole}
              navIconsSource={this.getNavigationIcons()}
              setActiveNavItem={this.setActiveNavItem}
            />
          </div>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = ({ modal, role, user }) => ({
  ...user
});

LeftSideBar.propTypes = {
  selectedLink: PropTypes.string,
  getCurrentUserRole: PropTypes.string
};

LeftSideBar.defaultProps = {
  selectedLink: '',
  getCurrentUserRole: ''
};

export default connect(mapStateToProps)(LeftSideBar);
