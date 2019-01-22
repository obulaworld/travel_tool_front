import React, {Component} from 'react';
import PropTypes from 'prop-types';

class TemplatesMenu extends Component {
  state = {
    openClose: ''
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.clickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.clickOutside);
  }

  toggleMenu = (e) => {
    e.preventDefault();
    const { openClose } = this.state;
    this.setState({
      openClose: openClose === ''? 'open': '',
    });
  };

  setRef = (node) => this.wrapperRef = node;

  clickOutside = (e) => {
    if (!this.wrapperRef.contains(e.target)) {
      this.setState({
        openClose: ''
      });
    }
  };

  MenuContainer = (disableEnable, openClose) => (
    <div ref={this.setRef} className={`table__menu-container ${openClose}`}>
      <ul className="table__menu-list">
        <li className="table__menu-list-item top">
          <span className="edit">Edit</span>
        </li>
        <li className="table__menu-list-item bottom">
          <span className="disable">{disableEnable?'Enable':'Disable'}</span>
        </li>
      </ul>
    </div>
  );

  render() {
    const { openClose } = this.state;
    const { disableEnable } = this.props;
    return (
      <span>
        <i
          className="fa fa-ellipsis-v on"
          id="toggleIcon"
          role="presentation"
          onClick={this.toggleMenu}
        />
        {this.MenuContainer(disableEnable, openClose)}
      </span>
    );
  }
}

TemplatesMenu.propTypes = {
  disableEnable: PropTypes.bool.isRequired
};

export default TemplatesMenu;
