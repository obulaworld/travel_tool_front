import React, { PureComponent } from 'react';
import './buttonGroup.scss';

class ButtonGroup extends PureComponent {
  render() {
    return (
      <div className="button-group">
        <button type="button" className="bg-btn bg-btn--active">
              All
        </button>

        <button type="button" className="bg-btn bg-btn--with-badge">
          <span className="label">
            Open Reqeusts
          </span>
          <span className="badge">
            3
          </span>
        </button>

        <button type="button" className="bg-btn">
            Past Requests
        </button>
      </div>
    );
  }
}


export default ButtonGroup;
