import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import travela from '../../images/travela.svg';
import icon from '../../images/drop-down-icon.svg';
import notification from '../../images/notification.svg';
import SearchBar from '../search-bar/SearchBar';
import Button from '../buttons/Buttons';
import ImageLink from '../image-link/ImageLink';
import './NavBar.scss';

/**
 * @description - Contains SearhBar componentents, Logo, user avatar and logout
 *
 * @class NavBar
 *
 * @extends {PureComponent}
 *
 */

class NavBar extends PureComponent {
  renderLogo() {
    return (
      <span className="navbar__logo-icons">
        <img src={travela} alt="Andela Logo" />
      </span>
    );
  }

  renderNotification() {
    const { onNotificationToggle } = this.props;
    return (
      <div
        id="notification"
        onClick={onNotificationToggle}
        className="navbar__nav-size"
        role="presentation"
      >
        <span className="material-icons mdl-badge navbar__badge" data-badge="12">
          <img
            src={notification}
            alt="Notification"
            className="navbar__navbar-notification"
          />
        </span>
      </div>
    );
  }

  renderUserIcons() {
    const { avatar } = this.props;
    return (
      <div>
        <span className="navbar__mdl-icons">
          <ImageLink imageSrc={avatar} altText="Andela Logo" imageClass="navbar__mdl-upic" />
          <span className="navbar__text-size">
            Silm Momoh
          </span>
        </span>
        <span>
          <Button 
            imageSrc={icon} altText="Dropdown Icon" buttonId="demo-menu-lower-right" imageClass="navbar__mdl-Icon" buttonType="button" 
            buttonClass="mdl-button mdl-js-button mdl-button--icon mdl-Icons" />
          <div className="navbar__mdl-list">
            <ul htmlFor="demo-menu-lower-right" className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect navbar__menu">
              <li className="mdl-menu__item navbar__menu-item">
                Logout
              </li>
            </ul>
          </div>
        </span>
      </div>
    );
  }

  render() {
    return (
      <header className="mdl-layout__header navbar__layout_header">
        <div className="mdl-layout__header-row">
          <div className="navbar__nav-size navbar__logo-icons">
            {this.renderLogo()}
          </div>
          <div className="mdl-layout-spacer" />
          <div className="navbar__search-size">
            <SearchBar />
          </div>
          <nav className="mdl-navigation">
            {this.renderNotification()}
            <div className="navbar__user-icon navbar__nav-size">
              {this.renderUserIcons()}
            </div>
          </nav>
        </div>
      </header>
    );
  }
}

NavBar.propTypes = {
  avatar: PropTypes.string.isRequired,
  onNotificationToggle: PropTypes.func.isRequired
};

export default NavBar;
