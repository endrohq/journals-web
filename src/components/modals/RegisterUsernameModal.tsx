import React from 'react';
import { ModalProps, ModalType, TxConfirmationProps } from './index';
import { useClient, useWallet } from '@lisk-react/use-lisk';
import { FormInput } from '../input/FormInput';
import { NavigationFooter } from '../navigation/NavigationFooter';
import { TRANSACTION_COSTS } from '../../utils/transaction.utils';
import { useModal } from '../../hooks/useModal';

export const RegisterUsernameModal: React.FC<ModalProps> = ({
  close,
  onSubmit
}) => {
  const { openModal } = useModal();
  const [username, setUsername] = React.useState<string>();
  const { account } = useWallet();
  const { client } = useClient();

  async function handleSubmit() {
    const transaction = await client.transaction.create(
      {
        moduleID: 5,
        assetID: 0,
        nonce: BigInt(account.sequence.nonce),
        senderPublicKey: Buffer.from(account.keys.publicKey, 'hex'),
        fee: BigInt(1100000000),
        asset: {
          username
        }
      },
      account.passphrase
    );
    openModal<TxConfirmationProps>(ModalType.TRANSACTION_CONFIRM, {
      data: {
        transaction,
        transactionCost: TRANSACTION_COSTS.REGISTER_DELEGATE
      },
      onSubmit
    });
  }

  return (
    <div className="pb25">
      <div className="pt25 pl25 pr25 ">
        <h2 className="fw-700 fs-xm p0 m0">Register username</h2>
        <p>Get recognized by the community</p>
      </div>
      <div className="pt25 pl25 pr25">
        <div className=" mb25">
          <FormInput
            label="Username"
            property="username"
            placeholder="hello_world"
            value={username}
            setValue={setUsername}
          />
        </div>
        <NavigationFooter
          disabled={!username || username?.length < 3}
          action={handleSubmit}
          close={close}
          confirmLabel="Register"
        />
      </div>
    </div>
  );
};
