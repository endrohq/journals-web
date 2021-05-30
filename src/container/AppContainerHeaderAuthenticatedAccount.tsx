import * as React from 'react';
import { getAccountDetailsRoute, ROUTES } from '../shared/router/routes';
import { LiskAvatar } from '../components/lisk-avatar/LiskAvatar';
import { HeaderDropDown } from '../components/dropdown-menu/HeaderDropDown';
import { getFormattedNumber } from '../utils/numbers';
import { useEffect, useMemo, useRef } from 'react';
import {
  DownOutlined,
  LogoutOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { LiskAccount } from '../lisk-react/typings';

interface ContainerProps {
  account: LiskAccount;
}

export const AppContainerHeaderAuthenticatedAccount: React.FC<ContainerProps> =
  ({ account }) => {
    const menu = useMemo(() => {
      return [
        {
          key: 'settings',
          label: 'Settings',
          path: ROUTES.SETTINGS,
          icon: <SettingOutlined />
        },
        {
          divide: true
        },
        {
          key: 'logout',
          label: 'Log out',
          path: ROUTES.LOGOUT,
          icon: <LogoutOutlined />
        }
      ];
    }, []);

    const balanceRef: any = useRef(null);

    useEffect(() => {
      const balanceNode = balanceRef.current;
      if (
        balanceNode &&
        balanceNode.classList &&
        account.token.balance !== '0'
      ) {
        balanceNode.classList.add('balance-updated');
        setTimeout(() => {
          balanceNode.classList.remove('balance-updated');
        }, 3000);
      }
    }, [account.token.balance]);

    return (
      <div className="flex-c h60--fixed">
        <Link
          to={getAccountDetailsRoute(account.address)}
          ref={balanceRef}
          className="flex-c click p5-10 bgc-lblue br20 mr15">
          <span className="mr10 fc-blue ffm-bold ml15">
            {getFormattedNumber(account.token.balance)} ARCD
          </span>
        </Link>
        <HeaderDropDown menu={menu}>
          <div className="click flex-c flex-jc-c h70--fixed">
            <div className="ml15 arcado-avatar mr10">
              <LiskAvatar address={account.address} size="xs" />
            </div>
            <div className="fs-xxs">
              <DownOutlined />
            </div>
          </div>
        </HeaderDropDown>
      </div>
    );
  };
