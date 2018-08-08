import React from 'react';
import { Login } from '../Login';
import TextLink from '../../../components/text-link/TextLink';

const props = {
  setCurrentUser: () => {},
  isAuthenticated: true,
  history: {
    push: jest.fn()
  },
};


const wrapper = shallow(<Login {...props} />);

describe('Login Component', () => {
  it('should render Login page correctly', () => {
    expect(wrapper.find(TextLink)).toHaveLength(2);
    expect(wrapper.find('button')).toHaveLength(1);
    expect(wrapper.find('img')).toHaveLength(3);
    expect(wrapper.find('p')).toHaveLength(1);
    });

  it('should be find the Login button', () => {
    expect(wrapper.find('button').exists).toBeTruthy();   
  });

  it('should redirect to andela micro service when login is Clicked', () => {
    const redirectUrl = `${process.env.REACT_APP_ANDELA_AUTH_HOST}/login?redirect_url=${process.env.REACT_APP_AUTH_REDIRECT_URL}`;
    window.location.replace = jest.fn();
    wrapper.find('button').simulate('click');
    expect(window.location.replace).toHaveBeenCalledWith(redirectUrl);
  });
});
