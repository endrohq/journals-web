import * as React from 'react';

import { Link } from 'react-router-dom';
import { Logo } from '../assets/Logo';
import { ROUTES } from '../shared/router/routes';
import { AppContainerHeaderAccount } from './AppContainerHeaderAccount';
import { useWallet } from '@lisk-react/use-lisk';
import { AppContainerHeaderSearchBar } from './AppContainerHeaderSearchBar';
import { Button } from 'antd';

interface ContainerProps {}

export const AppContainerHeader: React.FC<ContainerProps> = () => {
  const { isAuthenticated, account } = useWallet();
  return (
    <div className="w100 bg-white h60--fixed flex-c border-bottom">
      <div className="h100 pl25 flex-c">
        <Link
          to={ROUTES.HOME}
          className="fc-black fc-lb__hover flex-c mr50 flex-c ">
          <Logo className="" height={27} />
        </Link>
      </div>
      <AppContainerHeaderSearchBar />
      <div className="w100 flex-c ml50">
        <div className="ml-auto flex-c">
          <Link to={ROUTES.CREATE_EVENT} className="fc-black mr25 fs-m fw-700">
            Publish
          </Link>
          <Link to={ROUTES.TREASURY} className="fc-black mr25 fs-m fw-700">
            Treasury
          </Link>
          {isAuthenticated && <AppContainerHeaderAccount account={account} />}
          {!isAuthenticated && (
            <div className="pr25">
              <Link to={ROUTES.LOGIN}>
                <Button type="primary" className="h40--fixed w100--fixed">
                  Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
