import * as React from 'react';
import { availableNetworks } from '../utils/networks';
import { Select } from 'antd';
import { useEffect } from 'react';
import { useLiskClient } from '../lisk-react/providers/LiskClientProvider';

const Option = Select.Option;

interface ContainerProps {}

export const AppContainerHeaderNetworkSetup: React.FC<ContainerProps> = () => {
  const { setTargetNetwork } = useLiskClient();

  function setNetwork(identifier: string) {
    const network = availableNetworks.find(
      item => item.identifier === identifier
    );
    setTargetNetwork(network);
  }

  useEffect(() => {
    setTargetNetwork(availableNetworks[0]);
  }, []);

  return (
    <div className="ml-auto flex-c">
      <span className="mr10">Target network:</span>
      <Select
        className="w175--fixed"
        defaultValue={availableNetworks[0].identifier}
        onChange={(identifier: string) => setNetwork(identifier)}
        placeholder="">
        {availableNetworks.map(item => (
          <Option value={item.identifier}>{item.name}</Option>
        ))}
      </Select>
    </div>
  );
};
