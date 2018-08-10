import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './TextLink.scss';

class TextLink extends PureComponent {
  render(){
    const { imageSrc, textLinkClass, textClass, altText, text, symbolClass } = this.props;
    return (
      <p className={textLinkClass}>
        <img src={imageSrc} alt={altText} className={symbolClass} />
        <a href="/" className={textClass}>
          {text}
        </a>
      </p>
    );
  }
}

TextLink.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  textLinkClass: PropTypes.string,
  textClass: PropTypes.string,
  altText: PropTypes.string,
  text: PropTypes.string,
  symbolClass: PropTypes.string,
};

TextLink.defaultProps = {
  textLinkClass : 'login-page__text-link',
  textClass: 'login-page__text',
  altText: 'Image',
  text: 'Text link',
  symbolClass: 'login-symbol'
};

export default TextLink;
