import React from 'react';
import renderer from 'react-test-renderer';
import TextLink from '../TextLink';

const props = {
  imageSrc: '',
  textLinkClass: '',
  textClass: '',
  altText: '',
  text: ''
};

describe('Test Link', () => {
  it('should render the text-link component', ()=>{
    const tree = renderer.create(<TextLink {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
