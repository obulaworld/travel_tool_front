export default (requestData) => {
  let tag = 'Manager Stage';
  if (requestData.status && requestData.status === 'Approved') {
    tag = 'Travel Stage';
  }
  return tag;
};
