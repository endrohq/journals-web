import React, { useEffect } from 'react';
import { FormInput } from 'src/components/input/FormInput';
import { TransferAssetForm } from './TransferModal';
import { AccountThumbnailCard } from '../../account/AccountThumbnailCard';
import { ArrowRightOutlined } from '@ant-design/icons';
import { LiskAccount } from '@lisk-react/types';
import { NavigationFooter } from '../../navigation/NavigationFooter';

interface Props {
  close(): void;
  submit(values: TransferAssetForm): void;
  account: LiskAccount;
  fromOwnWallet: boolean;
  isHandlingTxSubmit: boolean;
  to?: string;
}

export const TransferModalForm: React.FC<Props> = ({
  close,
  submit,
  account,
  fromOwnWallet,
  isHandlingTxSubmit,
  to
}) => {
  const [amount, setAmount] = React.useState<number>();
  const [recipientAddress, setRecipient] = React.useState<string>();

  useEffect(() => {
    if (fromOwnWallet) {
      setRecipient(to);
    }
  }, []);

  return (
    <>
      <div className="flex-c mb15 bg-gray-200 p15-25">
        <AccountThumbnailCard address={account?.address} />
        <div className="ml15 mr15">
          <ArrowRightOutlined />
        </div>
        <AccountThumbnailCard address={recipientAddress} />
      </div>
      <div className="pl25 pr25">
        <div className=" mb25">
          <FormInput
            label="Recipient *"
            property="recipient"
            placeholder="Insert public address"
            value={recipientAddress}
            disabled={fromOwnWallet}
            setValue={setRecipient}
          />
        </div>
        <div className="mb25">
          <FormInput
            label="Amount *"
            property="amount"
            input_type="number"
            value={amount}
            setValue={setAmount}
          />
        </div>
        <div className=" mb25">
          <FormInput
            label="Optional message"
            property="recipient"
            placeholder="Insert public address"
            value={amount}
            setValue={setAmount}
          />
        </div>
      </div>
      <NavigationFooter
        disabled={isHandlingTxSubmit || !amount || amount <= 0}
        action={() => submit({ amount, recipientAddress })}
        close={close}
        confirmLabel="Transfer"
      />
    </>
  );
};
