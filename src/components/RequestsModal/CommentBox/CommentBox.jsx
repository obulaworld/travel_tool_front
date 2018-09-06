
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import sanitizeHtml from 'sanitize-html-react';
import './_CommentBox.scss';
import { createComment } from '../../../redux/actionCreator/commentsActions';

export class CommentBox extends Component {
  placeholder = '<p style="color:#999999; font-size: 16px;	font-family: DIN Pro;	line-height: 20px; text-align: left; margin: 20px;">Write a comment</p>'
  state = {
    dataInput: this.placeholder,
    submitReady: false
  };

  handleKeyUp = event => {
    if (event.target.innerText.trim().length >= 1) {
      this.setState({
        dataInput: event.target.innerHtml,
        submitReady: true
      });
    }
    else {
      this.setState({
        submitReady: false,
        dataInput: ''
      });
    }
  }

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
  }

  // sanitize input data from comment box
  sanitizeInputData = (dirtyHtml) => {
    const cleanHtml = sanitizeHtml(dirtyHtml, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'u' ]),
      allowedAttributes: {
        a: ['href', 'target']
      }
    });
    return cleanHtml;
  }

  render() {
    const { dataInput, submitReady } = this.state;
    let status = submitReady ? '--active' : '';
    return (
      <form className="editor__editor-form" id="form-id" onSubmit={this.handleSubmit}>
        <Editor
          id="tinymce-editor"
          init={{
            statusbar: false,
            plugins: 'lists',
            skin: 'lightgray',
            menubar: false, branding: false,
            toolbar: 'bold italic underline   numlist bullist   outdent indent' }}
          onKeyUp={this.handleKeyUp}
          value={dataInput}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onEditorChange={this.handleEditorChange}
        />
        <div className="editor__btn-size">
          <span className="editor__btn-wrap">
            <button className={`editor__post-btn editor__post-btn${status} post-btn-text`} type="submit">
              Post
            </button>
          </span>
        </div>
      </form>
    );
  }
}

CommentBox.propTypes = {
  createComment: PropTypes.func.isRequired,
  requestId: PropTypes.string
};

CommentBox.defaultProps = {
  requestId: '',
};

export default connect(null, { createComment })(CommentBox);
