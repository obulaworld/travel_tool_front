import submissions, { initialState } from '../checklistSubmission';
import {
  postSubmission,
  postSubmissionFailure,
  postSubmissionSuccess,
  fetchSubmission,
  fetchSubmissionFailure,
  fetchSubmissionSuccess
} from '../../actionCreator/checkListSubmissionActions';

const responseData = {
  'success': true,
  'submission': {
    'value': '{"url":"http://res.cloudinary.com/travela/raw/upload/v1540299037/r5ri4b0k3w4wfz20thzg","secureUrl":"https://res.cloudinary.com/travela/raw/upload/v1540299037/r5ri4b0k3w4wfz20thzg","publicId":"r5ri4b0k3w4wfz20thzg","fileName":"airticket.pdf"}',
    'tripId': 'dOkOmTh1Jv',
    'checklistItemId': 1,
    'id': 'bHD9lhwF0',
    'updatedAt': '2018-10-23T12:50:37.759Z',
    'createdAt': '2018-10-23T12:50:37.759Z',
    'deletedAt': null
  },
  'message': 'Uploaded Successfully'
};
describe('Checklist Submission reducer', () => {
  describe('post checklist submission reducer', () => {
    it('should update \'isUploading\' state to true', (done) => {
      const data = { formData: 'fake data', checklistId: 'efr546g' };
      const action = postSubmission(data);
      const newState = submissions(initialState, action);
      expect(newState.isUploading).toBe(true);
      done();
    });

    it('should add submission to state on successful posting',
      (done) => {
        const currentState = {
          ...initialState,
          submissionDetails: '',
          isUploading: true,
          postSuccess: 'Uploaded Successfully',
          successStatus: true
        };
        const response = responseData;

        const action = postSubmissionSuccess(response);
        const newState = submissions(currentState, action);

        expect(newState.isUploading).toBe(true);
        expect(newState.postSuccess).toBe('Uploaded Successfully');
        done();
      });

    it('should change postFail to true on failed post',
      (done) => {
        const currentState = {
          ...initialState,
          error: '',
          successStatus: true
        };
        const error = 'Server Error';

        const action = postSubmissionFailure(error);
        const newState = submissions(currentState, action);

        expect(newState).toEqual({
          ...initialState,
          postFail: true,
          successStatus: false,
          error: 'Server Error'
        });

        done();
      });
  });

  describe('fetch checklist submission reducer', () => {
    it('should update \'isFetching\' state to true', (done) => {
      const data = { requestId: 'efr546g' };
      const action = fetchSubmission(data);
      const newState = submissions(initialState, action);
      expect(newState.isFetching).toBe(true);
      done();
    });

    it('should add submissions to state on successful fetching',
      (done) => {
        const currentState = {
          ...initialState,
          submissions: '',
          isFetching: true,
          fetchSuccessMessage: '',
        };
        const response = {
          'success': true,
          'submissions': [
            {
              'id': 2,
              'value': '{"fileName":"Flight Ticket.pdf"}',
              'tripId': 'qqyizhqU8w',
              'checklistItemId': 1,
              'createdAt': '2018-10-19T15:05:13.164Z',
              'updatedAt': '2018-10-19T15:05:13.164Z'
            }
          ],
          'message': 'Successfully retrieved'
        };

        const action = fetchSubmissionSuccess(response);
        const newState = submissions(currentState, action);

        expect(newState.fetchSuccessMessage).toBe('Successfully retrieved');
        expect(newState.submissions).toBe(response.submissions);
        done();
      });

    it('should change submission to failed post',
      (done) => {
        const currentState = {
          ...initialState,
          submissions: '',
          error: ''
        };
        const error = 'Server Error';

        const action = fetchSubmissionFailure(error);
        const newState = submissions(currentState, action);

        expect(newState).toEqual({
          ...initialState,
          submissions: 'failed',
          error: 'Server Error'
        });

        done();
      });
  });
});
