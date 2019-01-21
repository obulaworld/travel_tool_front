import moment from 'moment';

export const minDate = moment(new Date(), 'MM-DD-YYYY').add('days', 1); // minimum date for expiry calendar
export const maxDate = moment(new Date(Date.now()), 'MM-DD-YYYY'); // maximum date for date of issue
