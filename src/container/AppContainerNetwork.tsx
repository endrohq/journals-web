import * as React from 'react';

import { BlockOutlined } from '@ant-design/icons';
import { useBlock, useClient } from '@lisk-react/use-lisk';

interface ContainerProps {}

export const AppContainerNetwork: React.FC<ContainerProps> = () => {
  const { block } = useBlock();
  const {
    network: { isConnected }
  } = useClient();
  return (
    <div className="app-network fc-black mr15 mb15 bg-black-500 border p5-15 rounded-pill fw-700 flex-c">
      <div className="mr25">
        network: {isConnected ? 'connected' : 'not connected'}
      </div>
      <BlockOutlined className="fs-xm" />
      <span className="ml10">{block.header.height}</span>
    </div>
  );
};
