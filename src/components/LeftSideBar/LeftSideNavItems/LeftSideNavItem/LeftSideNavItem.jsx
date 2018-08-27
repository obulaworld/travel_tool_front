import React, { PureComponent, Fragment } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import DropdownHelper from '../DropdownItems/utils/dropdownHelper';
import './_leftSideNavItem.scss';

export class LeftSideNavItem extends PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    link_to: PropTypes.string.isRequired,
    linkIcons: PropTypes.object.isRequired,
    isDropdown: PropTypes.bool,
    children: PropTypes.oneOfType([
      PropTypes.object.isRequired,
      PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
    ]),
    match: PropTypes.object.isRequired
  }

  static contextTypes = {
    activeNavItem: PropTypes.object.isRequired,
    setActiveNavItem: PropTypes.func.isRequired
  }

  static defaultProps = {
    children: {},
    isDropdown: false
  }

  constructor(props) {
    super(props);
    this.dropdownHelper = new DropdownHelper();
    this.state = {
      dropdownOpen: true,
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    // clicking on the navigation items will cause the items to receive new context and
    // this will be is fired to determine
    if(nextContext.activeNavItem !== this)
      this.setState({dropdownOpen: false});
  }

  getType = () => {
    const { isDropdown } = this.props;
    return isDropdown? DropdownNavLink: NavLink;
  }

  getDropdownElements = () => {
    const { dropdownOpen } = this.state;
    const  linkIsActive = this.isActive();

    const { children } = this.props;
    const options = { linkIsActive, dropdownOpen };
    return this.dropdownHelper.getElements(options, children);
  }

  isActive = () => {
    const { match, link_to } = this.props;
    const { activeNavItem } = this.context;
    return (activeNavItem === this) || match.path.startsWith(link_to);
  }

  handleClicked = () => {
    const {setActiveNavItem} = this.context;
    setActiveNavItem(this);
    const {dropdownOpen} = this.state;
    this.setState({dropdownOpen: !dropdownOpen});
  }

  render() {
    const {text, link_to, linkIcons, isDropdown } = this.props;
    const dropdownElements = isDropdown? this.getDropdownElements(): null;
    const status = this.isActive()? 'active': 'inactive';
    // switch between rendering a NavLink and a DropdownNavLink
    const NavLinkItem = this.getType();

    return (
      <Fragment>
        <li className={`left-side-nav-item ${status}`}>
          <a className="nav-link" role="button" onClick={this.handleClicked} href={link_to} onKeyPress={() => {}} tabIndex="0">
            <div className="left-side-nav-item__left-icon">
              <img src={this.isActive()? linkIcons.active: linkIcons.inactive} alt="icon" />
            </div>
            <div className="left-side-nav-item__nav-text">
              {text}
            </div>
            { isDropdown? dropdownElements.icon: null }
          </a>
        </li>
        { isDropdown? dropdownElements.items: null }
      </Fragment>
    );
  }
}

export const DropdownNavLink = (props) => {
  const { children } = props;
  return (
    <div {...props}>
      {children}
    </div>
  );
};

DropdownNavLink.propTypes = {
  children: PropTypes.array.isRequired,
};

export default withRouter(LeftSideNavItem);
