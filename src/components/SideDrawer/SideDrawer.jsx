import React, { Component } from 'react';

import upic from '../../images/upic.svg';
import './SideDrawer.scss';
import LeftSideBar from '../LeftSideBar/LeftSideBar';

class SideDrawer extends Component {

 
  render() {
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
          <LeftSideBar />
        </nav>
      </div>
    );
  }
}

export default SideDrawer;
