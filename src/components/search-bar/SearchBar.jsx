import React, { PureComponent } from 'react';

import Loupe from '../../images/Loupe.svg';
import './SearchBar.scss';


/**
 * @description - Contains search bar
 *
 * @class SearchBar
 *
 * @extends {PureComponent}
 *
 */


class SearchBar extends PureComponent {
  render() {
    return (
      <div className="mdl-search searchbar__search">
        <img src={Loupe} alt="Search Icon" className="searchbar__search-icon" />
        <form action="#">
          <input
            className="input-format"
            type="text"
            placeholder="Search requests, team members, etc"
            size="1"
          />
        </form>
      </div>
    );
  }
}
export default SearchBar;
