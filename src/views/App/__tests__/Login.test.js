import React from 'react';
import renderer from 'react-test-renderer';
import Login from '../../Login/Login';

it('should render Login page correctly', () => {
const tree = renderer.create(<Login />).toJSON();
expect(tree).toMatchSnapshot();
});