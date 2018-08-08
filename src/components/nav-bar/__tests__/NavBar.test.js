import React from 'react';
import { shallow } from 'enzyme';
import NavBar from '../NavBar';

// describe what we are testing
describe("Render NavBar component", () => {
  const props = {
    onNotificationToggle: jest.fn(),
    avatar: "avatar"
  };
  // make our assertions and what we expect to happen
  it("should match snapshot", () => {
    const wrapper = shallow(<NavBar {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the navbar as expected", () => {
    const wrapper = shallow(<NavBar {...props} />);
    expect(wrapper.length).toBe(1);
  });

  it("should render the OnNotification click as exepected", () => {
    const wrapper = shallow(<NavBar {...props} />);
    let NotificationToggleSpy = jest.spyOn(
      wrapper.instance().props,
      "onNotificationToggle"
    );
    wrapper
      .find("#notification")
      .first()
      .simulate("click");
    expect(NotificationToggleSpy).toHaveBeenCalled();
  });
});
