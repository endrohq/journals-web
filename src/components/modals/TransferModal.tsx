import React from 'react';

import { ModalProps } from './';
import { FormInput } from 'src/components/input/FormInput';
import { Button } from 'antd';

export const TransferModal: React.FC<ModalProps> = ({ onSubmit }) => {
  const [submitting, setSubmitting] = React.useState(false);
  const [amount, setAmount] = React.useState<number>();

  async function handleSubmit() {
    setSubmitting(true);
    await onSubmit();
  }

  return (
    <div>
      <h1>Transfer {submitting}</h1>
      <div className="mb25">
        <FormInput
          label="Amount"
          property="amount"
          input_type="number"
          value={amount}
          setValue={setAmount}
        />
      </div>

      <Button className="h45--fixed" block onClick={handleSubmit}>
        Transfer
      </Button>
    </div>
  );
};
