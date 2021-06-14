import React, { useEffect, useState } from 'react';
import { AccountDetailsHeader } from './AccountDetailsHeader';
import { Loading } from '../../components/loaders/Loading';
import { RouteComponentProps } from 'react-router';

import { isObjectWithFields } from '../../utils/type.utils';
import { AccountDetailsNotFound } from './AccountDetailsNotFound';
import { LiskAccount } from '@lisk-react/types';
import { useLiskClient } from '@lisk-react/use-lisk';
import { normalizeAccount } from '@lisk-react/core';

interface MatchParams {
  address: string;
}

interface ContainerProps extends RouteComponentProps<MatchParams> {}

const AccountDetails: React.FC<ContainerProps> = ({
  match: {
    params: { address }
  }
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [account, setAccount] = useState<LiskAccount>();

  const {
    client,
    network: { isConnected }
  } = useLiskClient();

  useEffect(() => {
    if (isConnected && client) {
      getAccountDetails();
    }
  }, [isConnected, address]);

  async function getAccountDetails() {
    try {
      const account = (await client.account.get(address)) as LiskAccount;
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
    Component = <AccountDetailsNotFound address={address} />;
  }

  return (
    <div className="grid mt50">
      <AccountDetailsHeader account={account} />
      <div className="w100 mb25" />
      {Component}
    </div>
  );
};

export default AccountDetails;
