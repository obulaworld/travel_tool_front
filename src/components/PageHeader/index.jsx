import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './_header.scss';

class PageHeader extends PureComponent {
  render() {
    const {
      title, actionBtn, openModal, titleClassName, location
    } = this.props;

    return (
      <div className="PageHeader">
        <div>
          <span className={titleClassName}>
            {title}
          </span>
          {location && (
            <span className="location">
              {location}
            </span>
          )}
        </div>
        {actionBtn ? (
          <div>
            <button
              onClick={() => openModal(true, 'new model')}
              type="button"
              className="action-btn btn-new-request"
            >
              {actionBtn}
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default PageHeader;

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  actionBtn: PropTypes.string,
  openModal: PropTypes.func,
  location: PropTypes.string,
  titleClassName: PropTypes.string,
};

PageHeader.defaultProps = {
  actionBtn: '',
  location: '',
  titleClassName: 'title',
  openModal: () => {}
};
