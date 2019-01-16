import React from 'react';
import notFoundImage from '../../../images/travela-404.png';
import '../NotFound/NotFound.scss';

const PageBody = () => (
  <div className="pageOverlay">
    <div className="notFoundBody">
      <div className="bg_404">
        <img src={notFoundImage} alt="page not found" /> 
      </div>
      <p>
          Thank you for your patience as our engineers work quickly to resolve this issue.  
          In the meantime, please reach out to your local travel team.
      </p>
    </div>
  </div>
);

export default PageBody;

