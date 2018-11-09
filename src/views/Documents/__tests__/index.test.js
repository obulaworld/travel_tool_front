import React from 'react';
import { shallow } from 'enzyme';
import { Documents, mapStateToProps } from '../index';
import DocumentsHeader from '../../../components/DocumentsHeader';

describe('<Documents />', () => {
  const props = {
    openModal: jest.fn(),
    fetchDocuments: jest.fn(),
    isLoading: false,
    closeModal: jest.fn(),
    editDocument: jest.fn(),
    documentOnEdit: {
      id: '1',
      name: 'Passport',
      cloudinary_public_id: 'e93h236FvT',
      cloudinary_url: 'https://image.jpg',
      userId: '-LMgZQKq6MXAj_41iRWi',
      createdAt: '2018-08-16 012:11:52.181+01',
      updatedAt: '2018-08-16 012:11:52.181+01',
    },
    updateDocumentOnEdit: jest.fn(),
    removeDocumentFromEdit: jest.fn(),
    updateDocument: jest.fn(),
    shouldOpen: false,
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

  it('should render Document Header correctly', () => {
    const wrapper = shallow(<Documents {...props} />);
    expect(wrapper.find(DocumentsHeader).length).toBe(1);   
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

  it('should call `toggleMenu method', (done) => {
    const document = {
      id: '1',
      name: 'Passport',
      cloudinary_public_id: 'e93h236FvT',
      cloudinary_url: 'https://image.jpg',
      userId: '-LMgZQKq6MXAj_41iRWi',
      createdAt: '2018-08-16 012:11:52.181+01',
      updatedAt: '2018-08-16 012:11:52.181+01',
    };
    const wrapper = shallow(<Documents {...props} />);
    wrapper.instance().state = {
      menuOpen: { open: true, id: 1 }
    };
    const toggleMenuSpy = jest.spyOn(wrapper.instance(), 'toggleMenu');
    wrapper.instance().toggleMenu(document);
    expect(toggleMenuSpy).toHaveBeenCalled();

    done();
  });

  it('should call `toggleMenu method', (done) => {
    const document = {
      name: 'Passport',
      cloudinary_public_id: 'e93h236FvT',
      cloudinary_url: 'https://image.jpg',
      userId: '-LMgZQKq6MXAj_41iRWi',
      createdAt: '2018-08-16 012:11:52.181+01',
      updatedAt: '2018-08-16 012:11:52.181+01',
    };

    const wrapper = shallow(<Documents {...props} />);
    wrapper.instance().state = {
      menuOpen: { open: true, id: 1 }
    };
    const toggleMenuSpy = jest.spyOn(wrapper.instance(), 'toggleMenu');
    wrapper.instance().toggleMenu(document);
    expect(toggleMenuSpy).toHaveBeenCalled();

    done();
  });

  it('should call `handleInputChange method', (done) => {
    const event = {
      target: { value: 'Travel stipend' }
    };

    const wrapper = shallow(<Documents {...props} />);
    const handleInputChangeSpy = jest.spyOn(wrapper.instance(), 'handleInputChange');
    wrapper.instance().handleInputChange(event);
    expect(handleInputChangeSpy).toHaveBeenCalled();

    done();
  });


  it('should call `handleCloseEditModal method', (done) => {
    const wrapper = shallow(<Documents {...props} />);
    wrapper.instance().state = { menuOpen: { open: true, id: null } };
    const handleCloseEditModalSpy = jest.spyOn(wrapper.instance(), 'handleCloseEditModal');
    wrapper.instance().handleCloseEditModal();
    expect(handleCloseEditModalSpy).toHaveBeenCalled();

    done();
  });

  it('should call `handleRenameDocument method', (done) => {
    const wrapper = shallow(<Documents {...props} />);
    const handleRenameDocumentSpy = jest.spyOn(wrapper.instance(), 'handleRenameDocument');
    wrapper.instance().handleRenameDocument();
    expect(handleRenameDocumentSpy).toHaveBeenCalled();

    done();
  });

  it('should call `handleOpenModal method', (done) => {
    const wrapper = shallow(<Documents {...props} />);
    const handleOpenModalSpy = jest.spyOn(wrapper.instance(), 'handleOpenModal');
    wrapper.instance().handleOpenModal();
    expect(handleOpenModalSpy).toHaveBeenCalled();
    done();
  });

  it('should call `handleOpenModal method', (done) => {
    const wrapper = shallow(<Documents {...props} />);
    const handleOpenModalSpy = jest.spyOn(wrapper.instance(), 'openAddModal');
    wrapper.instance().openAddModal();
    expect(handleOpenModalSpy).toHaveBeenCalled();
    done();
  });

  test('should correctly map state to props', () => {
    const mapper = mapStateToProps({
      modal: { modal: ['add document']},
      documents: { documents: ['user documents'] },
      user: { getUserData: ['user data'] },
    });
    expect(mapper.documents).toEqual(['user documents']);
  });

  it('should should render documents editmodal', (done) => {
    const currentProps = { ...props, modalType: 'rename document' };
    const wrapper = mount(<Documents {...currentProps} />);
    const toggleIcons = wrapper.find('#toggleIcon');
    const toggleMenuSpy = jest.spyOn(wrapper.instance(), 'toggleMenu');
    expect(toggleIcons.length).toBe(2);
    done();
  });
});
