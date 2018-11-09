import React from 'react';
import { shallow } from 'enzyme';
import DocumentTableMenu from '../index';
import documentsMockData from '../../../mockData/documentsMockData';

describe('DocumentTableMenu Component', () => {
  let props = {
    document: documentsMockData[0],
    editDocument: jest.fn(),
    toggleMenu: jest.fn(),
    menuOpen: { open: true, id: '1' },
    openModal: jest.fn()
  };

  it ('should render the component', (done) => {
    const wrapper = shallow(<DocumentTableMenu {...props} />);

    expect(wrapper).toMatchSnapshot();
    done();
  });

  it ('should handle button click', (done) => {
    const wrapper = mount(<DocumentTableMenu {...props} />);
    const renameBtn = wrapper.find('#docRenameBtn');
    const cancelBtn = wrapper.find('.table__menu-list-item.cancel');
    const ellipsis = wrapper.find('.fa-ellipsis-v');
    const handleOpenRenameModalSpy = jest
      .spyOn(wrapper.instance(), 'handleOpenRenameModal');

    expect(renameBtn.length).toBe(1);
    expect(cancelBtn.length).toBe(1);
    expect(ellipsis.length).toBe(1);
    renameBtn.simulate('click');
    wrapper.instance().handleOpenRenameModal();
    expect(handleOpenRenameModalSpy).toHaveBeenCalled();
    cancelBtn.simulate('click');
    expect(props.toggleMenu).toHaveBeenCalledTimes(1);
    ellipsis.simulate('click');
    expect(props.toggleMenu).toHaveBeenCalledTimes(2);
    done();
  });
});
