/**
 * A custom useEffect hook that enables you to interact with a blockchain built with the Lisk SDK
 * @param {Function} effect
 * @param {Array<any>} dependencies
 */
import React, { FC, useContext, useMemo, useState } from 'react';
import { getAccountByPassphrase } from '../utils/account.utils';
import { LiskAccount } from '../typings';
import { useLiskClient } from './LiskClientProvider';
import { cryptography } from '@liskhq/lisk-client';
import { _arrayBufferToString } from '../../utils/string-to-hex';
import * as passphrase from '@liskhq/lisk-passphrase';

const { Mnemonic } = passphrase;
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

export interface LiskWalletContextStateProps {
  isAuthenticated: boolean;
  loading: boolean;
  account: LiskAccount;
  authenticate(passphrase: string): Promise<void>;
  logout(): void;
  createAccount(): LiskAccount;
  setAccount(account: LiskAccount): void;
}

export const LiskWalletContext =
  React.createContext<LiskWalletContextStateProps>(
    {} as LiskWalletContextStateProps
  );

export const useLiskWallet = () => useContext(LiskWalletContext);

interface Props {
  children: JSX.Element;
}

export const LiskWalletProvider: FC<Props> = ({ children }) => {
  const { client } = useLiskClient();
  const [account, setAccount] = useState<LiskAccount>();
  const [loading, setLoading] = useState<boolean>(false);

  async function authenticate(passphrase: string): Promise<void> {
    const account = getAccountByPassphrase(passphrase);
    if (client && account !== null && Object.keys(account).length > 0) {
      updateAccount(account?.address);
    } else {
      setAccount(account);
    }
  }

  function setLiskAccount(account: LiskAccount) {
    setAccount(account);
  }

  function logout() {
    setAccount(undefined);
  }

  function createAccount() {
    const passphrase = Mnemonic.generateMnemonic();
    const keys = cryptography.getPrivateAndPublicKeyFromPassphrase(passphrase);
    const publicKey = _arrayBufferToString(keys.publicKey);
    const privateKey = _arrayBufferToString(keys.privateKey);
    // @ts-ignore
    const address = cryptography
      .getAddressFromPassphrase(passphrase)
      .toString('hex');
    const account: LiskAccount = {
      address,
      keys: {
        publicKey,
        privateKey
      },
      passphrase,
      token: {
        balance: '0'
      },
      dpos: {
        delegate: {
          username: '',
          consecutiveMissedBlocks: 0,
          lastForgedHeight: 0,
          pomHeights: [],
          totalVotesReceived: '',
          isBanned: false
        },
        unlocking: [],
        sentVotes: []
      }
    };
    return account;
  }

  async function updateAccount(address: string): Promise<void> {
    await setLoading(true);
    const account = (await client.account.get(address)) as LiskAccount;
    setAccount(account);
    setLoading(false);
  }

  const value = useMemo(
    () => ({
      isAuthenticated: !!account,
      authenticate,
      logout,
      account,
      createAccount,
      setAccount: setLiskAccount,
      loading
    }),
    [account, loading]
  );

  return (
    <LiskWalletContext.Provider value={value}>
      {children}
    </LiskWalletContext.Provider>
  );
};
