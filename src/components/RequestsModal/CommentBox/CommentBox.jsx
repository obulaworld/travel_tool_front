import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';
import './_CommentBox.scss';

class CommentBox extends Component {
  state = {
    dataInput: '',
    submitReady: false
  };

  handleEditorChange = event => {
    event.preventDefault();
    this.setState({
      dataInput: event.target.getContent({ format: 'text' }).trim(),
      submitReady: true
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { handleCreateComment } = this.props;
    const { dataInput } = this.state;
    handleCreateComment(dataInput);
  };

  handleFocus = event => {
    event.target.editorContainer.style.border = '1px solid blue';
  };

  handleBlur = event => {
    event.target.editorContainer.style.border = '1px solid #E4E4E4';
  };
 

  render() {
    const { dataInput, submitReady } = this.state;
    let status = submitReady && dataInput ? '--active' : '';
    return (
      <form onSubmit={this.handleSubmit} className="editor__editor-form" id="form-id">
        <Editor
          init={{
            statusbar: false,
            plugins: 'lists',
            skin: 'lightgray',
            menubar: false, branding: false,
            toolbar: 'bold italic underline   numlist bullist   outdent indent' }}
          onChange={this.handleEditorChange}
          value={this.dataInput}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur} />
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
  handleCreateComment: PropTypes.func
};

CommentBox.defaultProps = {
  handleCreateComment: () => {}
};

export default CommentBox;
