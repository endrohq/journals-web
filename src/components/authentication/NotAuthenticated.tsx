import React from 'react';
import { Button } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { getLoginRouteWithRedirect } from '../../shared/router/routes';
import fallback from '../../assets/images/404_fallback.jpg';

export const NotAuthenticated: React.FC = () => {
  const history = useHistory();
  return (
    <div>
      <div className="bg-gray-100 w100 h225--fixed">
        <img className="w100 h100 image-cover" src={fallback} />
      </div>
      <div className="grid-xl mt50 mb200">
        <h1 className="fw-700 fs-xxl">404 Not Found</h1>
        <div className="w40">
          <p className="mb15 fs-m">
            2 possible scenarios! One is that you requested a page that does not
            exist. A second reason that you are not authorized to view this
            page.
          </p>
        </div>
        <div className="mt25">
          <Link to={getLoginRouteWithRedirect(history.location.pathname)}>
            <Button className="w175--fixed h45--fixed" type="primary">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
