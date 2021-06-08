import React, { useEffect, useState } from 'react';
import { Button, message } from 'antd';
import { History } from 'history';
import { ROUTES } from '../../shared/router/routes';
import { Link } from 'react-router-dom';
import { InitialiseAccountItem } from './InitialiseAccountItem';
import { PageLoading } from '../../components/loaders/PageLoading';
import { isObjectWithFields } from '../../utils/type.utils';
import { InitialiseAccountVerification } from './InitialiseAccountVerification';
import { useLisk } from '@lisk-react/use-lisk';
import { LiskAccount } from '@lisk-react/types';

interface ContainerProps {
  history: History;
}

const InitialiseAccount: React.FC<ContainerProps> = ({ history }) => {
  const {
    wallet: { generate, setAccount, account }
  } = useLisk();
  const [accounts, setAccounts] = useState<LiskAccount[]>();
  const [selectedAccount, selectAccount] = useState<LiskAccount>();
  const [loading, setLoading] = useState<boolean>(true);
  const [verifyAccount, setVerifyAccount] = useState<boolean>(false);
  const [preparingAccount, setPreparingAccount] = useState<boolean>(false);

  useEffect(() => {
    let accs = [];
    for (let i = 0; i < 5; i++) {
      accs.push(generate());
    }
    setAccounts(accs);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (account && preparingAccount) {
      history.push(ROUTES.HOME);
    }
  }, [account]);

  async function confirmAccount() {
    try {
      await setAccount(selectedAccount);
      setPreparingAccount(true);
    } catch (e) {
      console.error(e);
      message.error('something went wrong');
    }
  }

  if (loading || preparingAccount) {
    return <PageLoading />;
  }

  if (verifyAccount) {
    return (
      <InitialiseAccountVerification
        confirmAccount={confirmAccount}
        selectedAccount={selectedAccount}
      />
    );
  }

  return (
    <div className="grid-s mt125 mb200 m-auto">
      <div className="mb50 flex-c flex-jc-c flex-column">
        <h1 className="fs-l fw-bold p0 m0 mb5">Choose your avatar</h1>
        <h2 className="w70 txt-ac fs-m fc-grey p0 m0">
          We provided you with 5 different empty accounts. Please choose one of
          your lickings.
        </h2>
      </div>
      <div className="grid-col5 mb50">
        {accounts.map(item => (
          <InitialiseAccountItem
            key={item.keys.publicKey}
            selectedAccount={selectedAccount}
            account={item}
            setAccount={selectAccount}
          />
        ))}
      </div>
      <div className="flex-c flex-column">
        <Button
          onClick={() => setVerifyAccount(true)}
          disabled={!isObjectWithFields(selectedAccount)}
          type="primary"
          className="w250--fixed h45--fixed">
          Next
        </Button>
        <Link to={ROUTES.LOGIN} className="mt25 fc-lgrey">
          <span className="ml10">Go Back</span>
        </Link>
      </div>
    </div>
  );
};

export default InitialiseAccount;
