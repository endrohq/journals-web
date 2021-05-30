import * as React from 'react';
import { AppContainerHeaderAuthenticatedAccount } from './AppContainerHeaderAuthenticatedAccount';
import { Link } from 'react-router-dom';
import { ROUTES } from '../shared/router/routes';
import { PlusOutlined } from '@ant-design/icons';
import { useLiskWallet } from '../lisk-react/providers/LiskWalletProvider';

interface ContainerProps {}

export const AppContainerHeaderAuthenticated: React.FC<ContainerProps> = () => {
  const { account } = useLiskWallet();

  return (
    <div className="w100 flex-c ml50">
      <Link to={ROUTES.VOTING} className="click fc-black mr25 ffm-bold flex-c">
        <span className="">Voting</span>
      </Link>
      <div className="ml-auto flex-c">
        <Link
          to={ROUTES.CREATE_GAME}
          className="click fc-black mr25 ffm-bold flex-c">
          <div className="fs-xs">
            <PlusOutlined />
          </div>
          <span className="ml5">Create</span>
        </Link>
        <AppContainerHeaderAuthenticatedAccount account={account} />
      </div>
    </div>
  );
};
