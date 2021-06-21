import React, { useEffect, useState } from 'react';
import { AccountHeader } from './AccountHeader';
import { Loading } from '../../components/loaders/Loading';
import { RouteComponentProps } from 'react-router';

import { isObjectWithFields } from '../../utils/type.utils';
import { AccountNotFound } from './AccountNotFound';
import { LiskAccount } from '@lisk-react/types';
import { useClient } from '@lisk-react/use-lisk';
import { normalizeAccount } from '@lisk-react/core';
import { AccountRegisterUsername } from './AccountRegisterUsername';

interface MatchParams {
  address: string;
}

interface ContainerProps extends RouteComponentProps<MatchParams> {}

const Account: React.FC<ContainerProps> = ({
  match: {
    params: { address }
  }
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [account, setAccount] = useState<LiskAccount>();

  const {
    client,
    network: { isConnected }
  } = useClient();

  useEffect(() => {
    if (isConnected && client) {
      getAccountDetails();
    }
  }, [isConnected, address]);

  async function getAccountDetails() {
    try {
      const account = (await client.account.get(address)) as LiskAccount;
      console.log(account);
      setAccount(normalizeAccount(account, ''));
    } catch (e) {
      console.log(e);
      setAccount({ address, keys: { publicKey: '', privateKey: '' } });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="grid mt75 flex-c flex-jc-c">
        <Loading />
      </div>
    );
  }

  let Component;

  if (!isObjectWithFields(account)) {
    Component = <AccountNotFound address={address} />;
  }

  return (
    <div className="mt50 w90 flex-fs flex-jc-sb m-auto">
      <div className="w25">
        <AccountHeader account={account} />
      </div>
      <div className="w70">
        {!account?.dpos?.delegate?.username && (
          <AccountRegisterUsername
            refresh={getAccountDetails}
            activeAddress={account?.address}
          />
        )}
        {Component}
      </div>
    </div>
  );
};

export default Account;
