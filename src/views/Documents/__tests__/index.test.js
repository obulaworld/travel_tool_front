import React from 'react';
import { shallow } from 'enzyme';
import { Documents, mapStateToProps } from '../index';

describe('<Documents />', () => {
  const props = {
    openModal: jest.fn(),
    fetchDocuments: jest.fn(),
    isLoading: false,
    documents: [
      {
        id: '1',
        name: 'Passport',
        cloudinary_public_id: 'e93h236FvT',
        cloudinary_url: 'https://image.jpg',
        userId: '-LMgZQKq6MXAj_41iRWi',
        createdAt: '2018-08-16 012:11:52.181+01',
        updatedAt: '2018-08-16 012:11:52.181+01',
      },
      {
        id: '2',
        name: 'Visa',
        cloudinary_public_id: 'e93h236FvT',
        cloudinary_url: 'https://image.url',
        userId: '-LMgZQKq6MXAj_41iRWi',
        createdAt: '2018-08-16 012:11:52.181+01',
        updatedAt: '2018-08-16 012:11:52.181+01',
      }
    ],
  };

  it('should render correctly with documents', () => {

    const wrapper = shallow(<Documents {...props} />);
    expect(wrapper.find('DocumentTable').length).toBe(1);
  });

  it('should render correctly without documents', () => {
    const currentProps = { ...props, documents: [] };
    const wrapper = shallow(<Documents {...currentProps} />);
    expect(wrapper.find('DocumentTable').length).toBe(0);
  });

  it('should render correctly when fetching documents', () => {
    const currentProps = { ...props, documents: [], isLoading: true };
    const wrapper = shallow(<Documents {...currentProps} />);
    expect(wrapper.find('Preloader').length).toBe(1);
  });

  it('should call openAddModal', () => {
    const wrapper = shallow(<Documents {...props} />);
    const spy = jest.spyOn(wrapper.instance(), 'openAddModal');
    wrapper.instance().openAddModal();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('should correctly map state to props', () => {
    const mapper = mapStateToProps({
      modal: { modal: ['add document']},
      documents: { documents: ['user documents'] },
    });
    expect(mapper.documents).toEqual(['user documents']);
  });
});
