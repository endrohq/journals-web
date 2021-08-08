import * as React from 'react';
import { getAccountDetailsRoute, ROUTES } from '../shared/router/routes';
import { LiskAvatar } from '../components/lisk-avatar/LiskAvatar';
import { HeaderDropDown } from '../components/dropdown-menu/HeaderDropDown';
import { useEffect, useMemo, useRef } from 'react';
import {
  CaretDownFilled,
  ContainerOutlined,
  CrownOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons';
import { LiskAccount } from '@lisk-react/types';
import { getShortenedFormat } from '../utils/string.utils';

interface ContainerProps {
  account: LiskAccount;
}

export const AppContainerHeaderAccount: React.FC<ContainerProps> = ({
  account
}) => {
  const menu = useMemo(() => {
    return [
      {
        key: 'account',
        label: 'My Account',
        path: getAccountDetailsRoute(account.address),
        icon: <UserOutlined />
      },
      {
        key: 'subscription',
        label: 'Subscription',
        path: ROUTES.SUBSCRIPTION,
        icon: <CrownOutlined />
      },
      {
        key: 'my-events',
        label: 'My Events',
        path: ROUTES.MY_EVENTS,
        icon: <ContainerOutlined />
      },
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
    if (balanceNode && balanceNode.classList && account.token.balance !== '0') {
      balanceNode.classList.add('balance-updated');
      setTimeout(() => {
        balanceNode.classList.remove('balance-updated');
      }, 1500);
    }
  }, [account.token.balance]);

  return (
    <div className="flex-c h60--fixed mr25">
      <HeaderDropDown menu={menu}>
        <div className="click flex-c flex-jc-c h70--fixed">
          <div
            ref={balanceRef}
            className="flex-c click p5 bg-black-800 lh-none br20 mr15">
            <div className="journals-avatar mr5">
              <LiskAvatar address={account.address} size={30} />
            </div>
            <span className="mr10 fc-white fw-700 ml5">
              {getShortenedFormat(account.address)}
            </span>
            <div className="fs-xxs fc-white mr10">
              <CaretDownFilled />
            </div>
          </div>
        </div>
      </HeaderDropDown>
    </div>
  );
};
