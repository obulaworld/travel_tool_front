import React from 'react';
import { shallow } from 'enzyme';
import SearchBar from '../SearchBar';

// describe what we are testing
describe("Render SearchBar component", () => {
  // make our assertions and what we expect to happen
  it("should match snapshot", () => {
    const wrapper = shallow(<SearchBar />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the searchbar as expected", () => {
    const wrapper = shallow(<SearchBar />);
    expect(wrapper.length).toBe(1);
  });
});
