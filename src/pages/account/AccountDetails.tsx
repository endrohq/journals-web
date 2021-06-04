import React, { useEffect, useState } from 'react';
import { AccountDetailsHeader } from './AccountDetailsHeader';
import { Loading } from '../../components/loaders/Loading';
import { RouteComponentProps } from 'react-router';

import { isObjectWithFields } from '../../utils/type-checking';
import { AccountDetailsNotFound } from './AccountDetailsNotFound';
import { LiskAccount } from '@lisk-react/types';
import { useLiskClient } from '@lisk-react/use-client';

interface MatchParams {
  address: string;
}

interface ContainerProps extends RouteComponentProps<MatchParams> {}

const AccountDetails: React.FC<ContainerProps> = ({ match }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [account, setAccount] = useState<LiskAccount>();

  const { client } = useLiskClient();
  /*
  const menu = useMemo(() => {
    return getAccountDetailsMenu();
  }, [])*/

  const { address } = match.params;

  async function getAccountDetails() {
    try {
      const account = (await client.account.get(address)) as LiskAccount;
      setAccount(account);
    } catch (e) {
      console.log(e);
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

  if (!isObjectWithFields(account)) {
    return <AccountDetailsNotFound address={address} />;
  }

  return (
    <div className="grid mt50">
      <AccountDetailsHeader account={account} />
      <div className="w100 mb25"></div>

      {/*<AccountDetailsTransactions
        account={account}
      />*/}
    </div>
  );
};

export default AccountDetails;
