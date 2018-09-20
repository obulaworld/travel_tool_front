
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ImageLink from '../../image-link/ImageLink';
import ConnectedCommentBox from '../CommentBox/CommentBox';

class UserComments extends Component {
  state = {
    commentToEdit: '',
    activeCommentId: '' 
  };

  editComment = (comment) => {
    const {id}  = comment;
    this.setState ({
      activeCommentId: id,
      commentToEdit: comment.comment,
    });
  }

  resetEditing = () => {
    this.setState({
      activeCommentId: ''
    });
  }

  handleCancelClick = (e) => {
    e.preventDefault();
    this.editComment('');
  }

  formatDate(date) {
    const createdAt = moment(date).format('MM/DD/YYYY @ h:mm a');
    return moment(createdAt).fromNow();
  }
 
  renderDeleteButton () {
    return (
      <span className="modal__dialog">
        <button type="button" className="modal__delete-btn">
            Delete
        </button>
      </span>
    );
    
  }

  renderCancelButton () {
    return (
      <button
        className="editor__post-btn editor__post-btn post-btn-text button-color" id="cancel-button" 
        type="submit" onClick={this.handleCancelClick}>
          Cancel
      </button>
    );

  }

  render() {
    const { commentToEdit, activeCommentId } = this.state;
    const { comments } = this.props;
    return comments && comments.map((comment) => {
      const editedLabel = comment.isEdited  ? '<span>(edited)</span>' : '';
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
              <button 
                type="button" className={`edit-button ${activeCommentId === comment.id ? 'active': ''}`} 
                onClick={() => this.editComment(comment)}>
                Edit
              </button>
            </span>
            {this.renderDeleteButton()}
            {commentToEdit == comment.comment ? (
              <div className="comment-box">
                <ConnectedCommentBox afterSubmit={this.resetEditing} editComment={this.editComment} comment={commentToEdit} requestId={comment.requestId} id={comment.id} />
                {this.renderCancelButton()}
              </div>
            ) :  (
              <div className="modal__modal2">
                  <div className="modal__status-update" dangerouslySetInnerHTML={{ __html: `${comment.comment} ${editedLabel}` }} /> {/*eslint-disable-line*/}
              </div>)} 
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
