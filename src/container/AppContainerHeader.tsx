import * as React from 'react';

import { AppContainerHeaderAuthenticated } from './AppContainerHeaderAuthenticated';
import { Link } from 'react-router-dom';
import { Logo } from '../assets/Logo';
import { ROUTES } from '../shared/router/routes';
import { AppContainerHeaderNetworkSetup } from './AppContainerHeaderNetworkSetup';
import { useLiskWallet } from '../lisk-react/providers/LiskWalletProvider';

interface ContainerProps {}

export const AppContainerHeader: React.FC<ContainerProps> = () => {
  const { isAuthenticated } = useLiskWallet();

  return (
    <div
      style={{ top: '0px' }}
      className="w100 bgc-white h70--fixed br-b pos-fixed overflow-hidden">
      <div className="w100 pr15 pl15 h70--fixed m-auto flex-c">
        <div className="h100 flex-c mr50">
          <Link to={ROUTES.HOME} className="ml25 flex-c h100 w85--fixed">
            <Logo className="w85--fixed" />
          </Link>
        </div>
        {isAuthenticated ? (
          <>
            <AppContainerHeaderAuthenticated />
          </>
        ) : (
          <AppContainerHeaderNetworkSetup />
        )}
      </div>
    </div>
  );
};
