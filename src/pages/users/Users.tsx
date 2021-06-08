import React, { useEffect, useState } from 'react';
import { Loading } from '../../components/loaders/Loading';
import { RouteComponentProps } from 'react-router';
import { UsersItem } from 'src/pages/users/UsersItem';
import { ApiResponse } from '../../typings';
import { useApi } from 'src/services/use-api';
import { LiskAccount } from '@lisk-react/types';

interface MatchParams {
  address: string;
}

interface ContainerProps extends RouteComponentProps<MatchParams> {}

const Users: React.FC<ContainerProps> = () => {
  const { api } = useApi();
  const [loading, setLoading] = useState<boolean>(true);
  const [response, setResponse] =
    useState<ApiResponse<LiskAccount[]>>(undefined);

  async function getDelegates() {
    try {
      const response = await api.delegates.findAll();
      setResponse(response);
    } catch (e) {
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
    <div className="grid mt50">
      <div className="rounded-1 border bg-white">
        <div className="flex-c bgc-xxl-grey p15-25 br5-top ffm-bold fc-black border-bottom">
          <div className="w10">Rank</div>
          <div className="w20">Username</div>
          <div className="w40">Address</div>
        </div>
        {response.data.map((item: LiskAccount, idx: number) => (
          <UsersItem
            account={item}
            index={idx}
            isLastChild={idx === response.data.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;
