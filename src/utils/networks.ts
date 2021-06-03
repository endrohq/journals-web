import { LiskNetwork } from '@lisk-react/types';

interface Network extends LiskNetwork {
  name: string;
  identifier: string;
}

export const availableNetworks: Network[] = [
  {
    name: 'Alphanet',
    identifier: 'alphanet',
    nodeUrl: 'http://localhost:4000',
    wsUrl: 'ws://localhost:4001/ws'
  }
];
