import { FC, useEffect, useState } from 'react';
import { useClient } from '@lisk-react/use-lisk';
import { Loading } from '../../components/loaders/Loading';
import TreasuryPageEvents from './TreasuryPageEvents';
import { Treasury } from '../../typings';
import { TreasuryPageHeader } from './TreasuryPageHeader';

const TreasuryPage: FC = () => {
  const [treasury, setTreasury] = useState<Treasury>();
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
      const data = (await client.invoke(
        'treasury:getSnapshotByRound'
      )) as Treasury;
      console.log(data);
      setTreasury(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log(treasury);

  if (loading) {
    return (
      <div className="grid mt75 flex-c flex-jc-c">
        <Loading />
      </div>
    );
  }

  return (
    <div className="grid-xl mt50">
      <TreasuryPageHeader treasury={treasury} />
      <TreasuryPageEvents events={treasury?.events} />
    </div>
  );
};

export default TreasuryPage;
