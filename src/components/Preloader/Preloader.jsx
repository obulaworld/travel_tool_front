import React from 'react';
import './Preloader.scss';

const Preloader = ({ spinnerClass }) => (
  <div className="preloader">
    <div className={`spinner ${spinnerClass}`} />
  </div>
);

export default Preloader;
