import * as React from 'react';

import { BlockOutlined } from '@ant-design/icons';
import { useLiskClient } from '@lisk-react/use-lisk';

interface ContainerProps {}

export const AppContainerHeaderBlockHeight: React.FC<ContainerProps> = () => {
  const { block } = useLiskClient();
  return (
    <div className="fc-black mr25 fw-700 flex-c">
      <BlockOutlined className="fs-xm" />
      <span className="ml10">{block.header.height}</span>
    </div>
  );
};
