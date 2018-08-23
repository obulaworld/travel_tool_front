import React from 'react';
import ApprovalsPanelHeader from '../index';

it('should render approvals header correctly', () => {
    const wrapper =  shallow(<ApprovalsPanelHeader />);
    expect(wrapper).toMatchSnapshot();
});

