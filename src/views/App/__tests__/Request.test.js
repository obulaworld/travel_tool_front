import React from 'react';
import renderer from 'react-test-renderer';
import RequestPanelHeader from '../../../components/RequestPanelHeader/RequestPanelHeader';

it('should render request header correctly', () => {
    const tree = renderer.create(<RequestPanelHeader />).toJSON();
    expect(tree).toMatchSnapshot();
});
