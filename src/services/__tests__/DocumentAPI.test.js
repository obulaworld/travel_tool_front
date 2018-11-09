import moxios from 'moxios';
import DocumentAPI from '../DocumentAPI';

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
});
