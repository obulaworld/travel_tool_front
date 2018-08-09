import React, { PureComponent } from 'react';
import icon from '../../images/drop-down-icon.svg';
import './_headerPagination.scss';

class HeaderPagination extends PureComponent{
  render(){
    return(
      <div className="cell-item-per-page">
        <div className="cell-items-per-page-text">
          <span className="items-per-page-text">
              Items per page
          </span>
        </div>
        <div className="divider" />
        <div className="items-per-page-paginator">
          <div className="paginator-counter">
            <span className="paginator-counter">
                10
            </span>
          </div>
          <div className="paginator-counter">
            <span>
              <img src={icon} alt="Andela Logo" />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default HeaderPagination;
