import React from 'react';
import Modal from '../Modal';

describe('<Modal />', () => {
  let props, click;

  beforeEach(() => {
    click = jest.fn();
    props = {
      title: 'test modal',
      visibility: 'invisible',
      closeModal: jest.fn()
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
});
