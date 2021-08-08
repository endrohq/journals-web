import { FC, useEffect, useState } from 'react';
import { useApi } from '../../services/use-api';
import { useWallet } from '@lisk-react/use-lisk';
import { PageLoading } from '../../components/loaders/PageLoading';
import { ContentItem } from '../../typings';
import { MyEventsList } from './MyEventsList';

const MyEvents: FC = () => {
  const [loading, setLoading] = useState(false);
  const [bucketList, setBucketList] = useState<ContentItem>();
  const { api } = useApi();
  const { account } = useWallet();

  async function fetchData() {
    try {
      const { data } = await api.storage.findByAddress(account.address);
      setBucketList(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grid-xl mt50">
      <h1 className="fw-700">My Uploads</h1>
      {loading ? <PageLoading /> : <MyEventsList items={bucketList?.items} />}
    </div>
  );
};

export default MyEvents;
