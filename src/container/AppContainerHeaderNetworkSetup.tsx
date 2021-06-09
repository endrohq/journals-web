import * as React from 'react';
import { availableNetworks } from '../utils/network.utils';
import { Select } from 'antd';

const Option = Select.Option;

interface ContainerProps {}

export const AppContainerHeaderNetworkSetup: React.FC<ContainerProps> = () => {
  // TODO : const { setEndpoint } = useLiskClient();

  function setNetwork(identifier: string) {
    /*const network: any = availableNetworks.find(
      item => item.identifier === identifier
    );
    setEndpoint({ wsUrl: network?.wsUrl, nodeUrl: network?.nodeUrl });*/
  }

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
