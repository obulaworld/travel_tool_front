const inputLabels = (editing) => ({
  stipend: {
    label: 'Enter Amount in Dollars ($)'
  },
  center: {
    label: editing ? 'Location' : 'Select Location'
  }
});

export default inputLabels;
