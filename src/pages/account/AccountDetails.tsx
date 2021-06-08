import React, { useEffect, useState } from 'react';
import { AccountDetailsHeader } from './AccountDetailsHeader';
import { Loading } from '../../components/loaders/Loading';
import { RouteComponentProps } from 'react-router';

import { isObjectWithFields } from '../../utils/type.utils';
import { AccountDetailsNotFound } from './AccountDetailsNotFound';
import { LiskAccount } from '@lisk-react/types';
import { useLisk } from '@lisk-react/use-lisk';

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

  const { client } = useLisk();

  /*
  const menu = useMemo(() => {
    return getAccountDetailsMenu();
  }, [])*/

  async function getAccountDetails() {
    try {
      const account = (await client.account.get(address)) as LiskAccount;
      setAccount(account);
    } catch (e) {
      console.error(e);
      setAccount({ address, keys: { publicKey: '', privateKey: '' } });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getAccountDetails();
    return () => setLoading(true);
  }, [address]);

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
