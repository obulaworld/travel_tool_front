import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import sanitizeHtml from 'sanitize-html-react';
import './_CommentBox.scss';
import {
  createComment,
  editComment
} from '../../../redux/actionCreator/commentsActions';

export class CommentBox extends Component {
  placeholder =
    '<p style="color:#999999; font-size: 16px;	font-family: DIN Pro;	line-height: 20px; text-align: left; margin: 20px;">Write a comment</p>';
  constructor(props) {
    super(props);
    const { comment, startSubmitReady } = this.props;
    this.state = {
      dataInput: comment || this.placeholder,
      submitReady: startSubmitReady || false
    };
  }

  handleKeyUp = event => {
    if (event.target.innerText.trim().length >= 1) {
      this.setState({
        dataInput: event.target.innerHtml,
        submitReady: true
      });
    } else {
      this.setState({
        submitReady: false,
        dataInput: '',
      });
    }
  };

  handleFocus = event => {
    event.target.editorContainer.style.border = '1px solid blue';
    const { dataInput } = this.state;
    if (dataInput == this.placeholder) {
      this.setState({
        dataInput: ''
      });
    }
  };

  handleBlur = event => {
    event.target.editorContainer.style.border = '1px solid #E4E4E4';
    const { dataInput } = this.state;
    if (dataInput == '') {
      this.setState({
        dataInput: this.placeholder,
        submitReady: false
      });
    }
  };

  handleEditorChange = dataInput => {
    this.setState({ dataInput });
  };

  handleSubmit = event => {
    const { dataInput } = this.state;
    const { createComment, requestId } = this.props;
    event.preventDefault();
    if (dataInput.trim() !== '' && dataInput.trim() != this.placeholder) {
      createComment(requestId, this.sanitizeInputData(dataInput));
    }
    this.setState({
      dataInput: '',
      submitReady: false,
    });
  };

  // sanitize input data from comment box
  sanitizeInputData = dirtyHtml => {
    const cleanHtml = sanitizeHtml(dirtyHtml, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['u']),
      allowedAttributes: {
        a: ['href', 'target']
      }
    });
    return cleanHtml;
  };

  handleEditComment = event => {
    event.preventDefault();
    const { dataInput } = this.state;
    const cachedComment = localStorage.getItem('comment');
    const { editComment, requestId, id, afterSubmit, handleNoEdit } = this.props;
    if (dataInput !== cachedComment) {
      editComment(requestId, dataInput, id);
    }else {
      handleNoEdit();
    }
    afterSubmit();
  };

  render() {
    const { dataInput, submitReady } = this.state;
    const { comment, editReady } = this.props;
    let status = submitReady ? '--active' : '';
    return (
      <form className="editor__editor-form">
        <Editor
          init={{
            mode: 'textareas',
            statusbar: false,
            plugins: 'lists',
            skin: 'lightgray',
            menubar: false,
            branding: false,
            toolbar: 'bold italic underline   numlist bullist   outdent indent'
          }}
          onKeyUp={this.handleKeyUp} value={dataInput}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onEditorChange={this.handleEditorChange} />
        <div className="editor__btn-size">
          <span className="editor__btn-wrap">
            {comment ? (
              <div>
                <button disabled={!submitReady || !editReady} type="submit" onClick={this.handleEditComment} className={`editor__post-btn editor__post-btn${status} --active post-btn-text edit-buttons`}>
                  Save
                </button>
              </div>) : (
              <button className={`editor__post-btn editor__post-btn${status} post-btn-text`} type="submit" id="post-submit" onClick={this.handleSubmit}> { /* eslint-disable-line */ }
                Post
              </button>)}
          </span>
        </div>
      </form>
    );
  }
}

CommentBox.propTypes = {
  createComment: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  requestId: PropTypes.string,
  comment: PropTypes.string,
  id: PropTypes.string,
  afterSubmit: PropTypes.func,
  handleNoEdit: PropTypes.func,
  editReady: PropTypes.func,
  startSubmitReady: PropTypes.bool,
};

CommentBox.defaultProps = {
  afterSubmit: ()=>{},
  requestId: '',
  comment: '',
  id: '',
  handleNoEdit: () => {},
  editReady: () => {},
  startSubmitReady: false,
};

export default connect(
  null,
  { createComment, editComment }
)(CommentBox);
