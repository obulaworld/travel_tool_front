import moxios from 'moxios';
import SubmissionAPI from '../checklistSubmissionAPI';
import { resolveBaseUrl } from '../index';

const baseUrl = resolveBaseUrl();

describe('TravelChecklistAPI', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should send `POST` request to create travelChecklists submission', async () => {
    moxios.stubRequest(`${baseUrl}/checklists/123/submission`, {
      status: 200,
      response: { submission: 'this submission'}
    });
    const submissionData = {
      file: 'test.pdf',
      label: 'Yellow test'
    };

    const response = await SubmissionAPI.postSubmission(submissionData, '123');
    const request = moxios.requests.mostRecent();
    expect(request.url)
      .toEqual(`${baseUrl}/checklists/123/submission`);
    expect(request.config.method).toEqual('post');
    expect(response.status).toEqual(200);
    expect(response.data)
      .toEqual({ submission: 'this submission'});
  });

  it(`should send 'GET' request to
    submission using specific requestId`, async () => {
    moxios.stubRequest(`${baseUrl}/checklists/2we34/submission`, {
      status: 200,
      response: { submissions: 'this submission'}
    });

    const response = await SubmissionAPI
      .getSubmission('2we34');
    const request = moxios.requests.mostRecent();
    expect(request.url)
      .toEqual(`${baseUrl}/checklists/2we34/submission`);
    expect(request.config.method).toEqual('get');
    expect(response.status).toEqual(200);
    expect(response.data)
      .toEqual({ submissions: 'this submission'});
  });
});
