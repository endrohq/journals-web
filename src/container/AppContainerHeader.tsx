import * as React from 'react';

import { Link } from 'react-router-dom';
import { Logo } from '../assets/Logo';
import { ROUTES } from '../shared/router/routes';
import { TeamOutlined, UserOutlined } from '@ant-design/icons';
import { AppContainerHeaderAccount } from './AppContainerHeaderAccount';
import { Button } from 'antd';
import { useWallet } from '@lisk-react/use-lisk';
import { AppContainerHeaderSearchBar } from './AppContainerHeaderSearchBar';

interface ContainerProps {}

export const AppContainerHeader: React.FC<ContainerProps> = () => {
  const { isAuthenticated, account } = useWallet();
  return (
    <>
      <div className="w100 bg-white h70--fixed border-bottom">
        <div className="w100 pr15 pl15 h70--fixed m-auto flex-c">
          <div className="h100 flex-c">
            <Link
              to={ROUTES.HOME}
              className="fc-gray-500 fc-lb__hover flex-c mr50 flex-c ">
              <Logo className="" height={35} />
            </Link>
          </div>
          <AppContainerHeaderSearchBar />
          <div className="w100 flex-c ml50">
            <div className="ml-auto flex-c">
              <Link
                to={ROUTES.CREATE_EVENT}
                className="fc-black mr25 fs-m fw-700">
                Create
              </Link>
              <Link to={ROUTES.TREASURY} className="fc-black mr25 fs-m fw-700">
                Treasury
              </Link>
              <Link
                to={ROUTES.DELEGATES}
                className="fc-black mr25 bg-gray-200 circle img--40 fs-xm flex-c flex-jc-c fw-700 flex-c">
                <TeamOutlined />
              </Link>
              {isAuthenticated && (
                <AppContainerHeaderAccount account={account} />
              )}
              {!isAuthenticated && (
                <div>
                  <Link to={ROUTES.LOGIN}>
                    <Button type="primary" icon={<UserOutlined />}>
                      Login
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
