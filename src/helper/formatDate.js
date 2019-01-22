export default (date) => {
  const values = date.split('/');
  return `${values[1]}/${values[2]}/${values[0]}`;
};
