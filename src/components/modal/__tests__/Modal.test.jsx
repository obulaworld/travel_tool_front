import React from 'react';
import Modal from '../Modal';

describe('<Modal />', () => {
  let props, click;

  beforeEach(() => {
    click = jest.fn();
    props = {
      toggleModal: click,
      title: 'test modal',
      visibility: 'visible'
    };
  });

  it('renders correctly', () => {
    const wrapper = shallow(
      <Modal {...props}>
        <div>
          Test content
        </div>
      </Modal>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('closes when close button is clicked', () => {
    const handleClose = jest.fn();
    const wrapper = mount(
      <Modal {...props} toggleModal={handleClose}>
        <div>
          Test content
        </div>
      </Modal>
    );
    wrapper
      .find('button.modal-close')
      .simulate('click');
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
