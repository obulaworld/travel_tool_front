import React, { PureComponent, Fragment } from 'react';
import {withRouter} from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { logoutUser } from '../../../helper/userDetails';
import LeftSidebarNavItem from './LeftSideNavItem/LeftSideNavItem';
import DropdownItem from './DropdownItems/DropdownItem/DropdownItem';
import logoutInactiveIcon from '../../../images/icons/logout_inactive.svg';
import './_leftSideNavItems.scss';


class LeftSideNavItems extends PureComponent {

  static propTypes = {
    setActiveNavItem: PropTypes.func.isRequired,
    activeNavItem: PropTypes.object.isRequired,
    userRole: PropTypes.string,
    metadata: PropTypes.arrayOf(PropTypes.object).isRequired,
    history: PropTypes.object
  };

  static childContextTypes = {
    activeNavItem: PropTypes.object.isRequired,
    setActiveNavItem: PropTypes.func.isRequired
  };

  static defaultProps = {
    userRole: '',
    history: {}
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
  };

  isLinkVisible = (dropdownItem, userRole) => {
    const {onlyVisibleTo} = dropdownItem;
    const showItem = !onlyVisibleTo || onlyVisibleTo.includes(userRole);
    return showItem;
  }

  generateDropdownContents = (items) => {
    const {userRole} = this.props;
    const dropDownItems = items.map(dropdownItem => {
      // show if item.onlyVisibleTo is not defined or if it is defined and it includes the current users role
      const showItem = this.isLinkVisible(dropdownItem, userRole);
      return showItem ? this.renderDropdownItem(dropdownItem): null;
    });
    return dropDownItems;
  }

  generateNavItems(metadata, userRole) {
    const navItems = metadata.map(navItem => {
      // show if item.onlyVisibleTo is not defined or if it is defined and it includes the current users role
      const showItem = this.isLinkVisible(navItem, userRole);
      return showItem ? this.renderNavItem(navItem) : null;
    });
    return navItems;
  }

  renderDropdownItem = (dropdownItem) => {
    return (
      <DropdownItem key={dropdownItem.text} link_to={dropdownItem.link_to}>
        {dropdownItem.text}
      </DropdownItem>
    );
  }

  renderNavItem = (navItem) => {
    const {isDropdown, dropdownItems} = navItem;
    return (
      <LeftSidebarNavItem
        key={navItem.text}
        isDropdown={navItem.isDropdown}
        linkIcons={navItem.icons}
        link_to={navItem.link_to}
        activateOnLogin={navItem.activateOnLogin}
        text={navItem.text}
        onClick={this[navItem.onClick]}
        className={navItem.variantClassName}
      >
        {isDropdown? this.generateDropdownContents(dropdownItems): null}
      </LeftSidebarNavItem>
    );
  }

  render() {
    const {metadata, userRole} = this.props;
    return (
      <ul>
        {/* Use the Metadata module to add navigation items */}
        { this.generateNavItems(metadata, userRole) }
      </ul>
    );
  }
}

export default withRouter(LeftSideNavItems);
