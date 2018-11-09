import moxios from 'moxios';
import DocumentAPI from '../DocumentAPI';
import { updateDocument } from '../../redux/actionCreator/documentActions';

const baseUrl = 'http://127.0.0.1:5000/api/v1';

describe('DocumentAPI', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should send a GET request to fetch user documents', async () => {

    moxios.stubRequest(`${baseUrl}/documents`, {
      status: 200,
      response: {
        documents: 'Successfully retrieved your documents'
      }
    });

    const response = await DocumentAPI.fetchDocuments();

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/documents`);
    expect(response.data).toEqual({
      documents: 'Successfully retrieved your documents'
    });
  });

  it('should send a PUT request to rename a user document', async () => {

    moxios.stubRequest(`${baseUrl}/documents/1`, {
      status: 200,
      response: {
        document: 'Document was renamed successfully'
      }
    });

    const response = await DocumentAPI.updateDocument('1', { name: 'Visa' });

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/documents/1`);
    expect(response.data).toEqual({
      document: 'Document was renamed successfully'
    });
  });
});
