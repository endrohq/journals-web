import React, { useEffect, useState } from 'react';
import { Loading } from '../../components/loaders/Loading';
import { LiskAccount } from '@lisk-react/types';

interface ContainerProps {
  account: LiskAccount;
}

const AccountTransactions: React.FC<ContainerProps> = ({ account }) => {
  //const [txResponse, setTxResponse] = useState<ApiResponseModel<AssetModel[]>>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        //const response = await getTransactionsByAddress(account.address);
        //setTxResponse(response);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {/*<div className="flex-c fw-bold pt10 pb10 fc-lb br-t br-b fs-s">
        <span className="w20">Tx Id</span>
        <span className="w15">Age</span>
        <span className="w20">From</span>
        <span className="w20">To</span>
        <span className="w15">Value</span>
      </div>*/}
      {/*{
        !isArrayWithElements(txResponse.data)
        ? <AccountDetailsTransactionsNotFound />
        : txResponse.data.map(
          (transaction, index) =>
            <AccountDetailsTransactionsItem
              key={index}
              transaction={transaction}
              isLastChild={index === txResponse.data.length - 1}
            />
        )
      }*/}
      <div className="p15-25 w100 rounded-1 bg-white border flex-c flex-jc-c">
        <span className="fc-gray-200">Transactions not implemented</span>
      </div>
    </>
  );
};

export default AccountTransactions;
