import React from "react";
import renderer from "react-test-renderer";
import TextLink from "../../../components/text-link/TextLink";

const props = {
    imageSrc: "",
    textLinkClass: "",
    textClass: "",
    altText: "",
    text: ""

};
it('should render the text-link component', ()=>{
const tree = renderer.create(<TextLink {...props} />).toJSON();
expect(tree).toMatchSnapshot();
});