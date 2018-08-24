import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import travela from '../../images/travela.svg';
import icon from '../../images/drop-down-icon.svg';
import notification from '../../images/notification.svg';
import SearchBar from '../search-bar/SearchBar';
import Button from '../buttons/Buttons';
import ImageLink from '../image-link/ImageLink';
import { logoutUser } from '../../helper/userDetails';
import './NavBar.scss';

/**
 * @description - Contains SearhBar componentents, Logo, user avatar and logout
 *
 * @class NavBar
 *
 * @extends {PureComponent}
 *
 */

export class NavBar extends PureComponent {
  logout = () => {
    const { history } = this.props;
    logoutUser(history);
  };

  logoutLink() {
    return (
      <span>
        <Button 
          imageSrc={icon} altText="Dropdown Icon" buttonId="demo-menu-lower-right" imageClass="navbar__mdl-Icon" buttonType="button" 
          buttonClass="mdl-button mdl-js-button mdl-button--icon mdl-Icons" />
        <div className="navbar__mdl-list">
          <ul htmlFor="demo-menu-lower-right" className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect navbar__menu">
            <li className="mdl-menu__item navbar__menu-item">
              <div
                onClick={this.logout} 
                id="logout"
                role="presentation">
              Logout
              </div>
            </li>
          </ul>
        </div>
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

  renderLogo() {
    return (
      <span className="navbar__logo-icons">
        <img src={travela} alt="Andela Logo" />
      </span>
    );
  }

  renderUserIcons() {
    const { avatar, user } = this.props;
    return (
      <div>
        <span className="navbar__mdl-icons">
          <ImageLink imageSrc={user ? user.UserInfo.picture : avatar} altText="Andela Logo" imageClass="navbar__mdl-upic" />
          <span className="navbar__text-size">
            {user ? user.UserInfo.name : ''}
          </span>
        </span>
        {this.logoutLink()}
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
  onNotificationToggle: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({}).isRequired,
  avatar: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default withRouter(connect(mapStateToProps)(NavBar));
