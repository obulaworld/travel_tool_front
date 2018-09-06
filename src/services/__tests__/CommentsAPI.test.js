import moxios from 'moxios';
import CommentsAPI from '../CommentsAPI';

const baseUrl = 'http://127.0.0.1:5000/api/v1';

describe('CommentsAPI', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should send a POST request to create a new comment', async () => {
    const commentData = {
      requestId: 'bcjkwdbjk',
      comment: 'Your request has been approved',
    };

    moxios.stubRequest(`${baseUrl}/comments`, {
      status: 201,
      response: {
        comment: 'Your request has been approved'
      }
    });

    const response = await CommentsAPI.createComment(commentData);

    expect(moxios.requests.mostRecent().url).toEqual(`${baseUrl}/comments`);
    expect(response.data).toEqual({
      comment: 'Your request has been approved',
    });
  });
});
