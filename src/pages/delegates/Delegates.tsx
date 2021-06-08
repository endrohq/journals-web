import React, { useEffect, useState } from 'react';
import { Loading } from '../../components/loaders/Loading';
import { DelegatesItem } from './DelegatesItem';
import { ApiResponse } from '../../typings';
import { useApi } from '../../services/use-api';
import { LiskAccount } from '@lisk-react/types';

interface ContainerProps {}

const Delegates: React.FC<ContainerProps> = () => {
  const { api } = useApi();
  const [loading, setLoading] = useState<boolean>(true);
  const [response, setResponse] =
    useState<ApiResponse<LiskAccount[]>>(undefined);

  console.log('delegate rerender');

  async function getDelegates() {
    try {
      const response = await api.delegates.findAll();
      console.log(response);
      setResponse(response);
    } catch (e) {
      console.log(e);
      setResponse({ data: [], meta: undefined });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getDelegates();
  }, []);

  if (loading) {
    return (
      <div className="grid mt75 flex-c flex-jc-c">
        <Loading />
      </div>
    );
  }

  return (
    <div className="grid mt50 mb200">
      <div className="rounded-1 border">
        <div className="flex-c bg-white p15-25 br5-top ffm-bold fc-black border-bottom">
          <div className="w10">Rank</div>
          <div className="w20">Username</div>
          <div className="w40">Address</div>
        </div>
        {response?.data?.map((item: LiskAccount, idx: number) => (
          <DelegatesItem
            account={item}
            index={idx}
            isLastChild={idx === response.data.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default Delegates;
