import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import editIcon from '../../images/edit.svg';
import cancelIcon from '../../images/cancel.svg';

class TableMenu extends PureComponent {
  handleIconOpentoggle = (toggleMenu, requestId) => {
    return (
      <i
        className="fa fa-ellipsis-v"
        id="toggleIcon"
        role="presentation"
        onClick={() => toggleMenu(requestId)}
      />
    );
  };

  handleIconClosetoggle = (toggleMenu, requestId) => {
    return (
      <li
        className="table__menu-list-item"
        id="toggleButton"
        onClick={() => toggleMenu(requestId)}
        role="presentation"
      >
        <img src={cancelIcon} alt="cancel-icon" className="menu-icon" />
        Cancel
      </li>
    );
  };

  renderToggle = () => {
    const {
      toggleMenu,
      editRequest,
      request,
      type,
      requestStatus,
      menuOpen } = this.props;
    const openMenu = menuOpen.id === request.id && menuOpen.open;

    return (
      <div>
        {this.handleIconOpentoggle(toggleMenu, request.id)}
        <div className={`table__menu-container ${openMenu ? 'open' : ''}`}>
          {type === 'requests' &&
            requestStatus === 'Open' && (
            <ul className="table__menu-list">
              <li
                className="table__menu-list-item"
                id="iconBtn"
                onClick={() => {
                  editRequest(request.id);
                  toggleMenu(request.id);
                }}
                role="presentation"
              >
                <img src={editIcon} alt="edit-icon" className="menu-icon" />
                  Edit
              </li>
              {this.handleIconClosetoggle(toggleMenu, request.id)}
            </ul>
          )}
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="menu__container">
        {this.renderToggle()}
      </div>
    );
  }
}

TableMenu.propTypes = {
  editRequest: PropTypes.func.isRequired,
  request: PropTypes.object.isRequired,
  requestStatus: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  menuOpen: PropTypes.object.isRequired
};

export default TableMenu;
