
import React, { Component } from 'react';
import ImageLink from '../../image-link/ImageLink';
import Oval2 from '../../../images/Oval2.png';

class AddComment extends Component {
  render() {
    return (
      <div className="modal__modal1">
        <span className="modal__oval-copy">
          <ImageLink
            imageSrc={Oval2}
            altText="avatar"
            imageClass="modal__oval-copy" />
        </span>
        <span className="modal__add-comment">
            Add a comment
        </span>
      </div>
    );
  }
}

export default AddComment;
