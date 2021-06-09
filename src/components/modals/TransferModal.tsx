import React from 'react';

import { ModalProps, TransferProps } from '.';
import { FormInput } from 'src/components/input/FormInput';
import { Button } from 'antd';
import { getShortenedAddress } from '../../utils/account.utils';
import { LiskAvatar } from '../lisk-avatar/LiskAvatar';
import { ArrowRightOutlined } from '@ant-design/icons';
import { ENV } from '../../env';
import { useLiskWallet } from '@lisk-react/use-lisk';

const UserCard: React.FC<{ address: string }> = ({ address }) => (
  <div className="bg-white bg-white p15-25 flex-c w50 rounded-1">
    <LiskAvatar address={address} size={25} />
    <div className="ml15">{getShortenedAddress(address)}</div>
  </div>
);

export const TransferModal: React.FC<ModalProps<TransferProps>> = ({
  close,
  onSubmit,
  data
}) => {
  const [submitting, setSubmitting] = React.useState(false);
  const [amount, setAmount] = React.useState<number>();
  const { account } = useLiskWallet();

  async function handleSubmit() {
    setSubmitting(true);
    await onSubmit();
  }

  return (
    <div className="">
      <div className="pt25 pl15 pr15 ">
        <h2 className="fw-bold fs-xm p0 m0">Transfer</h2>
        <p>Send {ENV.TICKER} from 1 account to another</p>
      </div>
      <div className="flex-c mb15 bg-gray-200 p15-25">
        <UserCard address={account?.address} />
        <div className="ml15 mr15">
          <ArrowRightOutlined />
        </div>
        <UserCard address={data?.to} />
      </div>
      <div className="pl15 pr15 mb25">
        <FormInput
          label="Amount"
          property="amount"
          input_type="number"
          value={amount}
          setValue={setAmount}
        />
      </div>

      <div className="pl15 pr15 border-top pt15 pb15 flex-c flex-jc-fe">
        <div onClick={close} className="mr25 fc-grey click">
          <span>Cancel</span>
        </div>
        <Button
          className=""
          type="primary"
          disabled={submitting || !amount || amount <= 0}
          onClick={handleSubmit}>
          Transfer
        </Button>
      </div>
    </div>
  );
};
