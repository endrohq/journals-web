import * as React from 'react';
import { Link } from 'react-router-dom';
import { AppContainerHeaderAuthenticatedAccount } from './AppContainerHeaderAuthenticatedAccount';
import { useLiskWallet } from '@lisk-react/use-wallet';
import {useLiskClient} from "@lisk-react/use-client";
import {BlockOutlined, TeamOutlined} from "@ant-design/icons";
import {ROUTES} from "src/shared/router/routes";

interface ContainerProps {}

export const AppContainerHeaderAuthenticated: React.FC<ContainerProps> = () => {
  const { account, isAuthenticated } = useLiskWallet();
  const { block } = useLiskClient();

  return (
    <div className="w100 flex-c ml50">
      <div className="ml-auto flex-c">
        <Link
            to={ROUTES.DELEGATES}
          className="fc-black mr25 bg-gray-200 circle img--40 fs-xm flex-c flex-jc-c fw-bold flex-c">
          <TeamOutlined />
        </Link>
        <div
          className="fc-black mr25 fw-bold flex-c">
          <BlockOutlined className="fs-xm" />
          <span className="ml10">{block.header.height}</span>
        </div>
        {
          isAuthenticated && <AppContainerHeaderAuthenticatedAccount account={account} />
        }
      </div>
    </div>
  );
};
