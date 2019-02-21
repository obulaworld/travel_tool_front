export default (requestData) => {
  let tag = 'Manager Stage';
  if (requestData.status && requestData.status === 'Approved') {
    tag = 'Travel Stage';
  } else if (requestData.status && requestData.status === 'Verified') {
    tag = 'Verified Stage';
  } 
  return tag;
};
