const checkUserPermission = (history, allowedRoles, userRoles) => {
  const hasPermission = userRoles.some(role => allowedRoles.includes(role));
  if (!hasPermission) {
    history.push('/requests');
  } else {
    return hasPermission;
  }
};

export default checkUserPermission;
