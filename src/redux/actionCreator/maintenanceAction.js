import { ADD_MAINTENANCE_RECORD } from '../constants/actionTypes';

const addmaintenanceRecord = (data, roomId) => (
  {
    type: ADD_MAINTENANCE_RECORD,
    data,
    roomId,
  }
);

export default addmaintenanceRecord;
