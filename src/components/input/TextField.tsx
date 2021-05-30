import React, { useRef, useState } from 'react';

import { LoadingOutlined, CheckCircleOutlined } from '@ant-design/icons';
import Input from 'antd/es/input';
import _ from 'lodash';
import { InputFieldLabel } from './InputFieldLabel';

interface Props {
  label: string;
  value: string;
  placeholder: string;
  setValue(value: string): void;
  loading: boolean;
  isValid?: boolean;
  error: string;
  max_chars: number;
  delay?: number;
}

export const TextField: React.FC<Props> = ({
  label,
  setValue,
  placeholder,
  max_chars,
  value,
  error,
  loading,
  delay = 750,
  isValid
}) => {
  const icon = loading ? (
    <LoadingOutlined />
  ) : isValid ? (
    <span className="fc-red">
      <CheckCircleOutlined />
    </span>
  ) : (
    ''
  );

  const remaining = max_chars ? max_chars - (value || '').length : null;
  const [query, setQuery] = useState(value || '');
  const delayedQuery = useRef(_.debounce(q => setValue(q), delay)).current;
  const onChange = (event: any) => {
    setQuery(event.target.value);
    delayedQuery(event.target.value);
  };
  return (
    <>
      <InputFieldLabel label={label} error={error} remainingChars={remaining} />
      <Input
        className="text-input"
        value={query}
        placeholder={placeholder}
        onChange={onChange}
        suffix={icon}
        maxLength={max_chars}
      />
    </>
  );
};
