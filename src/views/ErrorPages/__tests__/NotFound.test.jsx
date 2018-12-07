import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import sinon from 'sinon';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import NotFound from '../index';
import App from  '../../App';

const initialState = {
  postAccommodationData: [],
  errors: [],
  modal: {
    shouldOpen: false,
    modalType: null
  }
};

const mockStore = configureStore();
const store = mockStore(initialState);
describe('<NotFound />', () => {
  let wrapper;
  const props = {
    history:{
      push:jest.fn()
    }
  };
  beforeEach(() => {
    wrapper = mount(<NotFound {...props} />);
  });
  it('should always render properly when only accessing wrong route',() => {
    expect(wrapper.find(NotFound)).toHaveLength(1);
    expect(wrapper.find('a')).toHaveLength(1);
    expect(wrapper.find('p')).toHaveLength(1);
    expect(wrapper.find('p').at(0).text()).toBe('The page you are looking for might have been removed, had its name changed or is temporarily unavailable.');
  });
  it('should always redirect to `/requests` when the button is clicked', () => {
    const handleNaviagation = jest.spyOn(wrapper.instance(), 'handleNaviagation');
    wrapper.instance().forceUpdate();
    wrapper.find('a').simulate('click');
    expect(handleNaviagation).toHaveBeenCalled();
    expect(handleNaviagation).toHaveBeenCalledTimes(1);
    expect(props.history.push).toHaveBeenCalledWith('/requests');
  });
});
