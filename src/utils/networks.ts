import { LiskNetwork } from '../lisk-react/providers/LiskClientProvider';

export const availableNetworks: LiskNetwork[] = [
  {
    name: 'Alphanet',
    identifier: 'alphanet',
    nodeUrl: 'http://localhost:4000',
    wsUrl: 'ws://localhost:4001/ws'
  }
];
