import OtherDocumentInputLabel from '../index';

describe('OtherDocumentMetaData', () => {
  const inputLables = {
    name: {
      label: 'Name'
    },
    documentId: {
      label: 'Document Id'
    },
    dateOfIssue: {
      label: 'Date of Issue'
    },
    expiryDate: {
      label: 'Expiry Date'
    },
  };
  it('renders returns other document input lable', () => {
    expect(OtherDocumentInputLabel.inputLabels).toMatchObject(inputLables);
  });
});
