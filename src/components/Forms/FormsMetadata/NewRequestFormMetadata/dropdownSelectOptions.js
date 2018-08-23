const dropdownSelectOptions = {
  department: [
    'Talent & Development',
    'Success',
    'IT',
    'Operations'
  ],

  role: [
    'Software Developer',
    'Technical Team Lead',
    'Product Engineer',
    'Product Coordinator',
    'Travel Coordinator',
    'Country Director',
  ],

  get origin() {
    // defined as a getter for reuse in destination
    return [
      'Kampala',
      'Lagos',
      'Nairobi',
      'New York',
    ];
  },

  get destination() {
    // destination includes everything in origin and the 'Other' option
    return [
      ...this.origin,
      'Other',
    ];
  }
};

export default dropdownSelectOptions;
