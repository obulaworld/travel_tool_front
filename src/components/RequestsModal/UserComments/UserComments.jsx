
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ImageLink from '../../image-link/ImageLink';

class UserComments extends Component {
  formatDate(date) {
    const createdAt = moment(date).format('MM/DD/YYYY @ h:mm a');
    return moment(createdAt).fromNow();
  }

  render() {
    const { comments } = this.props;
    return comments && comments.reverse().map((comment) => {
      return (
        <div className="modal__modal1" key={comment.id}>
          <hr />
          <div className="modal__mdl-icons">
            <ImageLink imageSrc={comment.picture} altText="avatar" imageClass="modal__oval-copy" />
            <span className="modal__user-name">
              { comment.userName }
            </span>
            <span className="modal__hours-status">
              {this.formatDate(comment.createdAt)}
            </span>
            <span className="modal__dialog">
              <button type="button" className="modal__delete-btn">
                Delete
              </button>
            </span>
            <div className="modal__modal2">
              <div className="modal__status-update" dangerouslySetInnerHTML={{ __html: comment.comment }} /> {/*eslint-disable-line*/}
            </div>
          </div>
        </div>
      );
    });
  }
}

UserComments.propTypes = {
  comments: PropTypes.array
};

UserComments.defaultProps = {
  comments: []
};

export default UserComments;
