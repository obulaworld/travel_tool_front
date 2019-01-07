import React from 'react';
import { shallow } from 'enzyme';
import { UserTravelReadinessDetailsTable } from '../UserTravelReadinessDetailsTable';
import documentMocks from '../__mocks__/documentMocks';

describe('UserTravelReadinessDetailsTable', () => {
  const passports = documentMocks.filter(doc => doc.type === 'passport');
  const visas = documentMocks.filter(doc => doc.type === 'visa');

  const defaultProps = {
    activeDocument: 'passport',
    closeModal: jest.fn(),
    modalType: 'document detail',
    handleShowDocument: jest.fn(),
    shouldOpen: false,
    userData: {
      id: 'userId'
    }
  };

  it('should render the table', () => {
    const wrapper = shallow(<UserTravelReadinessDetailsTable {...defaultProps} />);
  });

  it('snapshot', () => {
    const props = {
      ...defaultProps,
      activeDocument: 'visa',
      shouldOpen: false,
      modalType: 'document details',
      documentId: 'fufgw',
      userData: {},
      passports,
      visas,
    };

    const wrapper = shallow(<UserTravelReadinessDetailsTable {...props} />);
    expect(wrapper.find('table.mdl-data-table').length).toBe(1);
  });

  it('renders \'no passports\' if no passports exist', () => {
    const props = {
      ...defaultProps,
      activeDocument: 'passport',
      shouldOpen: false,
      modalType: 'document details',
      documentId: 'fufgw',
      userData: {}
    };

    const wrapper = shallow(<UserTravelReadinessDetailsTable {...props} />);
    expect(wrapper.find('.table__readiness--empty').length).toBe(1);
  });

  it('renders \'no visas\' if no visas exist', () => {
    const props = {
      ...defaultProps,
      activeDocument: 'visa',
      shouldOpen: true,
      modalType: 'document details',
      documentId: 'fufgw',
      userData: {}
    };

    const wrapper = shallow(<UserTravelReadinessDetailsTable {...props} />);
    expect(wrapper.find('.table__readiness--empty').length).toBe(1);
  });

  it('handles showing the passport modal', () => {
    const props = {
      ...defaultProps,
      passports,
      visas,
    };
    const mockOnClick = jest.fn();
    const wrapper = shallow(<UserTravelReadinessDetailsTable {...props} handleShowDocument={mockOnClick} />);
    const documentSpan = wrapper.find('.document-name').at(0);
    documentSpan.simulate('click');

    expect(mockOnClick).toHaveBeenCalled();
  });

  it('handles showing the visa modal', () => {
    const props = {
      ...defaultProps,
      passports,
      visas,
      activeDocument: 'visa',
    };
    const mockOnClick = jest.fn();
    const wrapper = shallow(<UserTravelReadinessDetailsTable {...props} handleShowDocument={mockOnClick} />);
    const documentSpan = wrapper.find('.document-name').at(0);
    documentSpan.simulate('click');

    expect(mockOnClick).toHaveBeenCalled();
  });
});
