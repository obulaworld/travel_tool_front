const isCurrentPageMyApproval = () => {
  const isMyApprovalsPage = window.location.pathname.split('ts/')[1];
  return isMyApprovalsPage === 'my-approvals' ? true : false;
};

export default isCurrentPageMyApproval;
