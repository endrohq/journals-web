/**
 * A custom useEffect hook that enables you to interact with a blockchain built with the Lisk SDK
 * @param {Function} effect
 * @param {Array<any>} dependencies
 */
import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { apiClient } from '@liskhq/lisk-client';
import { APIClient } from '@liskhq/lisk-api-client/dist-node/api_client';
import { BlockModel } from '../typings';
import { ConvertedBlock } from '../utils/block.utils';

const { createWSClient } = apiClient;

/*

const initialState: SessionState = {
  account: {
    address: '954356120d19e70508be4ceac35539069dbdb99d',
    passphrase:
      'index rib someone inmate pony girl aisle skull immune raccoon wreck photo',
    keys: {
      publicKey:
        'b958c831d69695d7eb7d0e180272e4e4ba199aabfa9fc52a0b5f77694dcd5b57',
      privateKey:
        '94b0b1b948a5d4acf0ab1102aadccffb4aa121b46a1bcf1e9995ca71b2644704b958c831d69695d7eb7d0e180272e4e4ba199aabfa9fc52a0b5f77694dcd5b57'
    },
    token: {
      balance: '0'
    },
    dpos: {
      delegate: {
        username: 'arcado',
        consecutiveMissedBlocks: 0,
        isBanned: false,
        lastForgedHeight: 0,
        pomHeights: [],
        totalVotesReceived: '0'
      },
      sentVotes: [],
      unlocking: []
    }
  },
  isValidAndSynced: true,
  isValidAndLoading: false,
  hasAuthenticated: false
};


* */

export interface LiskClientContextStateProps {
  setTargetNetwork(network: LiskNetwork): void;
  targetNetwork: LiskNetwork;
  active: boolean;
  blockHeight: number;
  block: BlockModel;
  client: APIClient;
}

export interface LiskNetwork {
  name: string;
  identifier: string;
  nodeUrl: string;
  wsUrl: string;
}

export const LiskClientContext =
  React.createContext<LiskClientContextStateProps>(
    {} as LiskClientContextStateProps
  );

export const useLiskClient = () => useContext(LiskClientContext);

export const LiskClientProvider: FC<{ targetNetwork?: LiskNetwork }> = ({
  children,
  targetNetwork
}) => {
  const [blockHeight, setBlockHeight] = useState<number>(0);
  const [active, setActive] = useState<boolean>(false);
  const [network, setNetwork] = useState<LiskNetwork>(targetNetwork);
  const [block, setBlock] = useState<BlockModel>();
  const [client, setClient] = useState<APIClient>();

  const blockConverter = useMemo(() => {
    return new ConvertedBlock();
  }, []);

  useEffect(() => {
    if (network) setupWebsocketListener();
  }, [network]);

  useEffect(() => {
    if (client) startSubscriptions();
  }, [client]);

  async function setupWebsocketListener() {
    const wsClient = await createWSClient(network.wsUrl);
    setClient(wsClient);
  }

  async function startSubscriptions() {
    client.subscribe('app:network:ready', () => {
      setActive(true);
    });

    client.subscribe('app:shutdown', () => {
      setActive(false);
    });

    client.subscribe('app:block:new', ({ block }: any) => {
      const decodedBlock = client.block.decode(block);
      const convertedBlock = blockConverter.process(decodedBlock);
      setBlockHeight(convertedBlock.header.height);
      setBlock(convertedBlock);
    });
  }

  function setTargetNetwork(network: LiskNetwork) {
    setNetwork(network);
  }

  const value = useMemo(
    () => ({
      setTargetNetwork,
      targetNetwork: network,
      blockHeight,
      active,
      block,
      client
    }),
    [client, block, network]
  );

  return (
    <LiskClientContext.Provider value={value}>
      {children}
    </LiskClientContext.Provider>
  );
};
