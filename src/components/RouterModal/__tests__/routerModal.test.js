import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { RouterModal } from '../index';

const props = {
  openModal: ()=>{},
  closeModal: ()=>{},
  match:{
    url: '/requests/my-aprovals/vdkghdk2f',
    params: {
      requestId: 'vdkghdk2f'
    }
  },
};

describe('<RouterModal/>', ()=>{
  const wrapper = mount(
    <MemoryRouter>
      <RouterModal {...props} />
    </MemoryRouter>
  );
  it('should render router modal', ()=>{
    expect(wrapper.find('Modal').length).toBe(1);
  });
});
