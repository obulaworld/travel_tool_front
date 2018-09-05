import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './SideDrawer.scss';
import ConnectedLeftSideBar from '../LeftSideBar/LeftSideBar';
import ImageLink from '../image-link/ImageLink';

export class SideDrawer extends PureComponent {
  render() {
    const { selectedLink, user, showDrawer } = this.props;
    const showDrawerTransition = showDrawer === 'none'? 'side-drawer__slide-in' : 'side-drawer__slide-out';
    return (
      <div className={`side-drawer ${showDrawerTransition}`}>
        <div className="side-drawer__user-details">
          <ImageLink
            altText="User profile picture"
            imageClass="navbar__mdl-upic"
            imageSrc={user ? user.UserInfo.picture : ''}
          />
          <div className="side-drawer__user-name">
            {user ? user.UserInfo.name : ''}
          </div>
        </div>
        <hr className="side-drawer__divider" />
        <nav className="mdl-navigation">
          <ConnectedLeftSideBar selectedLink={selectedLink} />
        </nav>
      </div>
    );
  }
}
SideDrawer.propTypes = {
  selectedLink: PropTypes.string,
  user: PropTypes.object.isRequired,
  showDrawer: PropTypes.string
};
SideDrawer.defaultProps = {
  selectedLink: '',
  showDrawer: 'block'
};

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(SideDrawer);
