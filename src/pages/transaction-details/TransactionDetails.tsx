import { RouteComponentProps } from 'react-router';
import React, { useEffect, useState } from 'react';
import { Loading } from '../../components/loaders/Loading';
import { useClient } from '@lisk-react/use-lisk';
import { normalize } from '../../utils/object.utils';

interface MatchParams {
  txId: string;
}

interface ContainerProps extends RouteComponentProps<MatchParams> {}

const TransactionDetails: React.FC<ContainerProps> = ({ match }) => {
  const { txId } = match.params;
  const [loading, setLoading] = useState<boolean>(true);
  const [transaction, setTransaction] = useState(undefined);
  const {
    client,
    network: { isConnected }
  } = useClient();

  async function fetchTransaction() {
    try {
      const data = (await client.invoke('app:getTransactionByID', {
        id: txId
      })) as string;
      const transaction = await client.transaction.decode(data);
      setTransaction(normalize(transaction));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isConnected) {
      fetchTransaction();
    }
  }, [txId, isConnected]);

  if (loading) {
    return (
      <div className="grid mt75 flex-c flex-jc-c">
        <Loading />
      </div>
    );
  }

  return (
    <div className="grid mt75">
      <div className="w100 mb25 border-bottom pb25">
        <div className="fs-m lh-normal mb10 fc-gray-700">
          Transaction Details
        </div>
        <div className="fs-l lh-normal fw-700 fc-black"> {txId}</div>
      </div>
      <div className="w50 flex-fs flex-column">
        <pre>{JSON.stringify(transaction, null, 2)}</pre>
      </div>
    </div>
  );
};

export default TransactionDetails;
