import React from 'react';
import sinon from 'sinon';
import NewRequestForm from '../NewRequestForm';
import PersonalDetailsFieldset from '../FormFieldsets/PersonalDetails';

describe('<PersonalDetailsFieldset/>',()=> {
    const props = {
        managers:['Mananger1', 'Manager2'],
        collapsible: jest.fn(),
        title: 'Personal',
        collapse:true,
        position: 'centre',
        line: '',
        values: {}
    }
    it('tests handleDisableInputs', ()=>{
        const wrapper = shallow(<PersonalDetailsFieldset {...props}/>)
        const instance = wrapper.instance();
        instance.handleDisableInputs('clicked');
        expect(wrapper.state('disableInputs')).toBe('disable-details')
    });
})