import { FC, useEffect, useState } from 'react';
import { LiskAccount } from '@lisk-react/types';
import { useClient } from '@lisk-react/use-lisk';
import { normalizeAccount } from '@lisk-react/core';
import { Loading } from '../../components/loaders/Loading';
import { ENV } from '../../env';

const TreasuryPage: FC = () => {
  const [treasury, setTreasury] = useState<LiskAccount>();
  const [loading, setLoading] = useState<boolean>(true);

  const {
    client,
    network: { isConnected }
  } = useClient();

  useEffect(() => {
    if (isConnected && client) {
      getTreasuryDetails();
    }
  }, [isConnected]);

  async function getTreasuryDetails() {
    try {
      const account = (await client.account.get(
        ENV.TREASURY_ADDRESS
      )) as LiskAccount;
      setTreasury(normalizeAccount(account, ''));
    } catch (e) {
      console.log(e);
      setTreasury({
        address: ENV.TREASURY_ADDRESS,
        keys: { publicKey: '', privateKey: '' }
      });
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

  return (
    <div className="grid-xl mt50">
      <div className="flex-c mb200">
        <div className="mr50">
          <div className="img--150 flex-c flex-column flex-jc-c bg-gray-200 rounded-1">
            <div className="fc-gray-500 fs-m p0 m0">Round</div>
            <div className="fw-700 fs-xxl lh-normal p0 m0">0</div>
          </div>
        </div>
        <div>
          <h1 className="fw-700 p0 m0">Treasury</h1>
          <div>Block 0 - 500</div>
        </div>
      </div>
      {JSON.stringify(treasury, null, 2)}
    </div>
  );
};

export default TreasuryPage;
