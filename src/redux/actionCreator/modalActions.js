export const openModal = (shouldOpen, modalType) => ({
  type: 'OPEN_MODAL',
  modal: {
    shouldOpen,
    modalType
  }
});

export const closeModal = () => ({
  type: 'CLOSE_MODAL',
});
