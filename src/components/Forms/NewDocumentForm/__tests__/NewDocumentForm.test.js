import React from 'react';
import { stub } from 'sinon';
import NewDocumentForm from '..';

describe('<NewDocumentForm />', () => {
  let wrapper;
  const props = {
    user: {
      userId: 'getyHjk5',
    },
    createDocument: jest.fn,
    closeModal: jest.fn,
    onCancel: jest.fn,
  };

  beforeEach(() => {
    wrapper = mount(<NewDocumentForm {...props} />);
  });

  global.FileReader = function(spy, fakeData) {
    this.fakeData = fakeData;
    this.spy = spy;
  };

  FileReader.prototype.readAsDataURL = function(file) {
    this.result = this.fakeData;
  };

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call the onClick prop when click is simulated', () => {
    const onCancel = jest.fn;
    wrapper.find('#cancel').simulate('click');
    expect(onCancel).toBeCalled;
  });

  it('should call the onChange prop when click is simulated', () => {
    const onChange = jest.fn;
    const event = {
      preventDefault: jest.fn(),
      target: {
        files: [
          {
            name: '57f556259d75538-a-nw-p.jpg',
            lastModified: 1517684494000,
            lastModifiedDate:
              'Sat Feb 03 2018 20:01:34 GMT+0100 (West Africa Standard Time)',
            webkitRelativePath: '',
            size: 212919
          }
        ]
      }
    };
    wrapper.find('#upload-btn').simulate('change', event);
    expect(onChange).toBeCalled;
  });

  it('should call onsubmit', () => {
    const onSubmit = stub()
      .withArgs('file', 'name');
    const uploadComponent = mount(<NewDocumentForm handleSubmit={onSubmit} /> );
    uploadComponent.simulate('submit');
    expect(onSubmit).toBeCalled;
  });
});
