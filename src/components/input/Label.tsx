import React from 'react';
import { capitalize } from '../../utils/string.utils';
import { InputError } from '../../typings';

interface Props {
  label: string;
  error?: InputError;
  remainingChars?: number;
}

const Label: React.FC<Props> = ({ label, error, remainingChars }) => {
  if (!label) {
    return <></>;
  }
  const extra = error ? (
    <span className="create--error fc-red-800 fw-bold">{error.message}</span>
  ) : (
    <span className="">{remainingChars}</span>
  );
  return (
    <div className="flex-c flex-jc-sb mb5 border-black">
      {label ? (
        <label className={`fw-bold ${error ? 'fc-red-800' : 'fc-black'}`}>
          {capitalize(label)}
        </label>
      ) : (
        <span />
      )}
      {extra}
    </div>
  );
};

export default Label;
