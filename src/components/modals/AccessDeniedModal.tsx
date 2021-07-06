import React from 'react';

import { ModalProps } from './';
import { useHistory } from 'react-router-dom';
import { getLoginRouteWithRedirect } from '../../shared/router/routes';

export const AccessDeniedModal: React.FC<ModalProps> = ({ close }) => {
  const history = useHistory();

  function navigateToLogin() {
    history.push(getLoginRouteWithRedirect(history.location.pathname));
    close();
  }

  return (
    <div className="p15-25">
      <div className="pt25 pl25 pr25 ">
        <h2 className="fw-700 fs-xm p0 m0">Access denied</h2>
        <p className="w70">
          Navigate to the login page to access the full extend of the Journals
          platform
        </p>
        <div onClick={navigateToLogin} className="mt25 fc-blue click mb25">
          Navigate to Login
        </div>
      </div>
    </div>
  );
};
