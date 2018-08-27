import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import upic from '../../images/upic.svg';
import './SideDrawer.scss';
import LeftSideBar from '../LeftSideBar/LeftSideBar';

class SideDrawer extends PureComponent {
  render() {
    const {selectedLink} = this.props;
    return (
      <div className="mdl-layout__drawer">
        <div className="side-drawer__user-details">
          <img src={upic} alt="User Profile Pix" />
          <div className="side-drawer__user-name">
          Silm Momoh
          </div>
        </div>
        <hr className="side-drawer__divider" />
        <nav className="mdl-navigation">
          <LeftSideBar selectedLink={selectedLink} />
        </nav>
      </div>
    );
  }
}
SideDrawer.propTypes = {
  selectedLink: PropTypes.string
};
SideDrawer.defaultProps = {
  selectedLink: ''
};

export default SideDrawer;
