import React, { useState } from 'react';
import { Button, message } from 'antd';
import Checkbox from 'antd/es/checkbox';
import { LiskAccount } from '@lisk-react/types';
import { WarningOutlined } from '@ant-design/icons';

interface ContainerProps {
  confirmAccount(): void;
  selectedAccount: LiskAccount;
}

export const InitialiseAccountVerification: React.FC<ContainerProps> = ({
  confirmAccount,
  selectedAccount
}) => {
  const [hasSavedPassphrase, setHasSavedPassphrase] = useState<boolean>(false);

  function copyToClipboard() {
    var textField = document.createElement('textarea');
    textField.innerText = selectedAccount.passphrase;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    message.success('copied to clipboard.');
  }

  return (
    <div className="grid-s m-auto flex-c flex-column mt75 mb200">
      <div className="w100 mb25 border-bottom pb25 flex-fs flex-jc-c flex-column">
        <h1 className="fs-xl fw-700 p0 m0 mb5">Almost There!</h1>
        <h2 className="fs-n fc-gray-600 p0 m0">
          It is of the utmost importance that you read following paragraph.
        </h2>
      </div>

      <div className="flex-fs flex-column w100">
        <div className="flex-c mb5 fc-red fw-700">
          <div className="mr10">
            <WarningOutlined />
          </div>
          <span>WARNING!</span>
        </div>
        <p className="">
          The <span className="fw-700 fc-black">Passphrase</span> given at the
          bottom is the only possible way to access your account.{' '}
          <span className="fw-700 fc-black">
            You are the only one who can access the account.
          </span>{' '}
          Nobody will ever be able to retrieve credentials if you would loose
          the set given credentials.
        </p>
      </div>

      <div className="w100 mt15">
        <div className="fs-m fc-black fw-700">Passphrase</div>
        <div className="fc-gray-600 mb15">
          Write down these 12 words and store them in a safe place.
        </div>
        <div className="w100 grid-col6 p15-25 border br-c-primary">
          {selectedAccount.passphrase.split(' ').map((item, idx) => (
            <div key={idx} className="flex-c w100">
              <div className="mr5 fc-gray-300 noselect copy-blocker">
                {idx + 1}.
              </div>
              <div className="fs-m fc-black">{item}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="w100 mt15 flex-c flex-jc-fe">
        <Button className="" onClick={() => copyToClipboard()}>
          Copy passphrase
        </Button>
        <Button className="ml15" disabled>
          Download JSON
        </Button>
      </div>

      <div className="w100 mb25 mt50 pt25 border-top">
        <Checkbox
          checked={hasSavedPassphrase}
          onChange={() => setHasSavedPassphrase(!hasSavedPassphrase)}>
          My passphrase is secure
        </Checkbox>
      </div>
      <Button
        disabled={!hasSavedPassphrase}
        onClick={() => confirmAccount()}
        className="w100 h45--fixed"
        type="primary">
        Enter the Journals ecosystem
      </Button>
    </div>
  );
};
