import * as React from 'react';

import { useClient } from '@lisk-react/use-lisk';

interface ContainerProps {}

export const AppContainerHeaderActiveConnection: React.FC<ContainerProps> =
  () => {
    const { network } = useClient();
    return (
      <>
        {!network.isConnected && (
          <div className="pt10 pb10 flex-c flex-jc-c bg-black-500 fc-white w100">
            You are not connected with a blockchain
          </div>
        )}
      </>
    );
  };
