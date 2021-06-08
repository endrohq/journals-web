import * as React from 'react';

import { Link } from 'react-router-dom';
import { Logo } from '../assets/Logo';
import { ROUTES } from '../shared/router/routes';
import { useLisk } from '@lisk-react/use-lisk';
import { TeamOutlined } from '@ant-design/icons';
import { BlockOutlined } from '@ant-design/icons';
import { AppContainerHeaderAccount } from './AppContainerHeaderAccount';
import { Button } from 'antd';

interface ContainerProps {}

export const AppContainerHeader: React.FC<ContainerProps> = () => {
  const {
    block,
    wallet: { isAuthenticated, account }
  } = useLisk();

  return (
    <div
      style={{ top: '0px' }}
      className="w100 bg-white h70--fixed border-bottom pos-fixed overflow-hidden">
      <div className="w100 pr15 pl15 h70--fixed m-auto flex-c">
        <div className="h100 flex-c mr50">
          <Link to={ROUTES.HOME} className="ml25 mt5 flex-c fc-black">
            <Logo className="" height={20} />
          </Link>
        </div>
        <div className="w100 flex-c ml50">
          <div className="ml-auto flex-c">
            <Link
              to={ROUTES.DELEGATES}
              className="fc-black mr25 bg-gray-200 circle img--40 fs-xm flex-c flex-jc-c fw-bold flex-c">
              <TeamOutlined />
            </Link>
            <div className="fc-black mr25 fw-bold flex-c">
              <BlockOutlined className="fs-xm" />
              <span className="ml10">{block.header.height}</span>
            </div>
            {isAuthenticated && <AppContainerHeaderAccount account={account} />}
            {!isAuthenticated && (
              <div>
                <Link to={ROUTES.LOGIN}>
                  <Button type="primary">Login</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
