import React from 'react';
import PropType from 'prop-types';

const TextLink = ({ imageSrc, textLinkClass, textClass, altText, text }) => {
    return (
      <p className={textLinkClass}>
        <img src={imageSrc} alt={altText} />
        <a href="/" className={textClass}>
          {text}
                 
        </a>
      </p>
    );
};

TextLink.propTypes = {
    imageSrc: PropType.string.isRequired,
    textLinkClass: PropType.string.isRequired,
    textClass: PropType.string.isRequired,
    altText: PropType.string.isRequired,
    text: PropType.string.isRequired,
};

export default TextLink;